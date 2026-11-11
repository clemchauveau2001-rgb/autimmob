# Devis et factures Autimmob

Gabarit **fixe** : `template.html` (mise en page) + `entreprise.json` (mentions de l'entreprise). Un devis ou une facture ne change que par ses données (acheteur, véhicule, lignes, prix).

```
pip install jinja2 playwright && playwright install chromium   # une fois
python3 tools/documents/generer.py facture donnees.json sortie.pdf
python3 tools/documents/generer.py devis   donnees.json sortie.pdf
```

Modèles de données : `exemple-facture.json`, `exemple-devis.json` (données fictives).

## Règles
- Ne jamais modifier `template.html` pour un cas particulier. Un changement de mise en page se décide une fois, pour tous les documents.
- Numérotation continue, sans trou : `FA-AAAA-NNNN` (factures), `DE-AAAA-NNNN` (devis). Le dernier numéro utilisé est noté dans le suivi des véhicules.
- `regime_tva` : `marge` (défaut, TVA sur la marge, art. 297 A du CGI) ou `normale` (TVA 20 % détaillée). Le choix est validé par l'expert-comptable.
- Tant que `entreprise.json` contient `A_COMPLETER` (SIRET, n° de TVA, IBAN, BIC) ou qu'un champ obligatoire manque, le PDF porte le filigrane **BROUILLON** et le script liste ce qui manque.
- Montants calculés en `Decimal`, 2 décimales. Prix saisis en TTC.
- Les documents générés contiennent des données de clients : ils ne vont **jamais** dans ce dépôt ni sur le site.
