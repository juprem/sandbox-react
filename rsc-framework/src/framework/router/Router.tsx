interface RouterProps {
    url: string;
}

/**
 * File-based Router for RSC.
 * It scans the 'pages' directory and matches the URL pathname to the corresponding index.tsx.
 */
export function Router({ url }: RouterProps) {
    // 1. Load all page components (index.tsx files inside the pages directory)
    const pages = import.meta.glob('../../pages/**/index.tsx', { eager: true }) as Record<string, any>;

    // 2. Parse the pathname from the full URL
    const pathname = new URL(url).pathname;

    // 3. Map the pathname to a file path
    // Example: "/" -> "../../pages/index.tsx"
    // Example: "/test" -> "../../pages/test/index.tsx"
    const normalizedPath = pathname === '/' ? '' : pathname;
    const pagePath = `../../pages${normalizedPath}/index.tsx`;

    // 4. Find the matching page module
    const PageModule = pages[pagePath];

    if (!PageModule) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>404 - Not Found</h1>
                <p>The page <code>{pathname}</code> does not exist.</p>
                <a href="/">Return Home</a>
            </div>
        );
    }

    // 5. Render the exported Page component
    const { Page } = PageModule;

    if (!Page) {
        return <div>Error: The module at <code>{pagePath}</code> does not export a <code>Page</code> component.</div>;
    }

    return <Page />;
}
