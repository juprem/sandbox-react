import { css } from '@styled-system/css'
import type { ReactNode } from 'react'
import { RotateCcw, Code2 } from 'lucide-react'
import { iconBtn } from './styles'
import { TrickCardHeader } from './TrickCardHeader'

interface TrickCardVisualProps {
    title: string
    resetKey: number
    onReset: () => void
    onShowCode: () => void
    children: ReactNode
}

export function TrickCardVisual({ title, resetKey, onReset, onShowCode, children }: TrickCardVisualProps) {
    return (
        <div
            className={css({
                position: 'absolute',
                inset: 0,
                backgroundColor: '#1e1e1e',
                border: '1px solid #3b3b3b',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            })}
        >
            <TrickCardHeader
                title={title}
                variant="visual"
                actions={
                    <div className={css({ display: 'flex', gap: '0.4rem' })}>
                        <button className={iconBtn} title="Reset" onClick={onReset}>
                            <RotateCcw size={13} />
                        </button>
                        <button className={iconBtn} title="View code" onClick={onShowCode}>
                            <Code2 size={13} />
                            <span>code</span>
                        </button>
                    </div>
                }
            />

            <div
                key={resetKey}
                className={css({
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                })}
            >
                {children}
            </div>
        </div>
    )
}
