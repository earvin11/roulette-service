import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DB_URI: string;
    DB_NAME: string;
    REDIS_URI: string;
    REDIS_PORT: number;
    PATH_WS: string;
}

const evnsSchema = joi.object({
    PORT: joi.number().required(),
    DB_URI: joi.string().required(),
    DB_NAME: joi.string().required(),
    REDIS_URI: joi.string().required(),
    REDIS_PORT: joi.string().required(),
    PATH_WS: joi.string().required()
})
.unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if(error) {
    throw new Error(`Config validation error: ${ error.message }`);
};

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    dbUri: envVars.DB_URI,
    dbName :envVars.DB_NAME,
    redisUri :envVars.REDIS_URI,
    redisPort :envVars.REDIS_PORT,
    pathWs: envVars.PATH_WS
};