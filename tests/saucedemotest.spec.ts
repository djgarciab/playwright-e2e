import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/LoginPage';

test('Test loguearse', async ({page}) => { 
     await page.goto('https://www.saucedemo.com/');

     /*  // en LoginPage se puso este código, para no repetir codigo en diferentes tests
     await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
     await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce');
     await page.getByRole('button', {name:'Login'}).click();
    */
    const inicioSesion = new LoginPage(page)
    //await inicioSesion.fillUsername('standard_user')
    //await inicioSesion.fillPassword('secret_sauce')
    //await inicioSesion.clickOnLogin()

    // se agruparon en una sola funcion
    await inicioSesion.loginWithCredentials('standard_user','secret_sauce');

    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();

    //se obtienen todos los objetos
     const itemsContainer = await page.locator('#inventory_container .inventory_item').all(); 
    // se crea un numero random de la cantidad de objetos
     const randomIndex = Math.floor(Math.random() * itemsContainer.length); 
    // se selecciona un item con indice random
    const randomItem = itemsContainer[randomIndex]; 

    const expectName = await randomItem.locator('.inventory_item_name').innerText();
    const expectDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectPrice = await randomItem.locator('.inventory_item_price').innerText();

    console.log(`
        Name: ${expectName}
        Price: ${expectPrice}
        Description: ${expectDescription}
        `)

    // se toma el elemento para buscar el boton y dar click
    await randomItem.getByRole('button', {name:'Add to car'}).click();

    // se toma la pagina para buscar el boton de  carrito de compras
    await page.locator('.shopping_cart_link').click();

    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();

    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();
    const actualDesc = await page.locator('.inventory_item_desc').innerText();

    expect(actualName).toEqual(expectName);
    expect(actualPrice).toEqual(expectPrice);
    expect(actualDesc).toEqual(expectDescription);

    // para verificar que esta bien se crea un error
    //expect(actualName).toEqual(expectPrice);
    await page.getByRole('button', {name:'Checkout'}).click();

    await page.getByRole('textbox', {name:'First Name'}).fill('Test Nombre');
    await page.getByRole('textbox', {name:'Last Name'}).fill('Test Apellido');
    await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('190001');
    await page.getByRole('button', {name:'Continue'}).click();

    await page.getByRole('button', {name:'Finish'}).click();

    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();
    
    //await page.pause();
})


test('Test loguearse con usuario con problema', async ({page}) => { 
     await page.goto('https://www.saucedemo.com/');

    const inicioSesion = new LoginPage(page)
    await inicioSesion.fillUsername('problem_user')
    await inicioSesion.fillPassword('secret_sauce')
    await inicioSesion.clickOnLogin()

    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();

})

test('Test loguearse con credenciales', async ({page}) => { 
     await page.goto('https://www.saucedemo.com/');

    const inicioSesion = new LoginPage(page)
    await inicioSesion.loginWithCredentials('visual_user','secret_sauce');

    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();

})

test('Navegar con dotenv para diferentes ambientes(dev,qa,prod)', async ({page}) => { 
    // con processs.env lee las diferentes variables de los archivos .env
     await page.goto(process.env.URL);

     /*
    const inicioSesion = new LoginPage(page)
    await inicioSesion.loginWithCredentials('visual_user','secret_sauce');

    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();
*/
    //await page.pause();

})

test('Test con screenshot', async ({page}) => { 
    // con processs.env lee las diferentes variables de los archivos .env
     await page.goto('https://www.saucedemo.com/');

    const inicioSesion = new LoginPage(page)
    // se confirma la dir que se guarda la captura de pantalla 
    await page.screenshot({path:'screenshots/login.png', fullPage:true})
    await inicioSesion.loginWithCredentials('visual_user','secret_sauce');
    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();
    //se pone fullpage para que sea de toda la pantalla
    await page.screenshot({path:'screenshots/login_username.png', fullPage:true})
    
//body: await page.screenshot({fullPage:true})

    //await page.pause();

})

// se adiciona testInfo para que lo adicione al index.html 
test('Test con screenshot que se muestre en index.html', async ({page}, testInfo) => { 
    // con processs.env lee las diferentes variables de los archivos .env
     await page.goto('https://www.saucedemo.com/');

    const inicioSesion = new LoginPage(page)
    // se confirma la dir que se guarda la captura de pantalla 
    //await page.screenshot({path:'screenshots/login.png', fullPage:true})
    await inicioSesion.loginWithCredentials('visual_user','secret_sauce');
    // se checkea el inicio de sesion exitoso
    await inicioSesion.chckSuccessfulLogin();
    //se pone fullpage para que sea de toda la pantalla
    
    //await page.screenshot({path:'screenshots/login_username.png', fullPage:true})
   
    // se pone 
    await testInfo.attach('login',{
        body: await page.screenshot({fullPage:true}),
        contentType:'image/png'
    })

    //await page.pause();

})
