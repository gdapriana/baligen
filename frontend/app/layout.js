import { Poppins } from "next/font/google";
import "./globals.css";
import {Toaster} from 'sonner';
import Head from "next/head";

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '300', '500', '700', '900'] })

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP,
  description: "Generated by create next app",
  other: { 'dicoding:email': 'gedeapriana36@gmail.com' }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="dicoding:email" content="gedeapriana36@gmail.com" />
      </Head>
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
