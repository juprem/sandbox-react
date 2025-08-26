import { Card } from 'antd';
import { css } from '@styled-system/css';

interface InfiniteScrollingCardProps {
    numbered: number;
}

export function InfiniteScrollingCard({ numbered }: InfiniteScrollingCardProps) {
    return (
        <Card className={css({ backgroundColor: 'lightgray', width: '150px', height: '110px' })}>
            <div>Carte numéro {numbered}</div>
        </Card>
    );
}
