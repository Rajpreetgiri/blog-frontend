import { ThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const ThemeLayout = ({ children }: Props) => {

    let theme = createTheme({
        typography: {
            fontFamily: [
                'Public Sans',
                'sans-serif',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
              ].join(','),
              fontSize: 13.125,
              h1: {
                fontWeight: 500,
                fontSize: '2.375rem',
                lineHeight: 1.368421
              },
              h2: {
                fontWeight: 500,
                fontSize: '2rem',
                lineHeight: 1.375
              },
              h3: {
                fontWeight: 500,
                lineHeight: 1.38462,
                fontSize: '1.625rem'
              },
              h4: {
                fontWeight: 500,
                lineHeight: 1.364,
                fontSize: '1.375rem'
              },
              h5: {
                fontWeight: 500,
                lineHeight: 1.3334,
                fontSize: '1.125rem'
              },
              h6: {
                lineHeight: 1.4,
                fontSize: '0.9375rem'
              },
              subtitle1: {
                fontSize: '1rem',
                letterSpacing: '0.15px'
              },
              subtitle2: {
                lineHeight: 1.32,
                fontSize: '0.875rem',
                letterSpacing: '0.1px'
              },
              body1: {
                lineHeight: 1.467,
                fontSize: '0.9375rem'
              },
              body2: {
                fontSize: '0.8125rem',
                lineHeight: 1.53846154
              },
              button: {
                lineHeight: 1.2,
                fontSize: '0.9375rem',
                letterSpacing: '0.43px'
              },
              caption: {
                lineHeight: 1.273,
                fontSize: '0.6875rem'
              },
              overline: {
                fontSize: '0.75rem',
                letterSpacing: '1px'
              }
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h2',
                        h2: 'h2',
                        h3: 'h2',
                        h4: 'h2',
                        h5: 'h2',
                        h6: 'h2',
                        subtitle1: 'h2',
                        subtitle2: 'h2',
                        body1: 'span',
                        body2: 'span',
                    },
                },
            },
        },
    });

    theme = responsiveFontSizes(theme);

    return (
        <>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </>
    )
}

export default ThemeLayout