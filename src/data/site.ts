// Společná nastavení webu – tady se mění texty a odkazy, které se opakují na více stránkách.

export const site = {
  name: 'Měření PR',
  tagline: 'Měřme to, na čem záleží.',
  description:
    'Web o měření a evaluaci PR komunikace. Rozhovory s českými komunikačními manažery, metodiky AMEC, Barcelonské principy a praktické checklisty.',
  url: 'https://www.merenipr.cz',
};

// Měření návštěvnosti. Obojí funguje bez cookies, takže web nepotřebuje lištu se souhlasem.
export const mereni = {
  // Cloudflare Web Analytics – token ze snippetu (Analytics & Logs → Web Analytics → Add a site)
  cloudflareToken: '7f55540f525e495a9cab85d90fc028a9',
  // Google Search Console – obsah ověřovací meta značky (metoda „HTML tag“)
  googleOvereni: '',
};

export const nav = [
  { href: '/knowledge-base', label: 'Knowledge Base' },
  { href: '/rozhovory-mereni-pr-v-cr', label: 'Rozhovory' },
  { href: '/zdroje', label: 'Zdroje' },
];

// Formulář pro odběr novinek (Tally). Až bude hotový formulář v Notionu, stačí změnit tady.
export const newsletter = {
  embedUrl: 'https://tally.so/embed/w4eoGY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  gdprUrl: 'https://www.adison.cz/wp-content/uploads/2024/04/Informace-o-zpracovani-osobnich-udaju.pdf',
};

export const links = {
  adison: 'https://www.adison.cz',
  workshop: 'https://www.adison.cz/pr-measure-up-workshop-jak-na-mereni-pr/',
  metrik: 'https://www.metrik.world/',
  linkedin: 'https://www.linkedin.com/in/alzbetafridrich/',
};

export const autorka = {
  jmeno: 'Alžběta Fridrichová',
  role: 'CEO & Founder, Adison',
  foto: '/images/2e8a6806-resized.jpg',
  // ořez obličeje pro malé kolečko – ostřejší než zmenšená velká fotka
  avatar: '/images/alzbeta-avatar.jpg',
  kratce:
    'Měření PR se věnuji přes deset let. Zrealizovala jsem studii Měření PR v ČR a průběžně čerpám od předních světových expertů v oboru. Věřím, že změna v přístupu k evaluaci může posílit pozici PR jako oboru. Své znalosti sdílím otevřeně. (Kill AVE, povídám.)',
  medailonek:
    'Alžběta Fridrichová stojí v čele agentury Adison, kterou založila před 15 lety s vizí dělat moderní PR. Její tým se soustředí na komunikaci, která má nejen kreativní šmrnc, ale především doložitelný dopad. Dlouhodobě pracuje pro klienty jako IKEA, VELUX, GLS, Air Bank nebo Amazon Web Services. Projekty agentury pravidelně bodují v oborových soutěžích – od českých Lemurů a Zlatých středníků přes mezinárodní SABRE Awards až po Effie. V oboru se Alžběta intenzivně věnuje tématu měření a evaluace. Stojí za iniciativou KILL AVE, která vyzývá trh k opuštění překonaných metrik a hledání cest, jak prokázat reálný přínos PR pro byznys. Vedle specializace na integrované kampaně, strategie a profilaci lídrů přednáší na vysokých školách, pomáhá firmám nastavovat evaluaci na míru a aktivně se angažuje v asociaci ASCOPA nebo porotě Zlatého středníku.',
};
