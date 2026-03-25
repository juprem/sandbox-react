import superagent from 'superagent';
import { newStemmer } from 'snowball-stemmers';
import { RandomWikipediaResponse, WordToken } from '@model/PedantixModel';
import { usePedantixStore } from '../hooks/PedantixStore';
import { useQuery } from '@tanstack/react-query';

const stemmer = newStemmer('french');

const EXCLUDED_PUNCTUATION = /[\s,.;:!?()'"«»\-[\]]/;

export function normalizeAndStem(word: string): string {
  return stemmer.stem(
    word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
  );
}

export async function fetchRandomWikipediaArticle(): Promise<{ title: string; content: string }> {
  // 1. Get a random article title
  const randomRes = await superagent.get('https://fr.wikipedia.org/w/api.php').query({
    action: 'query',
    format: 'json',
    list: 'random',
    rnnamespace: 0,
    rnlimit: 1,
    origin: '*',
  });

  const randomData = randomRes.body as RandomWikipediaResponse;
  const title = randomData.query.random[0].title;

  const content = await superagent
    .get(`https://fr.wikipedia.org/w/api.php`)
    .query({
      action: 'query',
      format: 'json',
      exintro: '1',
      explaintext: '1',
      titles: title.replace(' ', '_'),
      prop: 'extracts',
      origin: '*',
    })
    .then((result) => {
      const parsed = JSON.parse(result.text);

      const content = Object.keys(parsed.query.pages)[0];

      return parsed.query.pages[content].extract;
    });

  return {
    title,
    content,
  };
}

export function tokenize(text: string): WordToken[] {
  let rawTokens = text
    .trim()
    .split(/([\s,.;:!?()'"«»[\]])/g)
    .filter((a) => a.trim());

  return rawTokens.map((t, index) => {
    const isPunctuation = EXCLUDED_PUNCTUATION.test(t);
    return {
      text: t,
      stem: isPunctuation ? '' : normalizeAndStem(t),
      isPunctuation,
      index,
    };
  });
}

export const usePedantixArticleGet = () => {
  const initPedantix = usePedantixStore((state) => state.initPedantix);

  return useQuery({
    queryKey: ['pedantix'],
    staleTime: Infinity,
    queryFn: async () => {
      const { title, content } = await fetchRandomWikipediaArticle();
      const tokens = tokenize(content);
      const titleTokens = tokenize(title);
      const titleStems = new Set(titleTokens.filter((t) => !t.isPunctuation).map((t) => t.stem));
      const uniqueContentStem = new Set<string>();

      tokens.forEach((token) => {
        uniqueContentStem.add(token.stem);
      });

      initPedantix(title, titleStems, uniqueContentStem);

      return { tokens, titleTokens };
    },
  });
};
