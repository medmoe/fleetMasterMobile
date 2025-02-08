import * as SecureStore from "expo-secure-store";

const UNKNOWN_ERROR_MESSAGE = "An error occurred. Please try again"

interface Headers {
    'set-cookie'?: string[];
}

export const handleAuthenticationErrors = (error: any): string => {
    /**
     * This function handles errors that may occur during user authentication.
     *
     * @param {any} error - The error thrown during authentication.
     * @return {string} An error message that describes the error.
     *
     * This function, through one of the many conditions, checks if the error object has a response, a request, or a message.
     * Depending upon this information, the function generates a suitable error message.
     * If the error object contains a response, the function checks if this response has user data or a details.
     * It then generates an error message from this information.
     * If the error object only contains a request but not a response, the generated error message says that there was no response from the server.
     * If the error object doesn't contain a request but contains a message, the function logs the error message, after which, it generates a general failure message.
     * This function returns the appropriately generated error message that helps identify the cause of the error.
     */
    if (error.response) {
        const errorMessages = [];
        if (error.response.data.user) {
            for (const key in error.response.data.user) {
                if (error.response.data.user[key]) {
                    errorMessages.push(...error.response.data.user[key]);
                }
            }
        } else if (error.response.data.detail) {
            errorMessages.push(error.response.data.detail)
        }
        return errorMessages.join("\n") || 'An error occurred during authentication.';
    } else if (error.request) {
        console.error("Error request:", error.request);
        return "No response from server. Please try again later."
    } else {
        console.error("Error message:", error.message);
        return UNKNOWN_ERROR_MESSAGE
    }
};

export const handleGeneralErrors = (error: any): string => {
    /**
     * This function handles general errors.
     * It takes an error as input and should return an appropriate error message.
     * The logic to generate this error message is currently not implemented.
     *
     * @param {any} error - The error that has been thrown.
     * @return {String} An error message that describes the error.
     *
     */
    if (error.response) {
        const errorMessages = [];
        for (const key in error.response.data) {
            if (error.response.data[key]){
                errorMessages.push(...error.response.data[key]);
            }
        }
        return errorMessages.join("\n") || UNKNOWN_ERROR_MESSAGE;
    } else {
        console.error("Error message:", error.message);
        return UNKNOWN_ERROR_MESSAGE
    }

}

export const saveToken = async (key: string, value: string): Promise<boolean> => {
    /**
     * This functions stores a token value under a given key into the secure store.
     *
     * @param {string} key - The key under which the token value will be saved.
     * @param {string} value - The token value to be stored.
     *
     * The function attempts to store the value parameter into the secure storage with the key parameter as the identifier.
     * If the operation was successful, the function returns a promise that resolves to true.
     * If an error occurred during the operation, it catches the error and returns a promise that resolves to false.
     * The function is asynchronous and returns a Promise<boolean>.
     *
     * @return {Promise<boolean>} - Returns a promise that resolves to a Boolean value indicating the success of the operation.
     */
    try {
        await SecureStore.setItemAsync(key, value);
        return true;
    } catch (error) {
        return false;
    }
}
export const getToken = async (key: string) => {
    await SecureStore.getItemAsync(key);
}
export const handleCookies = (headers: Headers) => {
    /**
     * This function handles the handling of "set-cookie" headers from a http response.
     *
     * @param {Headers} headers - An object representing the headers of a http response.
     *
     * If a "set-cookie" header found in the http response, it splits the string into individual cookies.
     * In this implementation, it looks for two specific cookies: "refresh" and "access".
     * If any of these cookie is found, its value is saved to secure storage using the `saveToken` function with the cookie name as the key.
     * The function uses console to log any information, for example - the absence of cookies or the success/failure of the `saveToken` function.
     *
     * This function does not return any value.
     *
     * @example
     * handleCookies(response.headers);
     */
    if (!headers['set-cookie'] || headers['set-cookie']?.length === 0) {
        console.log("No cookies found.");
        return;
    }
    const cookies = headers['set-cookie'][0].split(/; (?=secure|HttpOnly|[sS]ameSite|path|expires|domain)/);
    cookies.forEach((cookie) => {
        if (cookie.toLowerCase().startsWith("refresh=")) {
            const tokenValue = cookie.split("=")[1];
            saveToken("refresh", tokenValue).then(success => {
                if (success) {
                    console.log(`Token saved successfully.`)
                } else {
                    console.log(`Failed to save token under key: refresh`)
                }
            }).catch(error => {
                console.error("An unexpected error occured:", error);
            });
        } else if (cookie.toLowerCase().startsWith("access=")) {
            const tokenValue = cookie.split("=")[1];
            saveToken("access", tokenValue).then(success => {
                if (success) {
                    console.log(`Token saved successfully.`)
                } else {
                    console.log(`Failed to save token under key: access`)
                }
            }).catch(error => {
                console.error("An unexpected error occurred:", error);
            });
        }
    });
}