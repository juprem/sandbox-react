import { Input, Form } from 'antd';
import styles from './Pedantix.module.scss';
import { useState } from 'react';
import { usePedantixStore } from './hooks/PedantixStore';
import { useShallow } from 'zustand/react/shallow';

export function PedantixInput() {
  const [value, setValue] = useState('');
  const { addGuess, isWon } = usePedantixStore(useShallow(({ addGuess, isWon }) => ({ addGuess, isWon })));

  const handleFinish = () => {
    if (value.trim()) {
      addGuess(value.trim());
      setValue('');
    }
  };

  return (
    <div className={styles.inputSection}>
      <Form onFinish={handleFinish}>
        <Input
          placeholder="Entrez un mot..."
          size="large"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isWon}
          autoComplete="off"
          autoFocus
        />
      </Form>
    </div>
  );
}
