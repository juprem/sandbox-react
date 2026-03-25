import { useEffect, useRef } from 'react';
import { Snake } from './Snake';
import { Dashboard } from './Dashboard';
import { flex } from '../../styles/GlobalStyle';

function fillRect(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = color;
  ctx.fillRect(x * 10, y * 10, 10, 10);
}

const snake = new Snake(70);

const keyBoardListener = (key: KeyboardEvent) => {
  const keyCode = key.code;

  snake.changeDirection(keyCode);
};

export function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    document.addEventListener('keydown', keyBoardListener);

    const ctx = canvas.getContext('2d', { alpha: false })!;

    snake.bodyPositions.forEach(({ x, y }) => {
      fillRect(x, y, 'red', ctx);
    });

    snake.food.forEach(({ x, y }) => {
      fillRect(x, y, 'green', ctx);
    });

    const intervalId = setInterval(() => {
      snake.move();

      snake.bodyPositions.forEach(({ x, y }) => {
        fillRect(x, y, 'red', ctx);
      });

      snake.food.forEach(({ x, y }) => {
        fillRect(x, y, 'green', ctx);
      });

      fillRect(snake.removedCell.x, snake.removedCell.y, 'black', ctx);
      document.getElementById('score')!.textContent = (snake.bodyPositions.length - 4).toString();
    }, 100);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', keyBoardListener);
    };
  }, []);

  return (
    <div className={flex()}>
      <canvas ref={canvasRef} height={700} width={700}></canvas>
      <Dashboard snake={snake} />
    </div>
  );
}
