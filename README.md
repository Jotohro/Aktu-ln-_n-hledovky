# P.E.P.A.

**Perfektní Elegantní Program Aktuálně** — generátor náhledovek a popisků na sítě.

Jeden HTML soubor bez závislostí. Loga i emoji jsou vložené uvnitř,
zvenčí se tahá jen písmo Barlow z Google Fonts.

## Co to umí

**Spotlight** — náhledovky ve čtyřech formátech (YouTube 1280×720,
dva instagramové příspěvky a storíčko 1080×1920), popisky na Facebook,
X a Instagram.

**Aktuálně** — jen popisky na sítě z odkazu na článek, bez náhledovek.

Typografie i rozvržení jsou odměřené z hotových náhledovek: jméno hosta
Barlow Condensed Medium 102 px, titulky Barlow Semi Condensed Bold,
nápis v kolečku Barlow Condensed Regular 71 px s prostrkáním 1,6 px.

## Zveřejnění přes GitHub Pages

1. Na githubu vpravo nahoře **+** → **New repository**
2. Název třeba `pepa`, viditelnost **Public** (Pages jsou na free plánu
   jen pro veřejné repozitáře)
3. **Create repository**
4. Na stránce repozitáře **Add file** → **Upload files**, přetáhni
   `index.html` a `README.md`, dole **Commit changes**
5. **Settings** → v levém sloupci **Pages** → v sekci *Build and deployment*
   nech **Deploy from a branch**, vyber větev `main` a složku `/ (root)`, **Save**
6. Za minutu až dvě naběhne adresa `https://<tvůj-účet>.github.io/pepa/`

Změny se dělají tak, že v repozitáři klikneš na `index.html`, tužku vpravo
nahoře, upravíš a dole potvrdíš. Pages se přegenerují samy.

## Poznámka k načítání článků

Prohlížeč nesmí sáhnout na cizí doménu přímo, proto apka chodí přes veřejné
CORS proxy. Z ostré adresy (https) jim to jde líp než ze souboru otevřeného
z disku — některé proxy odmítají požadavky z `file://`, protože nemají
původ. Po nasazení na Pages by tedy načítání mělo být spolehlivější.

Kdyby přesto zlobilo, ve `worker.js` je připravený Cloudflare Worker,
který stránku stáhne serverově s hlavičkami běžného prohlížeče.
