"use client";
import style from "../public/styles/style.module.css";
import Card from "../Components/card";
import "../public/styles/global.css";
import Image from "next/image";


export default function Page() {
  return (
    <> 
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/w.ico" sizes="any" />
          <title>Words</title>
        </head>
        <body>
          <Card></Card>
        </body>
    </>
  );
}
