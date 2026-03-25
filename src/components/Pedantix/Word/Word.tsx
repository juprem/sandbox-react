import classNames from 'classnames';
import styles from '../Pedantix.module.scss';
import { WordToken } from '@model/PedantixModel';
import { useEventListener } from '@hooks/useEventListener';
import { CSSProperties } from 'react';
import { sleep } from '../../../utils/sleep';
import { usePedantixStore } from '../hooks/PedantixStore';

interface WordProps {
  token: WordToken;
  i: number;
  isTitle?: boolean;
}

export function Word({ token, i, isTitle = false }: WordProps) {
  const id = `${token.text}-${i}`;
  //TODO utiliser le store pedantix
  const isRevealed = usePedantixStore((state) => state.guessedStem.has(token.stem)) || token.isPunctuation;

  useEventListener({
    htmlId: id,
    eventType: 'click',
    listener: async () => {
      if (!isRevealed) {
        const spanItem = document.getElementById(id)!;
        spanItem.textContent = token.text.length.toString();

        await sleep(3000);
        if (!isRevealed) {
          spanItem.textContent = '';
        }
      }
    },
  });

  const length = token.text.length * 10 * (isTitle ? 2 : 1);

  return (
    <span
      id={id}
      style={{ '--length': `${length}px` } as CSSProperties}
      className={classNames(styles.token, {
        [styles.hidden]: !isRevealed,
        [styles.revealed]: isRevealed,
        [styles.title]: isTitle,
      })}
    >
      {isRevealed ? token.text : ''}
    </span>
  );
}
