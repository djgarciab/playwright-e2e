import { test, expect } from '@playwright/test'

test('Test web table', async ({page}) => { 
    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    // localiza la tabla
    const tableContainer = await page.locator("xpath=//table[@id='countries']")
    // obtiene todas las filas de la tabla
    const rows = await tableContainer.locator("xpath=.//tr").all()
    //cuenta las filas
    console.log(rows.length)

    // muestra las filas en consola
    /* 
    for(let row of rows){
        console.log(await row.innerText())
    }
    */

    // toma la fila del 1er pais
    const row1 = rows.at(1);
    //obtener los datos del 1er pais
    const countryName = await row1?.locator('xpath=.//td[2]').innerText()
    const countryCapital = await row1?.locator('xpath=.//td[3]').innerText()
    const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText()
    console.log(countryName, countryCapital, countryCurrency)

    // si se usa la interface para gestionar los datos
    const countries:Country[]=[]
    //se toma cada pais y se agrega a la lista de paises
    for(let row of rows){
        let country:Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText(),
        }
        countries.push(country)
    }
    //muestra los datos de cada pais
    /*
    for(let pais of countries){
        console.log(pais)
    }
    */
   const countryLanguagePortuguese= countries.filter( country=>country.primaryLanguage ==='Portuguese')
   console.log('Language portuguese: ', countryLanguagePortuguese)

})

interface Country{
    name:string
    capital:string
    currency:string
    primaryLanguage:string
}

/**
 element container //table[@id='countries']
 //table[@id='countries']//tr[2]//td[1]  -> Check
 //table[@id='countries']//tr[2]//td[2]  -> Country
 //table[@id='countries']//tr[2]//td[3]  -> Capital
 //table[@id='countries']//tr[2]//td[4]  -> Currency
 //table[@id='countries']//tr[2]//td[5]  -> Primary Language
*/