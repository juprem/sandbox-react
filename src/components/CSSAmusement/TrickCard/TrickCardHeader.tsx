import { css } from '@styled-system/css'
import type { ReactNode } from 'react'

const containerStyles = {
    visual: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 0.85rem',
        borderBottom: '1px solid #2a2a2a',
        backgroundColor: '#181818',
        flexShrink: 0,
    }),
    code: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 0.85rem',
        borderBottom: '1px solid #1f1f1f',
        backgroundColor: '#0d0d0d',
        flexShrink: 0,
    }),
}

const titleStyles = {
    visual: css({
        fontSize: '0.8rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: '0.01em',
    }),
    code: css({
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'monospace',
    }),
}

interface TrickCardHeaderProps {
    title: string
    variant: 'visual' | 'code'
    actions: ReactNode
}

export function TrickCardHeader({ title, variant, actions }: TrickCardHeaderProps) {
    return (
        <div className={containerStyles[variant]}>
            <span className={titleStyles[variant]}>{title}</span>
            {actions}
        </div>
    )
}
