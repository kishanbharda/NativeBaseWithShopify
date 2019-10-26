const Messages = {
    address: {
        update: "Address updated successfully", 
        create: "Address created successfully",
        deleteConfirmation: "Are you sure you want to remove this address ?",
        deleted: "Address deleted successfully",
        added: "Address added successfully",
        emptyAddresses: "Address list is empty"
    },
    account: {
        passwordChanged: "Password changes successfully",
        retryLogin: "Your password may have changed. Please login again in your account."
    },
    order: {
        completed: "Your order placed successfully",
        emptyOrders: "Your order list is empty"
    },
    login: {
        touchId: "Are you want to enable biometric authentication ?",
        notEnabledTouchId: "You have not enabled biometric authentication for your account.",
        changeTouchId: "If you have changed your password, please update your biometric creditial by login manually",
        updateTouchId: "Are you want to update biometric creditial ?"
    },
    forgotPassword: {
        emailSent: "We've sent you an email with a link to update your password."
    },
    network: {
        notAvailable: "Internet connection is not available"
    },
    products: {
        emptyProducts: "Sorry, There is no products available."
    }
}

export default Messages
