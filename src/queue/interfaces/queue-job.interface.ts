import { UserDocument } from "src/user/model/user.schema";

export interface ISendEmailJob {
    user: UserDocument;
}

