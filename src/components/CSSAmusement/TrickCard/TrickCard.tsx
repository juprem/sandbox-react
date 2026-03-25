import { useState, type ReactNode } from 'react'
import { TrickCardVisual } from './TrickCardVisual'
import { TrickCardCode } from './TrickCardCode'

export type CardSize = 'sm' | 'md' | 'lg'

interface TrickCardProps {
    title: string
    code: string
    lang?: string
    size?: CardSize
    children: ReactNode
}

const SIZE_CONFIG: Record<CardSize, { colSpan: number; height: string }> = {
    sm: { colSpan: 2, height: '280px' },
    md: { colSpan: 3, height: '340px' },
    lg: { colSpan: 6, height: '420px' },
}

export function TrickCard({ title, code, lang = 'css', size = 'md', children }: TrickCardProps) {
    const [showCode, setShowCode] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const { colSpan, height } = SIZE_CONFIG[size]

    return (
        <div style={{ gridColumn: `span ${colSpan}`, height, position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: showCode ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: showCode ? 'none' : 'auto',
                }}
            >
                <TrickCardVisual
                    title={title}
                    resetKey={resetKey}
                    onReset={() => setResetKey((k) => k + 1)}
                    onShowCode={() => setShowCode(true)}
                >
                    {children}
                </TrickCardVisual>
            </div>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: showCode ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: showCode ? 'auto' : 'none',
                }}
            >
                <TrickCardCode
                    title={title}
                    code={code}
                    lang={lang}
                    isActive={showCode}
                    onBack={() => setShowCode(false)}
                />
            </div>
        </div>
    )
}
