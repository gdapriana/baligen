'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => {}
})


const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }
