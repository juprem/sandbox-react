import { css } from '@styled-system/css'
import { ArrowLeft } from 'lucide-react'
import { TrickCodeBlock } from './TrickCodeBlock'
import { iconBtn } from './styles'
import { TrickCardHeader } from './TrickCardHeader'

interface TrickCardCodeProps {
    title: string
    code: string
    lang: string
    isActive: boolean
    onBack: () => void
}

export function TrickCardCode({ title, code, lang, isActive, onBack }: TrickCardCodeProps) {
    return (
        <div
            className={css({
                position: 'absolute',
                inset: 0,
                backgroundColor: '#111111',
                border: '1px solid #3b3b3b',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            })}
        >
            <TrickCardHeader
                title={title}
                variant="code"
                actions={
                    <button className={iconBtn} onClick={onBack}>
                        <ArrowLeft size={13} />
                        <span>back</span>
                    </button>
                }
            />

            <div
                className={css({
                    flex: 1,
                    padding: '0.85rem 1rem',
                })}
                style={{ overflowY: isActive ? 'auto' : 'hidden' }}
            >
                <TrickCodeBlock code={code} lang={lang} />
            </div>
        </div>
    )
}
