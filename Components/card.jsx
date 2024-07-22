
import React from "react"
import styles from "./card.module.css"
import Fecha from "../Components/fecha"
import Button from "../Components/Buttons/Button";
import data from "../public/lib/data.json"
export default function Card(){
    // Se inicializa la fecha
    const currentDate = new Date().toISOString();
    const datos = JSON.stringify(data, null, 2);
    const dataCards = JSON.parse(datos);
    
    return (
        <>
            {dataCards.map((item) => (
                <div className={styles.containerPublicaciones} key={item.id}>
                    <div className={styles.card}>
                        <div className={styles.headerCard}>
                            {/* Aquí se muestra la fecha */}
                            <p className={styles.fecha}><Fecha dateString={currentDate} /></p>
                        </div>
                        <div className={styles.bodyCard}>
                            <h2>{item.titulo}</h2><br />
                            <p>{item.parrafo}</p>
                        </div>
                        <div className={styles.footerCard}>
                            {/* Pasar propiedades relevantes al Button */}
                            <Button itemId={item.id}></Button>
                            <p>- {item.autor}</p>
                        </div>
                    </div>
                    <div>
                        <hr className={styles.linea} />
                    </div>
                </div>
            ))}
        </>
    );
}