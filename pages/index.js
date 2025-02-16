import './globals.css'

export const metadata = {
  title: 'Corporate Form',
  description: 'A corporate form application using Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="bg-gray-100 flex justify-center items-center min-h-screen">{children}</body>
    </html>
  )
}
