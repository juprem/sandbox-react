import { createRootRouteWithContext, FileRoutesByPath, Link, Outlet } from '@tanstack/react-router';
import { css } from '@styled-system/css';
import { Sidebar } from '@component/Layout/Sidebar.tsx';
import { Content } from '@component/Layout/Content.tsx';
import { motion } from 'framer-motion';
import { QueryClient } from '@tanstack/react-query';
import { Breadcrumbs } from '@component/Layout/Breadcrumbs.tsx';

const menu: { label: string; path: keyof FileRoutesByPath }[] = [
    { label: 'CrashTest', path: '/crash-test' },
    { label: 'Basic animation', path: '/basic-animation' },
    { label: 'Draggable', path: '/draggable-motion' },
    { label: 'Enhanced switch', path: '/enhanced-switch' },
    { label: 'Conway Game', path: '/conway-game' },
    { label: 'Todo', path: '/todo' },
    { label: 'Mounting', path: '/mounting' },
];

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    meta: () => [
        {
            title: '/',
        },
    ],
    component: RootComponent,
});

function RootComponent() {

    return (
        <>
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
    );
}
