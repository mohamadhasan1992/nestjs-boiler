import { Injectable, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEnum } from 'src/common/enum';
import { SendEmailProducer } from 'src/queue/producers/send-email.producer';
import { UserCreatedEvent } from 'src/user/event/user.created.event';



@Injectable()
export class UserCreatedEventListener {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly sendEmailProducer: SendEmailProducer
    ) { }

    @OnEvent(EventEnum.USER_CREATED)
    async handle(event: UserCreatedEvent) {
        const {
            user
        } = event;
        try {
            console.log("user inside event listener", user);
            await this.sendEmailProducer.addJob(user)
        } catch (err) {
            this.loggerService.error("UserCreatedEventListener", err.message, err.stack)
        }
    }
}