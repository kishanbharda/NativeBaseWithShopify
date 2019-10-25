/** 
 * @param email Email Address
 * @param password Password
*/
export const login = (email: String, password: String): String => {
    return `
        mutation {
            customerAccessTokenCreate(input: {
                email: "${email}",
                password: "${password}"
            }){
                customerAccessToken{accessToken}
            }
        }
    `
}

/**
 * For getting the customer detail
 * @param {String} accessToken Access Token retrieved after login
 */
export const getCustomerDetail = (accessToken) => {
    return `{
        customer(customerAccessToken: "${accessToken}") {
            id
            firstName
            lastName
            email
            displayName 
            phone
        }
    }`
}
