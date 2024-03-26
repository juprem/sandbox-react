import { createLazyFileRoute } from '@tanstack/react-router';
import { Sidebar } from '../component/Layout/Sidebar.tsx';
import { Content } from '../component/Layout/Content.tsx';
import { MoutingTestBase } from '../component/MountingTest/MoutingTestBase.tsx';
import { css } from '../../styled-system/css';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div
            className={css({
                height: '100vh',
            })}
        >
            <Sidebar />
            <Content>
                <MoutingTestBase />
            </Content>
        </div>
    );
}
