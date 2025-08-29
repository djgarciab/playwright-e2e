import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/LoginPage';

test('Test loguearse con interceptor en dos imagenes', async ({page}) => { 
    await page.on("request", req=>{
        console.log(req.url())
    })

    // evita cargar estas imágenes
    await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg", route =>route.abort())
    await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg", route =>route.abort())

     await page.goto('https://www.saucedemo.com/');
    const inicioSesion = new LoginPage(page)
    await inicioSesion.loginWithCredentials('standard_user','secret_sauce');
    await inicioSesion.chckSuccessfulLogin();

     const itemsContainer = await page.locator('#inventory_container .inventory_item').all(); 

     // en captura de pantalla vemos que no carga las dos imagenes
     await page.screenshot({path:'loginInterceptor.png', fullPage:true})
})

test('Test loguearse con interceptor en todas las imagenes', async ({page}) => { 
    await page.on("request", req=>{
        console.log(req.url())
    })

    // evita cargar estas imágenes
    await page.route("**/*.{jpg,png,jpeg,svg}", route =>route.abort())
    

     await page.goto('https://www.saucedemo.com/');
    const inicioSesion = new LoginPage(page)
    await inicioSesion.loginWithCredentials('standard_user','secret_sauce');
    await inicioSesion.chckSuccessfulLogin();

     const itemsContainer = await page.locator('#inventory_container .inventory_item').all(); 

     // en captura de pantalla vemos que no carga las dos imagenes
     await page.screenshot({path:'loginInterceptor.png', fullPage:true})
})

test('Test con interceptor cambiando respuesta de servidor', async ({page}) => { 


    // cambia respuesta de esta peticion
    await page.route("https://demoqa.com/BookStore/v1/Books", 
        (route) =>{
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type':'application/json'
                },
                body:
                `
                {
                    "books": [
                        {
                            "isbn": "9781449325862",
                            "title": "Test Interceptor",
                            "subTitle": "Cambio de datos de Respuesta de Servidor",
                            "author": "Diego Javier",
                            "publish_date": "2025-08-22T08:48:39.000Z",
                            "publisher": "O'Reilly Media",
                            "pages": 200,
                            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                        }
                    ]
                }
                `
            })
        })

    await page.goto('https://demoqa.com/books')

    await page.pause()
    // en captura de pantalla 
     await page.screenshot({path:'IntercepResServidor.png', fullPage:true})

})