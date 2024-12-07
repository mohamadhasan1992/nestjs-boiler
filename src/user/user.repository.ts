import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./model/user.schema";
import { AbstractRepository } from "src/common";




export class UserRepository extends AbstractRepository<UserDocument> {
    constructor(
        @InjectModel("User")
        userModel: Model<UserDocument>,
    ) {
        super(userModel)
    }
}