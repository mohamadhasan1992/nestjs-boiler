import { BullModule } from '@nestjs/bull';
import { QUEUE_CONFIG } from './queue.constants';
import { Module } from '@nestjs/common';
import { BullConfig } from 'src/common';
import { SendEmailProcessor } from './processors/send-email.processor';
import { SendEmailProducer } from './producers/send-email.producer';




@Module({
    imports: [
        BullModule.forRoot(BullConfig),
        BullModule.registerQueue(
            {
                name: QUEUE_CONFIG.SEND_EMAIL.name,
            }
        ),
    ],
    providers: [
        SendEmailProducer,
        SendEmailProcessor
    ],
    exports: [SendEmailProducer],
})
export class QueueModule { }