import { css } from '@emotion/react'
import type {Theme} from './theme'

export const homePageStyle = (theme: Theme) => css`
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