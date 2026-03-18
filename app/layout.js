import './globals.css'

export const metadata = {
  title: 'VIGIL — Neural Intelligence Interface',
  description: 'An AI that never sleeps. Built from scratch.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}