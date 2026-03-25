import { css } from '@styled-system/css'
import { Fragment, useEffect, useState } from 'react'
import { codeToHast } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { jsx, jsxs } from 'react/jsx-runtime'

interface TrickCodeBlockProps {
    code: string
    lang?: string
}

export function TrickCodeBlock({ code, lang = 'css' }: TrickCodeBlockProps) {
    const [hast, setHast] = useState<any>()

    useEffect(() => {
        codeToHast(code.trim(), { lang, theme: 'github-dark' }).then(setHast)
    }, [code, lang])

    if (!hast) {
        return (
            <pre
                className={css({
                    margin: 0,
                    fontSize: '0.78rem',
                    lineHeight: '1.7',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                })}
            >
                {code.trim()}
            </pre>
        )
    }

    return (
        <div className={css({ fontSize: '0.78rem', lineHeight: '1.7' })}>
            {toJsxRuntime(hast, {
                Fragment,
                jsx,
                jsxs,
                components: {
                    pre: (props: any) => (
                        <pre
                            {...props}
                            className={css({
                                margin: 0,
                                backgroundColor: 'transparent',
                                overflowX: 'auto',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            })}
                        />
                    ),
                },
            }) as React.ReactElement}
        </div>
    )
}
