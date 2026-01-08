/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SameAccountLogo from '../../assets/img_home_page/same-account-logo.svg';
import { theme } from '../../styles/theme';
import SameLikeLogo from '../../assets/img_home_page/same-like-logo.png';
import SameCommentLogo from '../../assets/img_home_page/same-comment-logo.png'
import SameSendLogo from '../../assets/img_home_page/same-send-logo.png'
import { useState, useEffect } from "react";

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

const postCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 20px auto;
  border-radius: 20px;
  background: ${theme.glass.bgPost};
  box-shadow: ${theme.shadow.md};
  overflow: hidden; 
  padding: 0; 
  
  height: auto; 
  min-height: min-content;

  @media (min-width: 768px) {
    width: 420px;
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

const imgLogo = css`
    background: ${theme.glass.focusShadow};
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 12px 20px;
    width: 100%; 

    .actions-left {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    img {
        width: 45px; 
        height: auto;
    }
`;

    const text = css`
    display: block;
    padding: 20px;
    font-family: 'SF Pro', sans-serif;
    color: white;
    line-height: 1.5;
    
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    `

    const deleteBtn = css`
        white-space: nowrap; 
        cursor: pointer;
        background: none;
        border: none;
        color: white;
    `

    async function fnGetRecentPosts() {
        try {
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
                        <div className='actions-left'>
                            <img src={SameLikeLogo} alt="Like" />
                            <img src={SameCommentLogo} alt="Comment" />
                            <img src={SameSendLogo} alt="Send" />
                        </div>
                        <button 
                            onClick={() => fnDeletePost(post.id)}
                            css={deleteBtn}
                        >
                            Supprimer 🗑️
                        </button>
                    </section>
                </main>
            ))}
        </>
    );
}