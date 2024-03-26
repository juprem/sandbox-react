import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { css } from '../../styled-system/css';
import { Sidebar } from '../component/Layout/Sidebar.tsx';
import { Content } from '../component/Layout/Content.tsx';
import { motion } from 'framer-motion';

const menu: { label: string; path: string }[] = [
    { label: 'Home', path: '/' },
    { label: 'Basic animation', path: '/basic-animation' },
    { label: 'Draggable', path: '/draggable-motion' },
    { label: 'Enhanced switch', path: '/enhanced-switch' },
    { label: 'Mounting test', path: '/mounting' },
];

export const Route = createRootRoute({
    component: () => (
        <>
            <Sidebar>
                <div className={css({ display: 'flex', gap: '0.5rem', flexDirection: 'column' })}>
                    {menu.map((item) => (
                        <Link
                            to={item.path}
                            activeProps={{
                                className: css({
                                    backgroundColor: 'wheat',
                                    borderRadius: '5px',
                                    color: 'black',
                                    padding: '5px',
                                }),
                            }}
                        >
                            <motion.div
                                whileHover={{
                                    translateX: 5,
                                }}
                            >
                                {item.label}
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
        </>
    ),
});
