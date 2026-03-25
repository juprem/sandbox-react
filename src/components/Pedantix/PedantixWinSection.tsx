import styles from './Pedantix.module.scss';
import { Button } from 'antd';
import { usePedantixStore } from './hooks/PedantixStore';
import { useShallow } from 'zustand/react/shallow';

export function PedantixWinSection() {
  const { isWon, guessedCount, reset, title } = usePedantixStore(
    useShallow(({ isWon, title, reset, guessedCount }) => ({
      isWon,
      guessedCount,
      reset,
      title,
    })),
  );

  return (
    <>
      {isWon && (
        <div className={styles.winMessage}>
          <h2>Félicitations !</h2>
          <p>
            Vous avez trouvé l'article : <strong>{title}</strong> en {guessedCount} coups.
          </p>
          <Button type="primary" onClick={reset}>
            Nouvelle partie
          </Button>
        </div>
      )}
    </>
  );
}
