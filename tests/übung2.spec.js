import { test, expect } from '@playwright/test';

test.describe('Übung 2', () =>
{
    test('multinavigation should work and found en as language', async ({page}) =>
    {
        // Arrange
        const url = 'https://wikipedia.org'
        const searchTerm = 'Playwright (software)'

        // Act
        await page.goto(url)
        await page.click('a[id=js-link-box-en]')
        
        await new Promise(f => setTimeout(f, 1000));

        await page.fill('input[name="search"]', searchTerm)
        page.keyboard.press('Enter')

        await new Promise(f => setTimeout(f, 1000));
        const titleH1 = await page.$('h1#firstHeading')
        const title = await titleH1.evaluate(x => x.textContent);

        // Assert
        expect(title.toLowerCase()).toBe(searchTerm.toLowerCase())
    })

    test('login without input filled should show an error', async ({page}) =>
    {
        // Arrange
        const url = 'https://www.saucedemo.com/'
        // Act
        await page.goto(url);

        // <input type="submit" class="submit-button btn_action" data-test="login-button" id="login-button" name="login-button" value="Login">
        // const input_button = await page.$('input#login-button')
        const input_button = await page.$('input[id=login-button]')
        await input_button?.click()
        const error_field = await page.$('.error-message-container')
        
        // Assert
        expect(error_field).toBeDefined();
    })

    test('login in with wrong password should show an error', async ({page}) =>
    {
        // Arrange
        const url = 'https://www.saucedemo.com/';
        const username = 'standard_user';
        const password = 'secretsauce';

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
        
        const error_field = await page.$('.error-message-container')
        
        // Assert
        expect(error_field).toBeDefined();
    })

    test('put items in shopping cart, should more then one', async ({page}) =>
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

        await new Promise(f => setTimeout(f, 1000));

        const product_list = await page.$$('.inventory_item')

        for(const product of product_list)
        {
            const product_add_button = await product.$('button.btn_inventory')
            await product_add_button?.click();

        }
        await new Promise(f => setTimeout(f, 1000));
        const shopping_card_count_badge = await page.$('.shopping_cart_badge')
        
        const shopping_card_count = await shopping_card_count_badge?.evaluate(x => parseInt(x.textContent));

        await page.pause();

        // Assert
        expect(product_list.length).toBeGreaterThan(0);
        expect(shopping_card_count).toBeGreaterThan(0);
    })
})