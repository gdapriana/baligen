'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ScrollContextType {
  scrolled: boolean;
  setScrolled: Dispatch<SetStateAction<boolean>>
}

const ScrollContext = createContext<ScrollContextType>({
  scrolled: false,
  setScrolled: () => {}
})


const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  return (
    <ScrollContext.Provider value={{ scrolled, setScrolled }}>
      {children}
    </ScrollContext.Provider>
  )
}

export { ScrollContext, ScrollProvider }
