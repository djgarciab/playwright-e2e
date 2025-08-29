import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// WEB Scrapping - Se obtienen datos de la página web
test('Test buscar producto en Mercadolibre', async ({ page }) => { // se le da nombre al test y se maneja asincronamente
  await page.goto('https://www.mercadolibre.com.co') // se le asigna la URL de la página
  await page.locator('input[id=\'cb1-edit\']').fill('IPhone'); // se busca el campo por id y se llena
  await page.keyboard.press('Enter');  // se presiona enter
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();//se espera que sea visible los resultados de la busqueda
  //await page.pause(); //(opcional) para pausar la ejecución y ver el navegador

  const titles =  await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h3').allInnerTexts();//para obtener el texto de todos los títulos

  console.log('El número total de títulos es: ',titles.length);
  for(let title of titles ){
    console.log('El título es: ',title);    
  }
});


test('test con selector y xpath', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // css selector para buscar por id es con #, y para buscar por clase es con punto
  await expect( page.locator('#__docusaurus_skipToContent_fallback')).toBeVisible(); // lo encuentra por id
  await expect( page.locator('.hero__title')).toBeVisible(); // lo encuentra por clase


  // xpath para buscar por tipo de elemento y clase
  await expect( page.locator('xpath=//a[@class="getStarted_Sjon"]')).toBeVisible(); // lo encuentra por clase
  // xpath puede ser iniciando con el //
  await expect( page.locator('//a[@class="gh-btn"]')).toBeVisible(); // lo encuentra por clase


  // puede también buscarse por css asi
  await expect( page.locator('a[class="gh-count"]')).toBeVisible(); // lo encuentra por clase

});


test('Test buscar con placeholder y alt', async ({ page }) => {
  await page.goto('https://www.buscadordeempleo.gov.co/');

  await expect(page.getByPlaceholder('Auxiliar')).toBeVisible();
  await expect(page.getByAltText('Visitar la Página del Gobierno en Colombia')).toBeVisible();
});

test('Test buscar getByRole', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co');

  // en inspeccionar - Elements - Accesibility  encontramos lo de Rol

  // se pone first porque tiene más de un resultado y se elige el primero
  // si solo hay un resultado, no es necesario poner el last o first
  await expect(page.getByRole('link', {name:'Mis compras'}).first()).toBeVisible();

  // se pone last porque tiene más de un resultado y se elige el ultimo
  await expect(page.getByRole('link', {name:'Ingresa'}).last()).toBeVisible();
  //Se pone el exact :true para confirmar que el nombre debe ser igual
  await page.getByRole('link', {name:'Ingresa', exact: true}).click();
  
});