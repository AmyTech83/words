"use client";
import style from "../public/styles/style.module.css";
import Card from "../Components/card";
import "../public/styles/global.css";
import Image from "next/image";
import { useEffect, useState } from "react";

// Función debounce para limitar la frecuencia de manejo del evento
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function Page() {
  const [scrolling, setScrolling] = useState(false);
  
  // Ajusta la cantidad de píxeles para el desplazamiento con el teclado
  const scrollAmountVH = 100; // Cambia este valor para ajustar el desplazamiento con el teclado
  const scrollAmount = (window.innerHeight * scrollAmountVH) / 100;
  // Ajusta la cantidad de píxeles para el desplazamiento con la rueda del mouse
  const scrollAmountWheelVH = 100; // Cambia este valor para ajustar el desplazamiento con la rueda del mouse
  const scrollAmountWheel = (window.innerHeight * scrollAmountWheelVH) / 100; // Conversión de vh a píxeles
  // Ajusta la cantidad de vh para el desplazamiento táctil
  const scrollAmountTouchVH = 100; // Valor en vh
  const scrollAmountTouch = (window.innerHeight * scrollAmountTouchVH) / 100; // Conversión de vh a píxeles
  useEffect(() => {
    function handleScroll(event) {
      if (!scrolling) {
        setScrolling(true);
        if (event.key === 'ArrowUp') {
          window.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
          }); // Scroll hacia arriba
        } else if (event.key === 'ArrowDown') {
          window.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          }); // Scroll hacia abajo
        }
        // Restablece el estado después de un breve intervalo para evitar el acumulado
        setTimeout(() => setScrolling(false), 600);
      }
    }

    function handleWheelScroll(event) {
      event.preventDefault(); // Evitar el comportamiento por defecto del navegador
      if (!scrolling) {
        setScrolling(true);
        if (event.deltaY < 0) {
          window.scrollBy({
            top: -scrollAmountWheel,
            behavior: 'smooth'
          }); // Scroll hacia arriba
        } else if (event.deltaY > 0) {
          window.scrollBy({
            top: scrollAmountWheel,
            behavior: 'smooth'
          }); // Scroll hacia abajo
        }
        // Restablece el estado después de un breve intervalo para evitar el acumulado
        setTimeout(() => setScrolling(false), 600);
      }
    }

    function handleTouchStart(event) {
      // Guarda la posición inicial del toque
      this.touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      // Calcula la diferencia de posición del toque
      const touchEndY = event.touches[0].clientY;
      const deltaY = this.touchStartY - touchEndY; // Invierte la dirección del desplazamiento
      event.preventDefault(); // Evitar el comportamiento por defecto del navegador
      if (!scrolling) {
        setScrolling(true);
        if (deltaY < 0) {
          window.scrollBy({
            top: -scrollAmountTouch,
            behavior: 'smooth'
          }); // Scroll hacia abajo (inverso)
        } else if (deltaY > 0) {
          window.scrollBy({
            top: scrollAmountTouch,
            behavior: 'smooth'
          }); // Scroll hacia arriba (inverso)
        }
        // Restablece el estado después de un breve intervalo para evitar el acumulado
        setTimeout(() => setScrolling(false), 600);
      }
    }

    // Usar debounce para manejar el evento de scroll del mouse
    const debouncedHandleWheelScroll = debounce(handleWheelScroll, 100);

    // Agrega los event listeners cuando el componente se monta
    window.addEventListener('keydown', handleScroll);
    window.addEventListener('wheel', debouncedHandleWheelScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Elimina los event listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleScroll);
      window.removeEventListener('wheel', debouncedHandleWheelScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrolling]);

  return (
    <> 
      <html lang="es">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/w.ico" sizes="any" />
          <title>Words</title>
        </head>
        <body>
          <div className={style.container}>
            <Card></Card>
          </div>
        </body>
      </html>
    </>
  );
}
