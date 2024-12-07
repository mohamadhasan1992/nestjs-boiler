import * as Joi from "joi";

export const environmentConfig = {
  envFilePath: process.env.NODE_ENV === "production" ? "./env/.env.production" : "./env/.env.local",
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().required(),
    HTTP_PORT: Joi.number().required(),
    MONGO_URI: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().required(),
  })
}
