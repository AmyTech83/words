import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";
import data from "../public/lib/data.json";
import Image from "next/image";
import Button from "../Components/Buttons/Button";

export default function Card() {
    const containerRef = useRef(null);
    const touchStartY = useRef(0);
    const [scrollAmount, setScrollAmount] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    // Modificar esta variable para ajustar el porcentaje del scroll
    const scrollPercentage = 100; // Ajusta el porcentaje de scroll (por ejemplo, 100 para 100vh)
    const touchThreshold =50; // Mínima distancia en px para considerar un desplazamiento táctil

    useEffect(() => {
        const calculateScrollAmount = () => {
            const vh = window.innerHeight; // Altura del viewport en píxeles
            setScrollAmount((vh * scrollPercentage)/ 100); // Ajusta el scrollAmount basado en el porcentaje
        };

        calculateScrollAmount();
        window.addEventListener("resize", calculateScrollAmount);

        const handleScroll = (event) => {
            event.preventDefault();
            if (isScrolling) return;
            setIsScrolling(true);

            if (containerRef.current) {
                if (event.deltaY > 0 || event.key === "ArrowDown") {
                    containerRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
                } else if (event.deltaY < 0 || event.key === "ArrowUp") {
                    containerRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
                }
            }

            setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        };

        const handleTouchStart = (event) => {
            event.preventDefault();
            touchStartY.current = event.touches[0].clientY;
        };

        const handleTouchEnd = (event) => {
            event.preventDefault();
            const touchEndY = event.changedTouches[0].clientY;
            const touchDelta = touchStartY.current - touchEndY; // Diferencia entre el inicio y el final del touch

            if (Math.abs(touchDelta) > touchThreshold) { // Aplicar solo si supera el umbral
                if (containerRef.current && !isScrolling) {
                    setIsScrolling(true);

                    if (touchDelta > 0) {
                        // Scroll hacia abajo
                        containerRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
                    } else if (touchDelta < 0) {
                        // Scroll hacia arriba
                        containerRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
                    }

                    setTimeout(() => {
                        setIsScrolling(false);
                    }, 600);
                }
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("keydown", handleScroll, { passive: false });
        containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: false });
        containerRef.current.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("keydown", handleScroll);
            containerRef.current.removeEventListener("touchstart", handleTouchStart);
            containerRef.current.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", calculateScrollAmount);
        };
    }, [scrollAmount, isScrolling]);

    return (
        <div className={styles.containerPublicaciones} ref={containerRef}>
            <div className={styles.containerImage}>
                <Image src="/Images/W.png" alt="Words" width={60} height={60} />
            </div>
            {data.map((item) => (
                <div className={styles.containerCard} key={item.id}>
                    <div className={styles.card}>
                        <div className={styles.headerCard}>
                            <h2>{item.titulo}</h2>
                        </div>
                        <div className={styles.bodyCard}>
                            <p>{item.parrafo}</p>
                        </div>
                        <div className={styles.footerCard}>
                            <Button></Button>
                            <p>-{item.autor}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
