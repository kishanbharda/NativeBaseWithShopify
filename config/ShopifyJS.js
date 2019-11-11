import Client from 'shopify-buy/index.unoptimized.umd';

const client = Client.buildClient({
  domain: 'your_project.myshopify.com',
  storefrontAccessToken: 'storefrontAccessToken'
});

export default client
