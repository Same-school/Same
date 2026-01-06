import { ThemeProvider, Global } from '@emotion/react'
import { theme } from './styles/theme'
import { globalStyle } from './styles/globalStyle'
import AppRoutes from './AppRoutes'

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyle}/>
                <AppRoutes />
            </ThemeProvider>
        </>
    )
}

export default App