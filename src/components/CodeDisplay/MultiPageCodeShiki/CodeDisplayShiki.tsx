import { Fragment, useEffect, useState } from 'react';
import { codeToHast } from 'shiki';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import { PreviewCode } from '../PreviewCode';

interface CodeDisplayShikiProps {
    content: string;
}

export function CodeDisplayShiki({ content }: CodeDisplayShikiProps) {
    const [code, setCode] = useState<any>();

    useEffect(() => {
        async function r() {
            const out = await codeToHast(content, {
                lang: 'jsx',
                theme: 'github-dark',
            });
            setCode(out);
        }
        r();
    }, [content]);

    return (
        <div>
            {code
                ? toJsxRuntime(code, {
                      Fragment,
                      jsx,
                      jsxs,
                      components: {
                          pre: (props) => <PreviewCode props={props} />,
                      },
                  })
                : null}
        </div>
    );
}
