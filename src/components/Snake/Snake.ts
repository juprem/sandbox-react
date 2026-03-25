interface Coordinate {
  x: number;
  y: number;
}

type Direction = [1, 0] | [0, 1] | [-1, 0] | [0, -1] | [0, 0];

export const DirectionsKeys: Record<string, { opposite: string; matrix: Direction }> = {
  ArrowUp: { opposite: 'ArrowDown', matrix: [0, -1] },
  ArrowDown: { opposite: 'ArrowUp', matrix: [0, 1] },
  ArrowLeft: { opposite: 'ArrowRight', matrix: [-1, 0] },
  ArrowRight: { opposite: 'ArrowLeft', matrix: [1, 0] },
  Space: { opposite: '', matrix: [0, 0] },
};

type SnakeDirection = (typeof DirectionsKeys)[number];

export class Snake {
  public boardSize: number;
  public bodyPositions: Coordinate[];
  public direction: SnakeDirection;
  public removedCell: Coordinate;
  public gameOver: boolean;
  public food: Coordinate[];

  constructor(boardSize: number) {
    this.boardSize = boardSize;
    this.direction = { opposite: 'ArrowRight', matrix: [-1, 0] };
    this.removedCell = { x: 0, y: 0 };
    this.gameOver = false;
    this.food = [{ x: 15, y: 15 }];
    this.bodyPositions = [
      { x: 35, y: 35 },
      { x: 36, y: 35 },
      { x: 37, y: 35 },
      { x: 38, y: 35 },
    ];
  }

  move() {
    if (this.gameOver || this.direction.opposite == '') {
      return;
    }

    const { x, y } = this.bodyPositions[0];
    const nextCell = { x: x + this.direction.matrix[0], y: y + this.direction.matrix[1] };
    const nextBodyPosition = this.bodyPositions.slice(0, -1);

    if (this.collision(nextCell, nextBodyPosition)) {
      return;
    }

    if (this.isNextCellFood(nextCell)) {
      this.bodyPositions = [nextCell, ...this.bodyPositions];

      return;
    }

    this.removedCell = this.bodyPositions.pop()!;
    this.bodyPositions = [nextCell, ...this.bodyPositions];
  }

  changeDirection(key: string) {
    if (key === this.direction.opposite) {
      return;
    }

    if (key in DirectionsKeys) {
      this.direction = DirectionsKeys[key];
    }
  }

  private collision(nextCell: Coordinate, bodyPositions: Coordinate[]) {
    if (nextCell.x < 0 || nextCell.x > this.boardSize || nextCell.y < 0 || nextCell.y > this.boardSize) {
      this.gameOver = true;
    }

    const collideBody = bodyPositions.find((val) => val.x === nextCell.x && val.y === nextCell.y);

    if (collideBody) {
      this.gameOver = true;
    }

    return this.gameOver;
  }

  private isNextCellFood(nextCell: Coordinate) {
    const isFood = this.food.find((val) => val.x === nextCell.x && val.y === nextCell.y);

    if (isFood) {
      this.food.pop();
      let notGoodPlace = true;
      while (notGoodPlace) {
        const x = Math.trunc(Math.random() * 70);
        const y = Math.trunc(Math.random() * 70);

        const collide = this.bodyPositions.find((val) => val.x === x && val.y === y);

        if (!collide) {
          notGoodPlace = false;
          this.food.push({ x, y });
        }
      }

      return true;
    }

    return false;
  }
}
