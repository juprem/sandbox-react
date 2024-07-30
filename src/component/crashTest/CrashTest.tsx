import { ErrorBoundary } from 'react-error-boundary';
import { UsingCustomTanstackQuery } from '@component/CustomFetch/UsingCustomTanstackQuery';

function Fallback({ error }: { error: Error }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
    );
}

export function CrashTest() {
    return (
        <ErrorBoundary onError={(err) => console.log(err)} FallbackComponent={Fallback}>
            <UsingCustomTanstackQuery />
        </ErrorBoundary>
    );
}
