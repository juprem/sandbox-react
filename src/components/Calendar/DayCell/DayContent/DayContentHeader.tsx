import { FileHeader } from '../../../FileHeader/FileHeader';
import { DisplayMode } from './model/DisplayMode';
import styles from "./DayContent.module.scss"

const item = [
    {
        id: 'display',
        title: 'Display',
    },
    {
        id: 'add',
        title: 'Add',
    },
] satisfies { id: DisplayMode; title: string }[];

interface DayContentHeaderProps {
    mode: DisplayMode;
    setMode: (mode: DisplayMode) => void;
}

export function DayContentHeader({ mode, setMode }: DayContentHeaderProps) {
    return <FileHeader items={item} active={mode} setActive={setMode} activeStyle={styles.active} />;
}
