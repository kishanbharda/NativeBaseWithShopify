import Shopify from '../../config/ShopifyJS';

const sendResetUrl = (email) => {
    return async () => {
        const mutation = Shopify.graphQLClient.mutation('resetPasswordMutation', (root) => {
            root.add('customerRecover', { args: { email }}, (cr) => {
                cr.add('customerUserErrors', (err) => {
                    err.add('message');
                });
            });
        });
        const { model } = await Shopify.graphQLClient.send(mutation);
        if (model.customerRecover?.customerUserErrors?.length > 0) {
            return {
                isSent: false,
                message: model.customerRecover.customerUserErrors[0].message
            }
        } 
        return {
            isSent: true,
            message: null
        }
    }
}

export default sendResetUrl
