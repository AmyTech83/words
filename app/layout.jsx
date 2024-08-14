
export default function Layout({children}){
    return(
        <html lang="es">
            <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/w.ico" sizes="any" />
          <title>Words</title>
        </head>
            <body>
                {children}
            </body>
        </html>
    )
}