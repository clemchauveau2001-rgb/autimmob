#!/usr/bin/env python3
"""Génère un devis ou une facture Autimmob (PDF) à partir d'un fichier JSON.

Le gabarit est FIXE (template.html + entreprise.json) : seuls les champs du fichier de données changent.
Usage :  python3 generer.py facture donnees.json sortie.pdf
         python3 generer.py devis   donnees.json sortie.pdf
Un document dont des mentions légales de l'entreprise sont encore « A_COMPLETER »
ou dont des champs obligatoires manquent est marqué BROUILLON en filigrane.
Les montants sont calculés avec Decimal (2 décimales, aucun arrondi caché).
"""
import base64, json, sys
from datetime import date, datetime, timedelta
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

ICI = Path(__file__).parent
CENT = Decimal("0.01")
MARGE = "marge"      # TVA sur la marge, biens d'occasion (art. 297 A du CGI)
NORMALE = "normale"  # TVA 20 % sur le prix HT


def d(v):
    return Decimal(str(v)).quantize(CENT, ROUND_HALF_UP)


def eur(v):
    s = f"{d(v):,.2f}".replace(",", " ").replace(".", ",")
    return f"{s} €"


def date_fr(s):
    return datetime.strptime(s, "%Y-%m-%d").strftime("%d/%m/%Y") if s else ""


def police(nom):
    return base64.b64encode((ICI / "fonts" / nom).read_bytes()).decode()


def verifier(type_doc, data, entreprise):
    manque = []
    for k, v in entreprise.items():
        if v == "A_COMPLETER":
            manque.append(f"entreprise.{k}")
    for champ in ("numero", "date"):
        if not data.get(champ):
            manque.append(champ)
    ach = data.get("acheteur", {})
    if not ach.get("nom"):
        manque.append("acheteur.nom")
    if not ach.get("adresse"):
        manque.append("acheteur.adresse")
    veh = data.get("vehicule", {})
    for k in ("marque", "modele", "mise_en_circulation", "kilometrage", "immatriculation", "vin"):
        if not veh.get(k):
            manque.append(f"vehicule.{k}")
    if not data.get("lignes"):
        manque.append("lignes")
    return manque


def calculer(data):
    regime = data.get("regime_tva", MARGE)
    lignes, total = [], Decimal("0")
    for l in data["lignes"]:
        prix = d(l["prix_ttc"])
        lignes.append({"designation": l["designation"], "detail": l.get("detail", ""), "prix": eur(prix)})
        total += prix
    remise = d(data.get("remise", 0))
    total_ttc = total - remise
    acompte = d(data.get("acompte", 0))
    reste = total_ttc - acompte
    res = {"lignes": lignes, "regime": regime, "sous_total": eur(total), "remise": eur(remise) if remise else "",
           "total_ttc": eur(total_ttc), "acompte": eur(acompte) if acompte else "", "reste": eur(reste)}
    if regime == NORMALE:
        ht = (total_ttc / Decimal("1.2")).quantize(CENT, ROUND_HALF_UP)
        res.update(total_ht=eur(ht), tva=eur(total_ttc - ht))
    return res


def main():
    if len(sys.argv) != 4 or sys.argv[1] not in ("facture", "devis"):
        sys.exit(__doc__)
    type_doc, src, out = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    data = json.loads(src.read_text(encoding="utf-8"))
    ent = json.loads((ICI / "entreprise.json").read_text(encoding="utf-8"))
    manque = verifier(type_doc, data, ent)
    calc = calculer(data)

    env = Environment(loader=FileSystemLoader(ICI), autoescape=select_autoescape(["html"]))
    env.filters["fr"] = date_fr
    validite = data.get("validite_jours", 30)
    date_doc = data["date"] if data.get("date") else date.today().isoformat()
    html = env.get_template("template.html").render(
        t=type_doc, e=ent, x=data, c=calc, manque=manque, brouillon=bool(manque),
        date_doc=date_doc,
        fin_validite=(datetime.strptime(date_doc, "%Y-%m-%d") + timedelta(days=validite)).strftime("%Y-%m-%d"),
        validite=validite,
        f_serif=police("cormorant-garamond-latin-700-normal.woff2"),
        f400=police("inter-latin-400-normal.woff2"), f600=police("inter-latin-600-normal.woff2"),
        f700=police("inter-latin-700-normal.woff2"),
    )
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.set_content(html, wait_until="load")
        pg.pdf(path=str(out), format="A4", print_background=True, margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
        b.close()
    print(f"{out} généré ({'BROUILLON' if manque else 'définitif'}), total TTC {calc['total_ttc']}")
    if manque:
        print("Champs manquants :", ", ".join(manque))


if __name__ == "__main__":
    main()
