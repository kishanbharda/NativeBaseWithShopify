import Shopify from '../../config/ShopifyJS';


export const searchProducts = (query) => {
  return async () => {
    const productsQuery = Shopify.graphQLClient.query((root) => {
      root.addConnection('products', { args: { first: 250, query: `title:*${query}*` } }, (product) => {
        product.add('title');
        product.add('id');
        product.addConnection('images', { args: { first: 10 } }, (images) => {
          images.add('src');
        });
        product.addConnection('variants', { args: { first: 250 } }, (variant) => {
          variant.add('priceV2', (price) => {
            price.add('amount');
          });
          variant.add('price');
        });
        product.add('availableForSale');
        product.add('handle');
      });
    });

    const { model } = await Shopify.graphQLClient.send(productsQuery);
    console.log(model);
    return model.products
  }
}

export const loadMoreProducts = (products) => {
  return async () => {
    const { model } = await Shopify.fetchNextPage(products);
    return model
  }
}
