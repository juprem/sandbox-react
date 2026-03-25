import { useOptimistic, useState, useTransition } from 'react';
import { buttonShape, flex, inputShape } from '../../styles/GlobalStyle';
import { Pencil } from 'lucide-react';
import { css } from '@styled-system/css';
import { motion } from 'framer-motion';

interface OptimisticInputProps {
  action: (val: number) => void | Promise<void>;
  value: number;
}

export function OptimisticInput({ action, value }: OptimisticInputProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticVal, setVal] = useOptimistic(value);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const actionInput = () => {
    setEditing(false);
    if (optimisticVal == draft) return;

    startTransition(async () => {
      setVal(draft);

      await action(draft);
      setDraft(value);
    });
  };

  return (
    <div className={flex()}>
      {editing ? (
        <input
          className={inputShape()}
          type="number"
          value={draft}
          onChange={(val) => setDraft(+val.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              actionInput();
            }
            if (event.key === 'Echap') {
              setEditing(false);
              setDraft(optimisticVal);
            }
          }}
        />
      ) : (
        <div className={flex()}>
          <div>{optimisticVal}</div>
          <button
            className={buttonShape({ visual: 'icon' })}
            onClick={() => {
              setEditing(true);
              setDraft(optimisticVal);
            }}
          >
            <Pencil height={15} width={15} />
          </button>
        </div>
      )}

      <div>
        {isPending ? (
          <motion.div
            className={css({
              height: '20px',
              width: '20px',
              border: '1px solid orange',
              borderLeft: 'none',
              borderRadius: '50%',
            })}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 0,
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
