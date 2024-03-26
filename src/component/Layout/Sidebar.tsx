import { css } from '../../../styled-system/css';

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
    return (
        <div
            className={css({
                width: '250px',
                height: '100vh',
                position: 'absolute',
                backgroundColor: 'black',
            })}
        ></div>
    );
}
