/* Mezikus mezi generátorem náhledovek a Aktuálně.
 *
 * Proč vůbec: prohlížeč nesmí sáhnout na cizí doménu, musí přes proxy —
 * a veřejným proxy servíruje Economia souhlasové okno místo článku.
 * Tenhle worker si o stránku řekne ze serveru s hlavičkami běžného
 * prohlížeče, takže dostane skutečný článek i s <p class="…__perex…">.
 * Přesně tohle dělá generátor běžící na Vercelu.
 *
 * NASAZENÍ (zdarma, asi pět minut)
 * 1. dash.cloudflare.com → Workers & Pages → Create → Start with Hello World
 * 2. Deploy, pak Edit code
 * 3. Smaž, co tam je, vlož tenhle soubor, Deploy
 * 4. Zkopíruj adresu workeru (…workers.dev) a vlož ji v generátoru
 *    do pole "Vlastní endpoint"
 */

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
           "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*"
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    const target = new URL(request.url).searchParams.get("url");
    if (!target) {
      return new Response("Chybí parametr ?url=", { status: 400, headers: CORS });
    }

    let parsed;
    try { parsed = new URL(target); }
    catch (e) { return new Response("Neplatná adresa", { status: 400, headers: CORS }); }
    if (!/^https?:$/.test(parsed.protocol)) {
      return new Response("Povolené je jen http a https", { status: 400, headers: CORS });
    }

    try {
      const upstream = await fetch(parsed.toString(), {
        headers: {
          "User-Agent": UA,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
          "Cache-Control": "no-cache"
        },
        redirect: "follow"
      });

      const html = await upstream.text();
      return new Response(html, {
        status: upstream.status,
        headers: {
          ...CORS,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=300"
        }
      });
    } catch (e) {
      return new Response("Stránku se nepodařilo stáhnout: " + e.message,
                          { status: 502, headers: CORS });
    }
  }
};
