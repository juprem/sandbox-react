import { css } from '@styled-system/css';
import { flex, inputShape } from '../../styles/GlobalStyle';
import { Snake } from './Snake';

interface DashboardProps {
  snake: Snake;
}

export function Dashboard({ snake }: DashboardProps) {
  return (
    <div
      className={css({
        backgroundColor: 'gray.500',
        borderRadius: '7px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      })}
    >
      <div>
        Score: <span id="score" className={css({ height: '10px', width: '10xp' })} />{' '}
      </div>
      <div className={flex()}>
        <span>Nb Food :</span>
        <input className={inputShape()} type="number" min={0} value={snake.food.length} />
      </div>
    </div>
  );
}
