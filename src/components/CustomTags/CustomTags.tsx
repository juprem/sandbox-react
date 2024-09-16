import Cross from '@assets/cross.svg';
import { css } from '@styled-system/css';
import { ReactNode } from 'react';

interface CustomTagsProps {
    text: ReactNode;
    onClose: () => void;
}
const colors = ['#E7D5C5', '#FFBB55', '#C44E4F'];

export function CustomTags({ text, onClose }: CustomTagsProps) {
    return (
        <div
            style={{ backgroundColor: colors[text ? text.toString().length % 3 : 0] }}
            className={css({ display: 'flex', gap: '0.25rem', borderRadius: '5px', marginRight: '0.5rem', padding: '0 2px' })}
        >
            {text}
            <img onClick={onClose} className={css({ cursor: 'pointer' })} src={Cross} alt="close" />
        </div>
    );
}
