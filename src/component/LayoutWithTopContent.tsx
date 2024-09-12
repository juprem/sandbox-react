import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { css } from '@styled-system/css';
import { ReactNode } from 'react';

export function LayoutWithTopContent() {
    return (
        <Layout className={css({ height: '50vh' })}>
            <Header
                className={css({
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    color: 'white !important',
                    marginBottom: '0.5rem',
                })}
            >
                Header
            </Header>
            <Content className={css({ overflow: 'auto', border: '4px solid orange' })}>
                <div className={css({ border: '4px solid magenta', height: '200px' })}>
                    <ContentStickyComponent>
                        <div>Sticky</div>
                    </ContentStickyComponent>
                </div>
                <div className={css({ height: '1500px' })}>Other content</div>
                Other Content
            </Content>
        </Layout>
    );
}

function ContentStickyComponent({ children }: { children: ReactNode }) {
    return (
        <div className={css({ position: 'sticky', top: 0, zIndex: 1, border: '3px solid blue' })}>
            <div>Sticky</div>
            {children}
        </div>
    );
}
