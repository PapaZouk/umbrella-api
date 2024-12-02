import dotenv from "dotenv";

dotenv.config();

export const getEnvValue = (value: string): string => {
    const envVarValue = process.env[value]!;

    if (!envVarValue) {
        throw new Error('Could not find environment variable: ' + value);
    }

    return envVarValue;
}

export const getEnvValueOrDefault = (value: string, defaultValue: string) => {
    return process.env[value] ?? defaultValue;
}