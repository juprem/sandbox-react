import styles from '../Pedantix.module.scss';
import { usePedantixStore } from '../hooks/PedantixStore';

export function PedantixHeader() {
  const guessCount = usePedantixStore((state) => state.guessedWords.size)
  const guessedStems = usePedantixStore((state) => state.guessedStem.size)

  return (
    <header className={styles.header}>
      <h1>Pédantix</h1>
      <p>Devinez l'article Wikipédia en trouvant les mots cachés.</p>
      <div className={styles.stats}>
        <span>Essais: {guessCount}</span>
        <span>Mots trouvés: {guessedStems}</span>
      </div>
    </header>
  );
}
