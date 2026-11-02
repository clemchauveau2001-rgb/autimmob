import { NextResponse } from 'next/server'

/**
 * Envoi des formulaires du site (estimation, contact, RDV, avis) par e-mail via Resend.
 * Variables d'environnement à définir dans Vercel (Settings > Environment Variables) :
 *   RESEND_API_KEY  (obligatoire)  — clé Resend, ne jamais la mettre dans le code
 *   CONTACT_TO      (facultatif)   — destinataire, défaut autimmob.contact@gmail.com
 *   CONTACT_FROM    (facultatif)   — expéditeur, défaut « Autimmob <onboarding@resend.dev> »
 */

const TYPES = {
  estimation: 'Demande d\'estimation',
  contact: 'Message de contact',
  rdv: 'Demande de rendez-vous',
  avis: 'Avis client',
}

const LABELS = {
  prenom: 'Prénom',
  nom: 'Nom',
  email: 'Email',
  telephone: 'Téléphone',
  motif: 'Motif',
  marque: 'Marque',
  modele: 'Modèle',
  annee: 'Année',
  km: 'Kilométrage',
  date: 'Date souhaitée',
  creneau: 'Créneau',
  note: 'Note',
  vehicule: 'Véhicule',
  message: 'Message',
}

const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 6
}

const clean = (v, max = 2000) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)

export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  // Anti-spam : champ piège rempli = on fait semblant que c'est envoyé
  if (clean(data.website)) return NextResponse.json({ ok: true })

  const ip = (request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim()
  if (limited(ip)) {
    return NextResponse.json({ error: 'Trop de demandes, réessayez dans quelques minutes.' }, { status: 429 })
  }

  const type = TYPES[data.type] ? data.type : 'contact'
  const fields = data.fields && typeof data.fields === 'object' ? data.fields : {}
  const lines = Object.entries(LABELS)
    .map(([key, label]) => [label, clean(fields[key])])
    .filter(([, value]) => value)

  const email = clean(fields.email, 200)
  const hasContact = email || clean(fields.telephone, 40)
  if (type !== 'avis' && !hasContact) {
    return NextResponse.json({ error: 'Merci d\'indiquer un email ou un téléphone.' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
  }
  if (lines.length === 0) {
    return NextResponse.json({ error: 'Formulaire vide.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'L\'envoi n\'est pas encore activé. Appelez-nous au 06 49 50 71 41.' },
      { status: 503 },
    )
  }

  const who = [clean(fields.prenom, 60), clean(fields.nom, 60)].filter(Boolean).join(' ')
  const subject = `${TYPES[type]}${who ? ` — ${who}` : ''}`
  const text = `${TYPES[type]} reçue depuis autimmob.fr\n\n` + lines.map(([l, v]) => `${l} : ${v}`).join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Autimmob <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'autimmob.contact@gmail.com'],
      ...(email ? { reply_to: email } : {}),
      subject,
      text,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Envoi impossible pour le moment. Appelez-nous au 06 49 50 71 41.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
