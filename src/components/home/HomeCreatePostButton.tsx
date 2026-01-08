/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SamePostLogo from '../../assets/img_home_page/same-primary-logo2.png'
import HomePostCreate from './HomePostCreate';
import { useState } from "react";

export default function HomeCreatePostButton() 
{
    const [isModalOpen, setIsModalOpen] = useState(false);

const postButton = css`
    position: fixed;  
    right: 30px;     
    bottom: 30px;       
    cursor: pointer;
    z-index: 1000;   
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    img {
      width: 170px; 
      height: auto;
    }

    @media (max-width: 768px) {
      right: 15px;
      bottom: 15px;  
      img {
        width: 120px;
      }
    }
  `;

const overlayCss = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(65, 65, 65, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

const closeCrossCss = css`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'SF Pro', sans-serif;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
    }
`;
    return (
            <>
                <article css={postButton} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <img src={SamePostLogo} alt="Create Post" />
                </article>

                {isModalOpen && (
                    <div css={overlayCss} onClick={() => setIsModalOpen(false)}>
                        
                        <button css={closeCrossCss} onClick={() => setIsModalOpen(false)}>
                            ✕
                        </button>

                        <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <HomePostCreate />
                        </div>
                    </div>
                )}
            </>
    );
}