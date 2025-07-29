"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  commune: string
}

type AppContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, "id">) => Promise<void>
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté via localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simuler une API avec localStorage
      const mockUser: User = {
        id: "user-1",
        nom: "Calloway",
        prenom: "Axel",
        email,
        telephone: "+33 6 12 34 56 78",
        commune: "Le Plateau",
      }

      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      return Promise.resolve()
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/connexion"
  }

  const register = async (userData: Omit<User, "id">) => {
    setIsLoading(true)
    try {
      // Simuler une API avec localStorage
      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
      }

      localStorage.setItem("user", JSON.stringify(newUser))
      setUser(newUser)
      window.location.href = "/connexion"
      return Promise.resolve()
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
