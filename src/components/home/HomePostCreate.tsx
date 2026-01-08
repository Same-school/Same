/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { useState } from 'react';

// Styles du formulaire
const containerStyle = css`
    background-color: ${theme.colors.bgPrimary};
    border-radius: 24px;
    width: 100%;
    max-width: 600px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin: auto;
`;

const titleStyle = css`
    font-family: 'Tangkiwood', sans-serif;
    color: white;
    font-size: 4rem; /* BIEN GRAND comme demandé */
    text-align: center;
    margin: 0 0 10px 0;
    letter-spacing: -1px;
`;

const inputWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const baseInput = css`
    font-family: 'SF Pro', sans-serif;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    padding: 15px 20px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    outline: none;

    &:focus {
        background: rgba(255, 255, 255, 0.1);
        border-color: #007AFF; /* Bleu Apple */
        box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.3);
    }
`;

const textareaStyle = css`
    ${baseInput};
    min-height: 150px;
    resize: none;
`;

const submitBtn = css`
    font-family: 'SF Pro', sans-serif;
    background-color: #007AFF;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;

    &:hover {
        background-color: #0063CC;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export default function HomePostCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
        alert("Remplis tous les champs frérot !");
        return;
    }

    console.log("Envoi du post :", { title, content });

    try {
        const reponse = await fetch('https://sameapi-e8dmf9f6a7h2gkbh.francecentral-01.azurewebsites.net/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ 
                title: title, 
                content: content,
                userDaold: 0 
            }),
        });

        if (reponse.ok) {
            const text = await reponse.text();
            const data = text ? JSON.parse(text) : {};
            
            console.log("Post créé avec succès !", data);
            alert("Post publié !");

            setTitle("");
            setContent("");

            // 3. Optionnel : Fermer la popup si tu passes une fonction onClose en props
            // onClose(); 
            
        } else {
            const errorText = await reponse.text();
            throw new Error(`Erreur serveur: ${reponse.status} - ${errorText}`);
        }

    } catch (error) {
        console.error("Erreur lors de la création :", error);
        alert("Impossible de créer le post. Vérifie ta connexion.");
    }
};

    return (
        <section css={containerStyle}>
            <header>
                <h1 css={titleStyle}>Post</h1>
            </header>

            <div css={inputWrapper}>
                <input 
                    css={baseInput}
                    type="text" 
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div css={inputWrapper}>
                <textarea 
                    css={textareaStyle}
                    placeholder="Contenu"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <button css={submitBtn} onClick={handleSubmit}>
                Publier le post
            </button>
        </section>        
    );
}