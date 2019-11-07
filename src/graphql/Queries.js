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

/**
 * firstName: First name of the customer
 * lastName: Last name of the customer
 * email: email of the customer
 * phone: Phone of the customer
 * password: password
 * acceptsMarketing: want to receive mail about marketing?
 * @param {Object} param0 { firstName, lastName, email, phone, password, acceptsMarketing }
 */
export const getSignupQuery = ({
  firstName = "", lastName = "", email = "", phone = "", password = "", acceptsMarketing = false
}) => {
  return `
    mutation {
      customerCreate(input:{
        email: "${email}",
        password: "${password}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        phone: "${phone}",
        acceptsMarketing: "${acceptsMarketing}"
      }) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `
}
