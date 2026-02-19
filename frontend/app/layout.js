import './globals.css';
export default function RootLayout({
  children,
}) {
  return (
    <html lang='pt-br'>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}