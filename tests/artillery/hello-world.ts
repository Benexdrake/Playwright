import { Page } from '@playwright/test';
 
export const config = {
  target: 'https://www.artillery.io',
  engines: {
    playwright: {}
  }
};
 
export const scenarios = [{
  engine: 'playwright',
  testFunction: helloWorld
}];
 
async function helloWorld(page: Page) {
  await page.goto('https://www.artillery.io/');
  await page.click('text=Docs');
}