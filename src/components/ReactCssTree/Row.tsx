import { Activity, useState } from 'react';

interface RowProps {
    item: BaseRowType;
}

export function Row({ item }: RowProps) {
    const { content, children, open } = item;
    const [displayChildren, setDisplayChildren] = useState(open);

    if (children.length === 0) {
        return (
            <li>
                <span>{content}</span>
            </li>
        );
    }

    return (
        <li>
            <button onClick={() => setDisplayChildren(!displayChildren)}>
                <span>{content}</span>
            </button>
            <Activity mode={displayChildren ? 'visible' : 'hidden'}>
                <ol>
                    {children.map((item) => (
                        <Row key={item.content} item={item} />
                    ))}
                </ol>
            </Activity>
        </li>

    );
}
