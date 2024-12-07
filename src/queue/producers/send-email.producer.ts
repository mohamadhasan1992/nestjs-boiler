import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { DEFAULT_JOB_OPTIONS, QUEUE_CONFIG } from '../queue.constants';
import { ISendEmailJob } from '../interfaces/queue-job.interface';
import { UserDocument } from 'src/user/model/user.schema';



@Injectable()
export class SendEmailProducer {
    constructor(
        @InjectQueue(QUEUE_CONFIG.SEND_EMAIL.name)
        private queue: Queue,
    ) { }

    async addJob(user: UserDocument) {
        console.log('SendEmailProducer', 'Adding job to queue');
        const data: ISendEmailJob = { user };
        return this.queue.add(
            QUEUE_CONFIG.SEND_EMAIL.jobName,
            data,
            DEFAULT_JOB_OPTIONS
        );
    }

}