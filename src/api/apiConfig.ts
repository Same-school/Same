export const apiConfig = {
    apiUrl: import.meta.env.VITE_API_URL as string,
}

// header of the request => indicate body will be in json
export const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}