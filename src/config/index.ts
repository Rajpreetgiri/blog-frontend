export const base_url = "https://cloudart.com.au:4041/api"
export const isUserLoggedInToken = () => localStorage.getItem('token')
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const userData = () => localStorage ? JSON.parse(localStorage.getItem('userData') as string) : null
