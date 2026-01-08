/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SamePrimaryLogo from "../../assets/img_home_page/same-logo3.png";
import { theme } from "../../styles/theme";
import SameAccountLogo from "../../assets/img_home_page/same-account-logo.svg";

export default function HeaderHomePage(){

    const imgCss = css`
        display: block;
        height: 120px;
        margin: 10px auto 0;
        margin-left: 12px;

    `

    const accountLogo = css`
    width: 50px;
    height: 50px;`

    const headerSection = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
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

