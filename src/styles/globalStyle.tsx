import { css } from '@emotion/react'
import type {Theme} from './theme'
import MyFontFileSFProBold from '../assets/font/SF-Pro-Display-Bold.otf'
import MyFontFileSFPro from '../assets/font/SFPRODISPLAYREGULAR.OTF'

export const globalStyle = (theme: Theme) => css`
    @font-face {
        font-family:'Tangkiwood';
        src: url(${MyFontFileSFProBold}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'SF Pro';
        src: url(${MyFontFileSFPro}) format('opentype'); /* Format opentype pour .OTF */
        font-weight: normal;
        font-style: normal;
    }

    

    h1, h2, h3 {
        font-family: 'Tangkiwood', sans-serif;
        margin: 0;
        /* Ajoute ces lignes : */
        font-size: 2.5rem;   /* Ajuste ce chiffre (2.5 est assez grand) */
        font-weight: bold;   /* Si tu veux qu'il soit plus épais */
        line-height: 1.2;    /* Pour éviter que les lignes se chevauchent */
    }

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        -webkit-text-size-adjust: 100%;
    }

    body {
        min-height: 100dvh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        color: ${theme.colors.textWhite};
        background-color: ${theme.colors.bgPrimary};
        font-size: ${theme.fontSize.sm};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
        overflow-y: auto;
    }

    h1 {
        text-align: center;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    fieldset { border: none; }
    ul, ol { list-style: none; }

    img, video, iframe {
        max-width: 100%;
        height: auto;
        display: block;
    }

    input, textarea, select {
        font: inherit;
        border: none;
        outline: none;
    }

    label {
        display: none;
    }
`