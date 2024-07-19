'use client';
import React, { useState,useEffect } from 'react';
import styles from "./button.module.css";
import data from "../../public/lib/data.json";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Button({ itemId }){
    // Estado local para manejar el estado de like específico de cada tarjeta
    const [liked, setLiked] = useState(false);
    // Estado local para manejar el contador total de likes
    const [totalLikes, setTotalLikes] = useState(0);

    // Función para manejar el clic en el botón de like
    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked); // Cambiar el estado de liked

        // Actualizar el contador total de likes
        setTotalLikes(prevTotalLikes => newLiked ? prevTotalLikes + 1 : prevTotalLikes - 1);

        // Guardar en localStorage el estado de liked
        localStorage.setItem(`like_${itemId}`, JSON.stringify(newLiked));
    };

    // Efecto para cargar los datos de localStorage al montar el componente
    useEffect(() => {
        const storedLike = localStorage.getItem(`like_${itemId}`);
        if (storedLike !== null) {
            setLiked(JSON.parse(storedLike));
            setTotalLikes(prevTotalLikes => prevTotalLikes + (JSON.parse(storedLike) ? 1 : 0));
        }
    }, [itemId]);

    return (
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleLike}>
                {liked ? <FavoriteIcon className={styles.corazonrojo} sx={{ fontSize: 30 }} /> : <FavoriteBorderIcon sx={{ fontSize: 30 }} />}
            </button>
            <p>{totalLikes} Me gusta</p>
        </div>
    );
};