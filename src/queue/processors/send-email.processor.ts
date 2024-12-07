import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_CONFIG } from '../queue.constants';
import { LoggerService } from 'src/common';
import { ISendEmailJob } from '../interfaces/queue-job.interface';



@Processor(QUEUE_CONFIG.SEND_EMAIL.name)
export class SendEmailProcessor {

    constructor(
        private readonly loggerService: LoggerService,

    ) { }

    @Process(QUEUE_CONFIG.SEND_EMAIL.jobName)
    async handleSendEmail(job: Job<ISendEmailJob>) {
        this.loggerService.log('SendEmailProcessor', 'Processing send email job:' + job.id);
        const {
            user,
        } = job.data;
        try {
            this.loggerService.log('SendEmailProcessor', 'Sending email to user:' + user.email);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            this.loggerService.log('SendEmailProcessor', 'Email sent successfully');
        } catch (err) {
            this.loggerService.error("SendEmailProcessor", err.message, err.stack)
        }

    }

}


