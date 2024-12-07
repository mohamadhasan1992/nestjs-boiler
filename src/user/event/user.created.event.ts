import { UserDocument } from "../model/user.schema";



export class UserCreatedEvent {
    constructor(public readonly user: UserDocument) { }
}
