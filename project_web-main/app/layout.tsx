import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tech Odyssey",
  description: "Tech Odyssey: 未來之旅 - 探索科技與人文的無限可能",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="stylesheet" href="/static/style.css" />
        <link rel="stylesheet" href="/static/enhanced-animations.css" />
        <link rel="stylesheet" href="/static/style-fixes.css" />
        <link rel="stylesheet" href="/static/critical-fixes.css" />
        <link rel="stylesheet" href="/static/image-fixes.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
