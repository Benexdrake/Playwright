import { test, expect } from '@playwright/test';

test.describe('Übung 1', () =>
{
    test('example.com should be title Example Domain', async ({page}) =>
    {
        // Arrange
        const url = 'https://example.com';

        // Act
        await page.goto(url);

        // Assert
        await expect(page).toHaveTitle('Example Domain')
    })

    test('wikipedia.com should be title Wikipedia', async ({page}) =>
    {
        // Arrange
        const url = 'https://www.wikipedia.org/';

        // Act
        await page.goto(url);

        // Assert
        await expect(page).toHaveTitle('Wikipedia')
    })

    test('de.wikipedia.com should have a navigation bar', async ({page}) =>
    {
        // Arrange
        const url = 'https://de.wikipedia.org/';

        // Act
        await page.goto(url);

        const navigationSideBar = await page.$('#mw-panel')
        // const text = await navigationSideBar?.evaluate(x => x.textContent);

        // Assert
        expect(navigationSideBar).toBeDefined();
    })

    test('soucedemo.com should login working', async ({page}) =>
    {
        // Arrange
        const url = 'https://www.saucedemo.com/';
        const username = 'standard_user';
        const password = 'secret_sauce';

        const shoppingUrl = 'https://www.saucedemo.com/inventory.html';


        // Act
        await page.goto(url);

        // <input class="input_error form_input" placeholder="Username" type="text" data-test="username" id="user-name" name="user-name" autocorrect="off" autocapitalize="none" value="">
        const input_username = await page.$('input#user-name');
        await input_username?.fill(username)

        //<input class="input_error form_input" placeholder="Password" type="password" data-test="password" id="password" name="password" autocorrect="off" autocapitalize="none" value="">
        const input_password = await page.$('input#password')
        await input_password?.fill(password)

        // <input type="submit" class="submit-button btn_action" data-test="login-button" id="login-button" name="login-button" value="Login">
        const input_button = await page.$('input#login-button')
        await input_button?.click();
        

        // Assert
        await expect(page).toHaveURL(shoppingUrl);
    })

    test('wikipedia should find a article about playwright', async ({page}) =>
    {
        // Arrange
        const url = 'https://wikipedia.org'
        const searchTerm = 'Playwright'

        // Act
        await page.goto(url);

        await page.fill('input[name="search"]', searchTerm)
        page.keyboard.press('Enter')

        await new Promise(f => setTimeout(f, 1000));
        const titleH1 = await page.$('h1#firstHeading')
        const title = await titleH1.evaluate(x => x.textContent);
        
        // Assert
        expect(title.toLowerCase()).toBe(searchTerm.toLowerCase())
    })

    test('should make a screenshot after site finished loading', async ({page}) =>
    {
        // Arrange
        const url = 'https://wikipedia.org';

        // Act
        await page.goto(url)

        await page.screenshot();

        // Assert
        await expect(page).toHaveScreenshot();
    })
})