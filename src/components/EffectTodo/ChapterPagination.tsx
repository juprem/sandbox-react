import { css } from '@styled-system/css'
import { ChapterDef } from './types'

interface ChapterPaginationProps {
    active: number
    chapters: ChapterDef[]
    onPrev: () => void
    onNext: () => void
}

export function ChapterPagination({ active, chapters, onPrev, onNext }: ChapterPaginationProps) {
    const isFirst = active === 0
    const isLast = active === chapters.length - 1

    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #3b3b3b',
            })}
        >
            <button
                onClick={onPrev}
                disabled={isFirst}
                className={css({
                    padding: '0.45rem 1rem',
                    backgroundColor: '#2e2e2e',
                    border: '1px solid #3b3b3b',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '0.85rem',
                    transition: 'opacity 0.15s',
                })}
                style={{ opacity: isFirst ? 0.3 : 1 }}
            >
                ← {!isFirst ? chapters[active - 1].title : 'Start'}
            </button>

            <span
                className={css({
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.3)',
                    alignSelf: 'center',
                })}
            >
                {active + 1} / {chapters.length}
            </span>

            <button
                onClick={onNext}
                disabled={isLast}
                className={css({
                    padding: '0.45rem 1rem',
                    backgroundColor: '#7c3aed',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '0.85rem',
                    transition: 'opacity 0.15s',
                })}
                style={{ opacity: isLast ? 0.3 : 1 }}
            >
                {!isLast ? chapters[active + 1].title : 'Done'} →
            </button>
        </div>
    )
}
