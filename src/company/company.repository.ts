import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/common";
import { CompanyDocument } from "./model/company.schema";


export class CompanyRepository extends AbstractRepository<CompanyDocument> {
    constructor(
        @InjectModel("Company")
        companyModel: Model<CompanyDocument>,
    ) {
        super(companyModel)
    }
}