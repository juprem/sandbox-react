export interface WordToken {
  text: string;
  stem: string;
  isPunctuation: boolean;
  index: number;
}

export interface PedantixState {
  tokens: WordToken[];
  guessedStems: Set<string>;
  articleTitle: string;
  isWon: boolean;
}

export interface WikipediaResponse {
  parse: {
    title: string;
    text: {
      "*": string;
    };
  };
}

export interface RandomWikipediaResponse {
  query: {
    random: Array<{
      id: number;
      title: string;
    }>;
  };
}
