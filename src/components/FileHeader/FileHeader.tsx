import styles from './FileHeader.module.scss';

interface FileHeaderProps<T = number> {
    items: { id: T; title: string }[];
    active: T;
    setActive: (id: T) => void;
    activeStyle?: string;
}

export function FileHeader<T>({ items, active, setActive, activeStyle }: FileHeaderProps<T>) {
    const activeFinalStyle = activeStyle ?? styles.active

    return (
        <div className={styles.filesContainer}>
            {items.map((item) => (
                <button
                    className={`${styles.file} ${active === item.id ? activeFinalStyle : ''}`}
                    onClick={() => setActive(item.id)}
                    key={String(item.id)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}
