import { getPreferredLocale } from './page';

/**
 * 根目录 404 - 重定向到用户首选语言的首页
 * 因为这是一个多语言应用，所有页面都应该在 /[locale] 路径下
 * 使用 meta refresh 因为 redirect() 在 not-found 边界中不会正常工作
 */
export default async function RootNotFound() {
  const locale = await getPreferredLocale();

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${locale}`} />
        <title>404 - Page Not Found</title>
      </head>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ fontSize: '4rem', margin: 0, color: '#666' }}>404</h1>
          <p style={{ fontSize: '1.25rem', color: '#888' }}>Page Not Found</p>
          <p style={{ color: '#aaa' }}>
            Redirecting to <a href={`/${locale}`} style={{ color: '#0066cc' }}>/{locale}</a>...
          </p>
        </div>
      </body>
    </html>
  );
}
