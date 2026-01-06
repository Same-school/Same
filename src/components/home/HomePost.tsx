/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SameAccountLogo from '../../assets/img_home_page/same-account-logo.svg';
import { theme } from '../../styles/theme';
import SameLikeLogo from '../../assets/img_home_page/same-like-logo.png';
import SameCommentLogo from '../../assets/img_home_page/same-comment-logo.png'
import SameSendLogo from '../../assets/img_home_page/same-send-logo.png'
import SamePostLogo from '../../assets/img_home_page/same-post-logo.png'
import { useState, useEffect } from "react";
import HomePostCreate from './HomePostCreate';

interface Post {
    id: number;
    title: string | null;
    content: string | null;
    likes_count: number | null;
    comments_count: number | null;
    userDaoId: number | null;
}

export default function HomePost(){

    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const postCss = css`
    display: flex;
    flex-direction: column;
    width: 100%;                    /* Mobile first: 100% */
    max-width: 420px;               /* Limite sur desktop */
    margin: 20px auto;              /* CENTRE la carte */
    border-radius: 20px;
    background: ${theme.glass.bgPost};
    box-shadow: ${theme.shadow.md};
    overflow: hidden;
    padding: 0 10px;                /* Petit padding sur mobile */

    @media (min-width: 768px) {
      width: 420px;
      padding: 0;
    }
    
    font-family: 'Tangkiwood', sans-serif;
    `;

    const headerCss = css`
        background: ${theme.glass.focusShadow};
        display: flex;
        align-items: center;
        padding: 12px 20px;
        gap: 12px;
    `;

    const avatarCss = css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${theme.colors.textWhite};
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        object-fit: cover;
    `;

    const imgCss = css`
        width: 70px;
    `

    const imgLogo = css`
        background: ${theme.glass.focusShadow};
        display: flex;
        align-items: center;
        padding: 12px 20px;
        width: 20%;
    `

    const text = css`
        display: flex;
        text-align: centre;
        padding: 10px;
        font-family: 'SF Pro', sans-serif;
    `

    const backColor = css`
        box-shadow: ${theme.glass.focusShadow};
    `


    const postButton = css`
        position: fixed; /* Fixe le bouton par rapport à la fenêtre */
        right: 30px;     /* Distance du bord droit */
        bottom: 30px;    /* Distance du bord bas */
        cursor: pointer;
        z-index: 100;    /* S'assure qu'il passe devant les posts */
        transition: transform 0.2s ease;

        /* Effet au survol pour le rendre interactif */
        &:hover {
            transform: scale(1.1);
        }

        img {
            width: 180px; /* Ajuste la taille selon ton logo "Post" */
            height: auto;
        }

        @media (max-width: 768px) {
            right: 20px;
            bottom: 20px;
            img {
                width: 100px;
            }
        }
    `

    const deleteBtn = css`
        white-space: nowrap;    /* Empêche le texte de passer à la ligne */
        cursor: pointer;
        background: none;
        border: none;
        color: white;
    `

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
`


    async function fnGetRecentPosts() {
        try {
            // Utilisation du nouveau lien sans paramètre d'ID
            const reponse = await fetch(`https://sameapi-e8dmf9f6a7h2gkbh.francecentral-01.azurewebsites.net/api/post/getRecentPost`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });

            if (!reponse.ok) {
                throw new Error(`Erreur HTTP: ${reponse.status}`);
            }

            const data = await reponse.json();
            console.log("Posts récents récupérés :", data);
            return data;

        } catch (error) {
            console.error("Erreur lors de la récupération des posts :", error);
            return [];
        }
    }

    async function fnDeletePost(postId: number) 
    {
        try{
            const reponse = await fetch(`https://sameapi-e8dmf9f6a7h2gkbh.francecentral-01.azurewebsites.net/api/post/delete/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });

            if (!reponse.ok) {
                throw new Error(`Erreur HTTP: ${reponse.status}`);
            }

            const text = await reponse.text();
            const data = text ? JSON.parse(text) : {success: true};
            console.log("Post supprimé avec succès :", data);

            setPosts((prev) => prev.filter(p => p.id !== postId));

            return data;
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
            return null;
        }
    }

    useEffect(() => {
        async function load() {
            const posts = await fnGetRecentPosts();
            console.log("📌 Résultat API (Recent Posts) :", posts);
            setPosts(posts);
        }

        load();
    }, []);
    

    return(
        <>
            {/* Liste des posts */}
            {posts.map((post) => (
                <main key={post.id} css={postCss}>
                    <section css={headerCss}>
                        <img src={SameAccountLogo} alt="Account" css={avatarCss} />
                        <h1>{post.title}</h1>
                    </section>

                    <article css={text}>
                        {post.content}
                    </article>

                    <section css={imgLogo}>
                        <img src={SameLikeLogo} alt="Like" />
                        <img src={SameCommentLogo} alt="Comment" />
                        <img src={SameSendLogo} alt="Send" />
                        <button 
                            onClick={() => fnDeletePost(post.id)}
                            css={deleteBtn}
                        >
                            Supprimer 🗑️
                        </button>
                    </section>
                </main>
            ))}

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