import { useState } from 'react';
import { flex } from '../../styles/GlobalStyle';
import { OptimisticInput } from './OptimisticInput';
import { Button } from 'antd';

export function OptimisticWrapper() {
  const [currentValue, setCurrentValue] = useState(1000);
  const [isResolve, setIsResolve] = useState(false);

  const action = (value: number) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (isResolve) {
          setCurrentValue(value);
          resolve();
        }
        reject();
      }, 2000);
    }).catch((e) => console.log(e));

  return (
    <div className={flex()}>
      <OptimisticInput value={currentValue} action={action} />
      <Button onClick={() => setIsResolve(!isResolve)}> Resolve</Button>
    </div>
  );
}