import { WordToken } from '../../model/PedantixModel';
import styles from './Pedantix.module.scss';
import { Word } from './Word/Word';

interface PedantixBoardProps {
  tokens: WordToken[];
}

export function PedantixBoard({ tokens }: PedantixBoardProps) {
  return (
    <div className={styles.board}>
      {tokens.map((token, i) => (
        <Word key={`${token.text}-${i}`} token={token} i={i} />
      ))}
    </div>
  );
}
