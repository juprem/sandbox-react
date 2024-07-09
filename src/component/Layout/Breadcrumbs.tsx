import { BreadcrumbsModel } from '@model/BreadcrumbsModel.ts';
import { css } from '@styled-system/css';
import { useRouter } from '@tanstack/react-router';

export function Breadcrumbs() {
    const router = useRouter();

    const breadcrumbs = router.state.matches.map((match): BreadcrumbsModel => {
        const { pathname, context } = match;
        return {
            title: context.breadcrumbs,
            path: pathname,
        };
    });

    return (
        <div className={css({ display: 'flex', gap: '0.2rem', marginBottom: '1rem', marginLeft: '5px', color: 'white' })}>
            {breadcrumbs.map((it) => (
                <div key={it.path}>{it.title}</div>
            ))}
        </div>
    );
}
