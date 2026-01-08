export const theme = {
    glass: {
        bg: 'rgba(255, 255, 255, 0.20)',
        bgHover: 'rgba(255, 255, 255, 0.3)',
        border: 'rgba(255, 255, 255, 0.20)',
        borderHover: 'rgba(255, 255, 255, 0.5)',
        backdrop: 'blur(10px)',
        bgHeader: '#a5abbc',
        focusShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)',
        bgPost: '#414755',
        bgHomePage: '#e8e8e8',
    },
    colors: {
        textWhite: '#fffafa',
        textPlaceholder: 'rgba(255, 255, 255, 0.7)',
        bgPrimary: '#013251',
        borderError: 'rgba(255,103,0,0.7)',
        textError: 'rgba(255,103,0,0.7)',
        bgError: 'rgba(255,103,1, 0.5)',
        errorBoxShadow: 'rgba(255,103,1, 0.2)',
    },
    fontSize: {
        xs: '0.89rem',
        sm: '0.94rem',
        base: '0.9rem',
        lg: '1.22rem',
        xl: '1.33rem',
        '2xl': '1.67rem',
        '3xl': '2.11rem',
    },
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.6,
        loose: 1.75,
    },
    spacing: {
        xs: '0.28rem',
        sm: '0.56rem',
        md: '1rem',
        lg: '1.44rem',
        xl: '2rem',
        '2xl': '3rem',
    },
    input: {
        width: 'min(70vw, 380px)',
        gap: '2vw',
        widthHalf: 'min(calc((min(70vw, 380px) - 2vw) / 2), 180px)',
        widthThird: 'min(calc((min(70vw, 380px) - (2vw * 2)) / 3), 120px)',
        height: '45px',
    },
    borderRadius: {
        sm: '8px',
        md: '9px',
        lg: '20px',
    },
    shadow: {
        md: '0 4px 6px rgba(0, 0, 0, 0.07)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    transition: {
        fast: '0.15s ease',
        normal: '0.3s ease',
    },
    zIndex: {
        modal: 1050,
        fixed: 1080,
    },
}

export type Theme = typeof theme