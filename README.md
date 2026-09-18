# Měření PR – www.merenipr.cz

Web o měření a evaluaci PR komunikace (agentura Adison). Postavený v [Astru](https://astro.build), hostovaný na Cloudflare Pages.

## Kde co je

| Co | Kde |
|---|---|
| Články Knowledge Base | `src/content/clanky/` – jeden soubor = jeden článek |
| Rozhovory | `src/content/rozhovory/` – jeden soubor = jeden rozhovor |
| Obrázky | `public/images/` |
| Společné texty a odkazy (menu, newsletter, autorka) | `src/data/site.ts` |
| Zdroje | `src/pages/zdroje.astro` (seznam nahoře v souboru) |
| Barvy a vzhled | `src/styles/global.css` |

Adresa stránky = název souboru. Např. `src/content/clanky/kvalitativni-indexy.md` → `www.merenipr.cz/kvalitativni-indexy`.

## Spuštění na počítači

```bash
npm install
npm run dev
```

Web pak běží na http://localhost:4321.

## Zveřejnění

Každé nahrání změn na GitHub (větev `main`) se automaticky objeví na webu zhruba do minuty.
