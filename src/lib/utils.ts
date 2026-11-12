import { getCollection } from 'astro:content';

/** Odhad doby čtení v minutách (cca 200 slov za minutu). */
export function dobaCteni(text = ''): number {
  const slova = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(slova / 200));
}

/** Text bez diakritiky a velkých písmen – pro vyhledávání („metriky“ najde i „Metriky“, „mereni“ najde „měření“). */
export function proHledani(text = ''): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*>_\[\]()`|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

export async function nactiClanky() {
  const clanky = await getCollection('clanky');
  return clanky.sort((a, b) => a.data.poradi - b.data.poradi);
}

/** Je fotka (cesta z /public, např. /images/marek-vicha.jpg) na výšku? Web pak použije svislý výřez místo širokého. */
export async function fotoNaVysku(cesta = ''): Promise<boolean> {
  const sharp = (await import('sharp')).default;
  // složka public: při sestavení webu z kořene projektu, v náhledu se dá dohledat i od tohoto souboru
  const kandidati = [`${process.cwd()}/public${cesta}`, new URL(`../../public${cesta}`, import.meta.url)];
  for (const soubor of kandidati) {
    try {
      const { width = 0, height = 0 } = await sharp(soubor instanceof URL ? decodeURIComponent(soubor.pathname).replace(/^\/([A-Za-z]:)/, '$1') : soubor).metadata();
      return height > width;
    } catch {
      // zkusíme další umístění
    }
  }
  return false;
}

export async function nactiRozhovory() {
  const rozhovory = await getCollection('rozhovory');
  return rozhovory.sort((a, b) => a.data.poradi - b.data.poradi);
}
