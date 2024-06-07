import { Poppins } from "next/font/google";
import "./globals.css";
import {Toaster} from 'sonner';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '300', '500', '700', '900'] })

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP,
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
