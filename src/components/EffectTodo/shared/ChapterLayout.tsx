import { css } from '@styled-system/css'
import { ReactNode } from 'react'

interface SectionProps {
    title: string
    children: ReactNode
}

export function Section({ title, children }: SectionProps) {
    return (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })}>
            <h3
                className={css({
                    fontSize: '0.72rem',
                    fontWeight: 'semibold',
                    color: 'rgba(255,255,255,0.4)',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                })}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}

interface ChapterLayoutProps {
    number: number
    title: string
    subtitle: string
    children: ReactNode
}

export function ChapterLayout({ number, title, subtitle, children }: ChapterLayoutProps) {
    return (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '820px' })}>
            <div>
                <div
                    className={css({
                        fontSize: '0.72rem',
                        color: 'rgba(167,139,250,0.6)',
                        marginBottom: '0.35rem',
                        letterSpacing: '0.12em',
                    })}
                >
                    CHAPTER {String(number).padStart(2, '0')}
                </div>
                <h2
                    className={css({
                        fontSize: '1.9rem',
                        fontWeight: 'bold',
                        margin: '0 0 0.5rem 0',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: '1.2',
                    })}
                >
                    {title}
                </h2>
                <p
                    className={css({
                        color: 'rgba(255,255,255,0.55)',
                        margin: '0',
                        fontSize: '1rem',
                        lineHeight: '1.65',
                    })}
                >
                    {subtitle}
                </p>
            </div>
            <div className={css({ width: '100%', height: '1px', backgroundColor: '#3b3b3b' })} />
            {children}
        </div>
    )
}
