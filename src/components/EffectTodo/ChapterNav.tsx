import { css } from '@styled-system/css'
import { ChapterDef } from './types'

interface ChapterNavProps {
    chapters: ChapterDef[]
    active: number
    onSelect: (index: number) => void
}

export function ChapterNav({ chapters, active, onSelect }: ChapterNavProps) {
    return (
        <aside
            className={css({
                width: '230px',
                flexShrink: 0,
                borderRight: '1px solid #3b3b3b',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
            })}
        >
            <div
                className={css({
                    padding: '1.25rem 1rem 1rem',
                    borderBottom: '1px solid #3b3b3b',
                })}
            >
                <div
                    className={css({
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: '#a78bfa',
                        marginBottom: '0.3rem',
                    })}
                >
                    COURSE
                </div>
                <div className={css({ fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.2' })}>
                    Effect Library
                </div>
                <div
                    className={css({
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.35)',
                        marginTop: '0.25rem',
                    })}
                >
                    Build a Todo app with Effect
                </div>
            </div>

            <nav className={css({ flex: 1, padding: '0.5rem 0' })}>
                {chapters.map((ch, i) => {
                    const isActive = i === active
                    return (
                        <button
                            key={ch.number}
                            onClick={() => onSelect(i)}
                            className={css({
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.6rem',
                                width: '100%',
                                padding: '0.55rem 1rem',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'background 0.12s',
                                borderRight: '2px solid transparent',
                            })}
                            style={{
                                backgroundColor: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
                                borderRightColor: isActive ? '#7c3aed' : 'transparent',
                            }}
                        >
                            <span
                                className={css({
                                    fontSize: '0.65rem',
                                    minWidth: '18px',
                                    paddingTop: '3px',
                                    fontVariantNumeric: 'tabular-nums',
                                })}
                                style={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.25)' }}
                            >
                                {String(ch.number).padStart(2, '0')}
                            </span>
                            <div>
                                <div
                                    className={css({ fontSize: '0.83rem', lineHeight: '1.3' })}
                                    style={{
                                        color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                >
                                    {ch.title}
                                </div>
                                <div
                                    className={css({
                                        fontSize: '0.7rem',
                                        marginTop: '1px',
                                        color: 'rgba(255,255,255,0.3)',
                                    })}
                                >
                                    {ch.subtitle}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </nav>

            <div
                className={css({
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #3b3b3b',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.2)',
                    lineHeight: '1.5',
                })}
            >
                effect@3.x · typescript
            </div>
        </aside>
    )
}
