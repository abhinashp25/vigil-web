import './globals.css'

export const metadata = {
  title: 'VIGIL',
  description: 'Neural intelligence. Always on.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}