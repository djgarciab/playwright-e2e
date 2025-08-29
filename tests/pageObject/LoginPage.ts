import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{

    private readonly userNameTextBox: Locator
    private readonly passwordTextBox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    // La localizacion del elemento se pone en el constructor, que es lo 1ero que se ejecuta
    constructor(page: Page){
        this.userNameTextBox = page.getByRole('textbox', {name:'Username'})
        this.passwordTextBox = page.getByRole('textbox', {name:'Password'})
        this.loginButton = page.getByRole('button', {name:'Login'})
        this.shoppingCartIcon = page.locator("xpath=//a[contains(@class,'shopping_cart_link')]")
    }
    // luego se realiza la interaccion de cada elemento
    async fillUsername(user:string){
        await this.userNameTextBox.fill(user);
    }
    async fillPassword(pass: string){
        await this.passwordTextBox.fill(pass);
    }
    async clickOnLogin(){
        await this.loginButton.click();
    }

    async loginWithCredentials(username:string, password: string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
    }

    async chckSuccessfulLogin(){
        await expect(this.shoppingCartIcon).toBeVisible();
    }

}