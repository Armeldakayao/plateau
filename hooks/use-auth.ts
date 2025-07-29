"use client"

import { useState, useEffect } from "react"
import { AuthService } from "@/lib/services/auth-service"
import type { User } from "@/lib/types"

const authService = new AuthService()

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        setError("Erreur lors de la récupération de l'utilisateur")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await authService.login(email, password)
      setUser(loggedInUser)
      return loggedInUser
    } catch (err) {
      setError("Erreur lors de la connexion")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id">) => {
    setIsLoading(true)
    setError(null)
    try {
      const newUser = await authService.register(userData)
      setUser(newUser)
      return newUser
    } catch (err) {
      setError("Erreur lors de l'inscription")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      setError("Erreur lors de la déconnexion")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (otp: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const isValid = await authService.verifyOTP(otp)
      return isValid
    } catch (err) {
      setError("Erreur lors de la vérification du code")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    verifyOTP,
  }
}
