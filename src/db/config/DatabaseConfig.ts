import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || 'development';
let user;
let password;
let cluster;
let appName;

let umbrellaUri: string;

if (env === 'production') {
    const settings = 'retryWrites=true&w=majority';
    user = process.env.UMBRELLA_USER;
    password = process.env.UMBRELLA_PASSWORD;
    cluster = process.env.UMBRELLA_CLUSTER;
    appName = process.env.UMBRELLA_APP_NAME;

    umbrellaUri = `mongodb+srv://${user}:${password}@${cluster}/?${settings}&appName=${appName}`;
} else {
    user = process.env.LOCAL_UMBRELLA_USER;
    password = process.env.LOCAL_UMBRELLA_PASSWORD;
    cluster = process.env.LOCAL_UMBRELLA_CLUSTER;

    umbrellaUri = `mongodb://${user}:${password}@${cluster}`;
}

export {umbrellaUri};
