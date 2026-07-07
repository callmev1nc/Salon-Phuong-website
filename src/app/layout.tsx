import "./globals.css";

/**
 * Root layout is a pass-through. <html>/<body> live in [locale]/layout.tsx
 * so we can set lang={locale} and run the blocking fine-pointer script in <head>.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
