import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    user: any | null
    login: (token: string, userData?: any) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
        // Check if user is already logged in on mount
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('userData')

        if (token) {
            setIsAuthenticated(true)
            if (userData) {
                setUser(JSON.parse(userData))
            }
        }
    }, [])

    const login = (token: string, userData?: any) => {
        localStorage.setItem('authToken', token)
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData))
            setUser(userData)
        }
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}