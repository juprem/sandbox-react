import { useState } from 'react';
import { FileHeader } from '../../FileHeader/FileHeader';
import { CodeDisplayShiki } from './CodeDisplayShiki';

interface MultiPageCodeShikiProps {
    files: { id: number; title: string; code: string }[];
}

export function MultiPageCodeShiki({ files }: MultiPageCodeShikiProps) {
    const [active, setActive] = useState(files[0].id);

    return (
        <div style={{ width: "700px" }}>
            <FileHeader items={files} active={active} setActive={setActive} />
            <CodeDisplayShiki content={files.find((file) => file.id == active)!.code} />
        </div>
    );
}
