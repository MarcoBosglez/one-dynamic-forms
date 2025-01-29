import "./globals.css";
import "./styles.css"
import { ReactNode } from 'react';

export const metadata = {
  title: "OneForms",
  description: "Made by @marcobglz, visit morkdemark.com",
};

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
