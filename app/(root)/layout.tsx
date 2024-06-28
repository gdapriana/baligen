import { Footer } from "./_components/footer"
import { Header } from "./_components/header"

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen flex flex-col justify-start items-stretch">
      <Header />
        {children}
      <Footer />
    </main>
  )
}