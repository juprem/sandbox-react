import { css } from '@styled-system/css';
import { codeToHast } from 'shiki';
import { Fragment, useEffect, useState } from 'react';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import { PreviewCode } from './PreviewCode';

const middle = '    if (state) {\n' + '        return <div>Bonjour</div>\n' + '    }\n';
const bottom = '    \n' + '    return <Button onClick={() => setState(false)}>Bonsoir</Button>\n' + '}';
const text = 'export function CrashTest() {\n' + '    const [state, setState] = useState<boolean>(true);\n' + '    \n';

const sampleCode = `function App() {
    const [code, setCode] = useState<any>();
    
    return (
      <div className="App">
        <div className="App-header">
        
          <img src={logo} className="App-logo" alt="logo" />
          
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello name="TypeScript" />
      </div>
    );
}`;

export function CodeDisplay() {
    const [code, setCode] = useState<any>();

    useEffect(() => {
        async function r() {
            const out = await codeToHast(sampleCode, {
                lang: 'jsx',
                theme: 'github-dark',
            });
            setCode(out);
        }
        r();
    }, []);

    return (
        <>
            <pre className={css({ backgroundColor: 'gray', padding: '5px 10px', borderRadius: '10px' })}>
                <code>{text}</code>
                <div
                    className={css({
                        borderLeft: '4px black solid',
                        backgroundColor: '#2c2c2c',
                        marginLeft: '-10px',
                        width: 'calc(100% + 20px)',
                        padding: '10px 0 10px 6px',
                    })}
                >
                    <code>{middle}</code>
                </div>
                <code>{bottom}</code>
            </pre>
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
        </>
    );
}

/*
background color #242424
card color #2e2e2e
border color #3b3b3b
 */
