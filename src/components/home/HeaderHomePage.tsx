/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SamePrimaryLogo from "../../assets/img_home_page/same-primary-logo.png";
import { theme } from "../../styles/theme";
import SameAccountLogo from "../../assets/img_home_page/same-account-logo.svg";

export default function HeaderHomePage(){

    const pageStyles = css`
        .home{
            min-height: 100dvh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
            color: ${theme.colors.textWhite};
            font-size: ${theme.fontSize.sm};
            backdrop-filter: blur(4px);
            display: flex;
                justify-content: space-between;
                align-items: center;
            overflow: hidden;
        }
    `

    const imgCss = css`
        display: block;
        widht: 150px;
        max-widht:100%;
        height: 120px;
        margin: 10px auto 0;
        margin-left: 12px;

    `

    const accountLogo = css`
    width: 50px;
    height: 50px;`

    const headerSection = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    `
    
    return(
        <>
            <header className="home">
                <nav>
                    <section css={headerSection} style={{backgroundColor: theme.glass.bgHeader}}>
                        <img src={SamePrimaryLogo} alt="Same Primary Logo" css={imgCss} />
                        
                        <a href="#"><img src={SameAccountLogo} alt="Same Account Logo" css={accountLogo}/></a>
                    </section>
                </nav>
            </header>
        </>   
    )
}

