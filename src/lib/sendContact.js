/** Envoie un formulaire du site à /api/contact. Retourne { ok, error }. */
export async function sendContact(type, fields, website = '') {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, fields, website }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: json.error || 'Envoi impossible. Appelez-nous au 06 49 50 71 41.' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Connexion impossible. Appelez-nous au 06 49 50 71 41.' }
  }
}
