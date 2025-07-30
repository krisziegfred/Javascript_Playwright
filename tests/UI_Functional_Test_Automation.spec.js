const { test, expect } = require('@playwright/test');
const { Secrets } = require('../shared/secrets');
const { Payload } = require('../shared/payload');




test('Verify Web Client App login', async ({ page }) => {
   
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(Secrets.email);
   await page.locator("#userPassword").fill(Secrets.password);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === Payload.productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();

   //Verify item is visible in "My Cart".
   const bool = await page.locator(`h3:has-text('${Payload.productName.toLowerCase()}')`).isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("Phi");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " Philippines") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   //Verify email is automatically added in the field and is correct.
   expect(page.locator(".user__name [type='text']").first()).toHaveText(Secrets.email);
   await page.locator(".action__submit").click();

   //Verify order confirmation message.
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();

   //Verify order ID is correct.
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});








