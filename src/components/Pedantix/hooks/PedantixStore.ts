import { create } from 'zustand';
import { normalizeAndStem } from '../service/pedantixService';

type Action = {
  addGuess: (guess: string) => void;
  reset: () => void;
  initPedantix: (title: string, tokenizedTitle: Set<string>, tokenizedArticleStem: Set<string>) => void;
};

type State = {
  guessedStem: Set<string>;
  guessedWords: Set<string>;
  tokenizedArticleStem: Set<string>;
  tokenizedTitle: Set<string>;
  title: string;
  guessedCount: number;
  isWon: boolean;
};

export const usePedantixStore = create<State & Action>((set, _, store) => ({
  tokenizedArticleStem: new Set(),
  tokenizedTitle: new Set(),
  guessedStem: new Set(),
  guessedWords: new Set(),
  title: '',
  guessedCount: 0,
  isWon: false,
  initPedantix: (title, tokenizedTitle, tokenizedArticleStem) => set({ title, tokenizedTitle, tokenizedArticleStem }),
  addGuess: (guess: string) =>
    set((state) => {
      const stem = normalizeAndStem(guess);

      if (state.guessedStem.has(stem)) {
        return {};
      }

      const newGuessedWords = new Set(state.guessedStem).add(stem);

      if (state.tokenizedArticleStem.has(stem)) {
        const newGuessedStem = new Set(state.guessedStem).add(stem);

        const isWon = Array.from(state.tokenizedTitle).every((t) => newGuessedStem.has(t));

        console.log(isWon, Array.from(state.tokenizedTitle), newGuessedStem);

        return { guessedStem: newGuessedStem, guessedCount: state.guessedCount + 1, isWon };
      }

      return { guessedStem: newGuessedWords };
    }),
  reset: () => {
    set({ ...store.getInitialState() });
  },
}));
