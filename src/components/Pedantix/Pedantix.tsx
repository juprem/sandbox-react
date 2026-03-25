import { Button, Result, Spin } from 'antd';
import { usePedantixArticleGet } from './service/pedantixService';
import { PedantixBoard } from './PedantixBoard';
import { PedantixInput } from './PedantixInput';
import styles from './Pedantix.module.scss';
import { Word } from './Word/Word';
import { PedantixHeader } from './PedantixHeader/PedantixHeader';
import { PedantixWinSection } from './PedantixWinSection';

export function Pedantix() {
  const { data, isLoading, isError, refetch } = usePedantixArticleGet();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spin size="large" tip="Chargement d'un article Wikipédia..." />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Result
        status="error"
        title="Erreur lors du chargement"
        subTitle="Impossible de récupérer un article Wikipédia."
        extra={<Button onClick={() => refetch()}>Réessayer</Button>}
      />
    );
  }

  const { tokens, titleTokens } = data;

  return (
    <div className={styles.container}>
      <PedantixHeader />

      <PedantixWinSection />

      <PedantixInput />

      <div className={styles.titleSection}>
        {titleTokens.map((token, i) => (
          <Word token={token} i={i} isTitle key={`${token.text}-${i}`} />
        ))}
      </div>

      <PedantixBoard tokens={tokens} />
    </div>
  );
}
