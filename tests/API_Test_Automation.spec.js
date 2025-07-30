const { test,expect } = require('@playwright/test');
const { Secrets } = require('../shared/secrets');
const { Payload } = require('../shared/payload');

test('Verify API login', async ({ request }) => {
const postResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login',{ 
          headers:{
            'Content-Type': "application/json",
            'Connection': "keep-alive",
            'User-Agent': "PostmanRuntime/7.44.1"
          },
          data:  {
            "userEmail": Secrets.email,
            "userPassword": Secrets.password
          }
        });

  //Verify request is successful
  console.log(postResponse.status());
  expect(postResponse.status()).toBe(200);

});

test('Verify API Add to Cart', async ({ request }) => {
const postResponse = await request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',{ 
          headers:{
            'Content-Type': "application/json",
            'Connection': "keep-alive",
            'User-Agent': "PostmanRuntime/7.44.1",
            'Authorization': `${Secrets.token}`
          },
          data: Payload.zaraCoat
        });

  //Verify request is successful
  console.log(postResponse.status());
  expect(postResponse.status()).toBe(200);

});

test('Verify API Create an Order', async ({ request }) => {
const postResponse = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{ 
          headers:{
            'Content-Type': "application/json",
            'Connection': "keep-alive",
            'User-Agent': "PostmanRuntime/7.44.1",
            'Authorization': `${Secrets.token}`
          },
          data: Payload.orderId
        });

  //Verify order creation is successful
  console.log(postResponse.status());
  expect(postResponse.status()).toBe(201);

});

test('Verify API Retrieve the Orders', async ({ request }) => {
const getResponse = await request.get('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/674d8bf6eb3c71ba7921328b', {
          headers:{
            'Content-Type': "application/json",
            'Connection': "keep-alive",
            'User-Agent': "PostmanRuntime/7.44.1",
            'Authorization': `${Secrets.token}`
          }
          //data: Payload.orderId
          });
  
          //Get the response body
      const responseBody = await getResponse.json();
      console.log('Response Body:', responseBody);

  //Verify order retrieval is successful
  console.log(getResponse.status());
  expect(getResponse.status()).toBe(200);
});