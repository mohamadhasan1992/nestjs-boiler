import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/common/database/abstract.schema";


@Schema({ timestamps: true, collection: "User" })
export class UserDocument extends AbstractDocument {
    @Prop({
        required: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return Buffer.from(value, 'utf8').toString('utf8') === value;
            },
            message: 'Invalid UTF-8 characters detected.'
        },
    })
    email: string;

    @Prop({
        required: true,
        validate: {
            validator: function (value: string) {
                return Buffer.from(value, 'utf8').toString('utf8') === value;
            },
            message: 'Invalid UTF-8 characters detected.'
        },
    })
    name: string;
}



export const UserSchema = SchemaFactory.createForClass(UserDocument);
