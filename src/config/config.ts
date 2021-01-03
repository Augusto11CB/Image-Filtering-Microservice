
export const config = {
    "dev": {
        "api_key": process.env.UDAGRAM_API_KEY
    },
    "prod": {
        "api_key": process.env.UDAGRAM_API_KEY
    },
    "jwt": {
        "secret": process.env.UDAGRAM_JWT_SECRET
    }
}