"use client";
import style from "../public/styles/style.module.css";
import Card from "../Components/card";
import "../public/styles/global.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    function handleScroll(event) {
      const scrollAmount = 600// 70% de la altura de la ventana
      if (event.key === 'ArrowUp') {
        window.scrollBy(0, -scrollAmount); // Scroll hacia arriba
      } else if (event.key === 'ArrowDown') {
        window.scrollBy(0, scrollAmount); // Scroll hacia abajo
      }
    }

    // Agrega el event listener cuando el componente se monta
    window.addEventListener('keydown', handleScroll);

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleScroll);
    };
  }, []);

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
