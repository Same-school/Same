/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HomePage from '../components/home/HomePage'
import HeaderHomePage from '../components/home/HeaderHomePage'
import HomePost from '../components/home/HomePost'
import TagList from '../components/home/TagList'
import { theme } from '../styles/theme'
import HomeCreatePostButton from '../components/home/HomeCreatePostButton'

export default function HomeView() {
  const [showTags, setShowTags] = useState(false)

  const mainContainerCss = css`
    width: 100%;
    min-height: calc(100dvh - 80px);
    display: flex;
    flex-direction: column;
    background-color: ${theme.glass.bgHomePage};
    padding-top: 2rem;
    overflow: auto;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `

  const topBarCss = css`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0 1rem;

    @media (min-width: 1024px) {
      display: none;
    }
  `

  const toggleButtonCss = css`
    background-color: ${theme.colors.textWhite || '#ffffff'};
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: ${theme.shadow.md};
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  `

  const gridLayoutCss = css`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding-left: 1rem;
    padding-bottom: 5rem;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 200px 1fr 200px;
      padding-left: 0;
      padding-bottom: 2rem;
    }
  `

  const tagColumnCss = css`
    display: ${showTags ? 'block' : 'none'};
    position: fixed;
    left: 0px;
    top: 80px;
    width: 100%;
    max-width: 300px;
    height: calc(100dvh - 80px);
    background: ${theme.glass.bgHomePage};
    z-index: 100;
    overflow-y: auto;
    animation: slideIn 0.3s ease-in-out;

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @media (min-width: 1024px) {
      display: block;
      position: static;
      width: auto;
      height: auto;
      background: transparent;
      z-index: auto;
      overflow-y: visible;
      animation: none;
    }
  `

  const overlayMobileCss = css`
    display: ${showTags ? 'block' : 'none'};
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100dvh - 80px);
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;

    @media (min-width: 1024px) {
      display: none;
    }
  `

  const contentColumnCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  `

  return (
    <>
      <HeaderHomePage />

      <div css={mainContainerCss}>
        <div css={topBarCss}>
          <button css={toggleButtonCss} onClick={() => setShowTags(!showTags)}>
            ☰ Tags
          </button>
        </div>

        <div css={overlayMobileCss} onClick={() => setShowTags(false)} />

        <div css={gridLayoutCss}>
          <div css={tagColumnCss}>
            <TagList onClose={() => setShowTags(false)} />
          </div>
          
          <div css={contentColumnCss}>
            <HomePage />
            <HomePost />
            <Link to="/signup">Link to Signup Page</Link>
            <HomeCreatePostButton />
          </div>
          <div />
        </div>
      </div>
    </>
  )
}
