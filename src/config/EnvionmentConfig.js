const local = {
    API_ENDPOINT_URL: "http://localhost:3004"
};
const dev = {
    API_ENDPOINT_URL: "http://localhost:3004"
};
const prod = {
    API_ENDPOINT_URL: process.env.REACT_APP_API_ENDPOINT_URL
};
const test = {
    API_ENDPOINT_URL: "http://localhost:3004"
};

const getEnv = () => {
    // console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case "localhost":
            return local;
        case "development":
            return dev;
        case "production":
            return prod;
        case "test":
            return test;
        default:
            break;
    }
};

export const env = getEnv();