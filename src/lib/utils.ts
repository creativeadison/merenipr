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

export async function nactiRozhovory() {
  const rozhovory = await getCollection('rozhovory');
  return rozhovory.sort((a, b) => a.data.poradi - b.data.poradi);
}
