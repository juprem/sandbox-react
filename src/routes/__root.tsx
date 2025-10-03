/// <reference types="vite/client" />
import { createRootRouteWithContext, FileRoutesByPath, HeadContent, Link, Outlet } from '@tanstack/react-router';
import { css } from '@styled-system/css';
import { Sidebar } from '../components/Layout/Sidebar';
import { Content } from '../components/Layout/Content';
import { motion } from 'framer-motion';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Breadcrumbs } from '../components/Layout/Breadcrumbs';
import { ConfigProvider } from 'antd';
import { Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import '../index.css';

dayjs.locale('fr');

const menu: { label: string; path: keyof FileRoutesByPath }[] = [
    { label: 'CrashTest', path: '/crash-test' },
    { label: 'Basic animation', path: '/basic-animation' },
    { label: 'Draggable', path: '/draggable-motion' },
    { label: 'Enhanced switch', path: '/enhanced-switch' },
    { label: 'Conway Game', path: '/conway-game' },
    { label: 'Conway Game2', path: '/conway-game2' },
    { label: 'Todo', path: '/todo/' },
    { label: 'Mounting', path: '/mounting' },
    { label: 'Canvas Filler', path: '/canvas-filler' },
    { label: 'Code Display', path: '/code-display' },
    { label: 'Tetris', path: '/tetris' },
    { label: 'MineSweeper', path: '/mine-sweeper' },
    { label: 'InfiniteQuery', path: '/infinite-loading' },
    { label: 'XState', path: '/x-state' },
];

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
    breadcrumbs: string;
}>()({
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Sidebar>
                <Link
                    to="/"
                    className={css({
                        width: 'fit-content',
                        display: 'flex',
                    })}
                >
                    <div
                        className={css({
                            fontSize: '20px',
                            marginBottom: '2rem',
                            width: 'fit-content',
                            background: 'linear-gradient(45deg, #e66465, #9198e5)',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        })}
                    >
                        DocsPers
                    </div>
                </Link>
                <Breadcrumbs />
                <div className={css({ display: 'flex', flexDirection: 'column', color: 'wheat' })}>
                    {menu.map((item) => (
                        <Link
                            key={String(item.path)}
                            to={String(item.path)}
                            activeProps={{
                                className: css({
                                    backgroundColor: 'wheat',
                                    borderRadius: '5px',
                                    color: 'black',
                                }),
                            }}
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <motion.div
                                whileHover={{
                                    x: 5,
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
        </RootDocument>
    );
}

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>

                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'monospace',
                            colorText: 'white',
                            colorBgBase: '#2e2e2e',
                        },
                    }}
                >
                    <div className={css({ height: '100vh' })}>{children}</div>
                    <ReactQueryDevtools initialIsOpen={false} />
                </ConfigProvider>
                <Scripts />
            </body>
        </html>
    );
}
