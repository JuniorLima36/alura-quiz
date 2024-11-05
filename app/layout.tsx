import "./global.css";

export const metadata = {
  title: 'Alura Quiz',
  description: 'Teste os seus conhecimentos com o Alura Quiz!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="image/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
