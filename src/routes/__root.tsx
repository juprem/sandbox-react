import { createRootRoute, Link } from '@tanstack/react-router';
import { css } from '../../styled-system/css';

export const Route = createRootRoute({
    component: () => (
        <>
            <Link to="/" className={css({ _active: { backgroundColor: 'black' } })}>
                Home
            </Link>
            <Link to="/about" className={css({ _active: { backgroundColor: 'black' } })}>
                About
            </Link>
        </>
    ),
});
