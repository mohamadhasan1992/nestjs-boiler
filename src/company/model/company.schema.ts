import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "src/common";


@Schema({ timestamps: true, collection: "Company" })
export class CompanyDocument extends AbstractDocument {
    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    user: string;
}


export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);


