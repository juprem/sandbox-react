import './index.css';
import { Router } from './framework/router/Router.tsx';

export function Root({ request }: { request: Request }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + RSC</title>
      </head>
      <body>
        <div id="root">
          <Router url={request.url} />
        </div>
      </body>
    </html>
  );
}
