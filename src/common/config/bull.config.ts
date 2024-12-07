import { BullRootModuleOptions } from "@nestjs/bull";



export const BullConfig: BullRootModuleOptions = {
    redis: {
        host: process.env.REDIS_HOST || "redis",
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
    }
}
