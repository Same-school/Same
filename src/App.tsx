import { ThemeProvider, Global } from '@emotion/react'
import { theme } from './styles/theme'
import { globalStyle } from './styles/globalStyle'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './AppRoutes'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyle} />
                <AppRoutes />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App