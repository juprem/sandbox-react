import { css } from '../styled-system/css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
function App() {
    return (
        <div className={css({ height: '100vh', backgroundColor: "#dadada"})}>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
