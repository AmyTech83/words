import style from "../public/styles/style.module.css";
import Card from "../Components/card";
import "../public/styles/global.css"
import Image from "next/image"
export default function Page(){
    return(
        <>
            <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Words</title>
            </head>
            <body>
                <div className={style.container}>

                    <div className={style.logo}>
                        <Image
                            src="/Images/Words.svg"
                            width={150}
                            height={150}
                            alt="Logo de words en color rojo en letra cursiva"
                        />
                    </div>
                    <Card></Card>
                </div>

            </body>
            </html>
        </>
    )
}