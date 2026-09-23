import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Články v Knowledge Base – každý článek je jeden soubor v src/content/clanky/
const clanky = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clanky' }),
  schema: z.object({
    title: z.string(),
    // krátký popis pod nadpisem, na kartičce a ve výsledcích Googlu
    description: z.string(),
    // typ obsahu: Článek, Checklist, Shrnutí…
    typ: z.string().default('Článek'),
    // témata pro filtrování v Knowledge Base
    temata: z.array(z.string()).default([]),
    image: z.string().optional(),
    // pořadí v seznamu (menší číslo = výš)
    poradi: z.number().default(100),
  }),
});

// Rozhovory – každý rozhovor je jeden soubor v src/content/rozhovory/
const rozhovory = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rozhovory' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    jmeno: z.string(),
    pozice: z.string(),
    firma: z.string(),
    foto: z.string(),
    // ořez obličeje pro malá kolečka (nepovinné, jinak se použije foto)
    avatar: z.string().optional(),
    citat: z.string().optional(),
    // krátké medailonky na konci rozhovoru
    oRespondentovi: z.string(),
    poradi: z.number().default(100),
  }),
});

export const collections = { clanky, rozhovory };
