import * as SecureStore from "expo-secure-store";

interface Headers {
    'set-cookie'?: string[];
}

export const handleError = (error: any): string => {
    if (error.response) {
        console.error('Error response data:', error.response.data);
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
        return "An error occurred. Please try again"
    }
};

export const saveToken = async (key: string, value: string): Promise<boolean> => {
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