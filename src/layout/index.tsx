import { ReactNode } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'
import ThemeLayout from './themeLayout'

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
                    {children}
                <Footer />
            </ThemeLayout>
        </>
    )
}

export default AppLayout