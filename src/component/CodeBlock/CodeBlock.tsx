import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface CodeBlockProps {
    codeString: string;
}

export function CodeBlock({ codeString }: CodeBlockProps) {
    return (
        <SyntaxHighlighter
            customStyle={{ borderRadius: '5px' }}
            showLineNumbers
            language="typescript"
            style={darcula}
            lineNumberStyle={{ color: 'white' }}
        >
            {codeString}
        </SyntaxHighlighter>
    );
}
