import { css } from '@styled-system/css'
import { Info, Lightbulb, AlertTriangle, Zap } from 'lucide-react'
import { ReactNode } from 'react'

type CalloutVariant = 'info' | 'tip' | 'warning' | 'concept'

interface CalloutProps {
    variant?: CalloutVariant
    title?: string
    children: ReactNode
}

const CALLOUT_CONFIG: Record<
    CalloutVariant,
    { icon: typeof Info; bg: string; border: string; color: string }
> = {
    info: { icon: Info, bg: '#0d2137', border: '#1d4ed8', color: '#93c5fd' },
    tip: { icon: Lightbulb, bg: '#0d2318', border: '#16a34a', color: '#86efac' },
    warning: { icon: AlertTriangle, bg: '#2d1c0a', border: '#b45309', color: '#fcd34d' },
    concept: { icon: Zap, bg: '#1e0d37', border: '#7c3aed', color: '#c4b5fd' },
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
    const { icon: Icon, bg, border, color } = CALLOUT_CONFIG[variant]

    return (
        <div
            className={css({
                display: 'flex',
                gap: '0.75rem',
                padding: '0.9rem 1.1rem',
                borderRadius: '8px',
                borderLeft: '3px solid',
            })}
            style={{ backgroundColor: bg, borderColor: border }}
        >
            <Icon size={17} style={{ color, flexShrink: 0, marginTop: '3px' }} />
            <div>
                {title && (
                    <div
                        className={css({
                            fontWeight: 'semibold',
                            marginBottom: '0.3rem',
                            fontSize: '0.88rem',
                        })}
                        style={{ color }}
                    >
                        {title}
                    </div>
                )}
                <div
                    className={css({
                        fontSize: '0.88rem',
                        lineHeight: '1.65',
                        color: 'rgba(255,255,255,0.82)',
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
