import { ReactNode } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'
import ThemeLayout from './themeLayout'
import { Box } from '@mui/material'

const AppLayout = ({ children }: { children: ReactNode }) => {

    const { pathname } = useLocation()

    if (pathname.includes('login')) {
        return (
            <>
                <ThemeLayout>
                    {children}
                </ThemeLayout>
            </>
        )
    }

    return (
        <>
            <ThemeLayout>
                <Header />
                    <Box sx={{minHeight: "100vh"}}>
                    {children}
                    </Box>
                <Footer />
            </ThemeLayout>
        </>
    )
}

export default AppLayout