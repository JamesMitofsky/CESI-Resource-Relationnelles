import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <title>Ressources Relationnelles</title>

        {/* <link rel="canonical" href="https://yourdomain.com" />
        <link rel="image_src" href="https://yourdomain.com/og-image.jpg" /> */}
        <meta name="title" content="Ressources Relationnelles" />
        <meta name="description" content="Ressources Relationnelles" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="we need to add some keywords here" />
        <meta name="author" content="James, Lyza et Darko" />
        <meta name="publisher" content="James, Lyza et Darko" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {/* <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:title" content="Ressources Relationnelles" />
        <meta property="og:description" content="Ressources Relationnelles" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourdomain.com" />
        <meta property="twitter:title" content="Ressources Relationnelles" />
        <meta property="twitter:description" content="Ressources Relationnelles" />
        <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
