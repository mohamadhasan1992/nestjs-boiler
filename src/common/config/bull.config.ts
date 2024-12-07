import { BullRootModuleOptions } from "@nestjs/bull";



export const BullConfig: BullRootModuleOptions = {
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
    }
}
