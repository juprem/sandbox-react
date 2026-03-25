import { css } from '@styled-system/css'
import { Fragment, useEffect, useState } from 'react'
import { codeToHast } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { jsx, jsxs } from 'react/jsx-runtime'

interface CodeBlockProps {
    code: string
    lang?: string
}

export function CodeBlock({ code, lang = 'typescript' }: CodeBlockProps) {
    const [hast, setHast] = useState<any>()

    useEffect(() => {
        codeToHast(code.trim(), { lang, theme: 'github-dark' }).then(setHast)
    }, [code, lang])

    if (!hast) {
        return (
            <pre
                className={css({
                    backgroundColor: '#161b22',
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    fontSize: '0.85rem',
                    lineHeight: '1.65',
                    margin: '0',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid #3b3b3b',
                })}
            >
                <code>{code.trim()}</code>
            </pre>
        )
    }

    return (
        <div className={css({ borderRadius: '8px', overflow: 'hidden', border: '1px solid #3b3b3b' })}>
            {toJsxRuntime(hast, {
                Fragment,
                jsx,
                jsxs,
                components: {
                    pre: (props: any) => (
                        <pre
                            {...props}
                            className={css({
                                backgroundColor: '#161b22',
                                padding: '1rem 1.25rem',
                                overflowX: 'auto',
                                fontSize: '0.85rem',
                                lineHeight: '1.65',
                                margin: '0',
                            })}
                        />
                    ),
                },
            }) as React.ReactElement}
        </div>
    )
}
