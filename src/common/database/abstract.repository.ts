import { FilterQuery, Model, PipelineStage, PopulateOptions, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema"
import { BadRequestException } from "@nestjs/common";
import { IPaginationData } from "../interface";







export abstract class AbstractRepository<TDocument extends AbstractDocument> {

    constructor(
        protected readonly model: Model<TDocument>
    ) { }

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        try {
            const createdDocument = new this.model({ ...document, _id: new Types.ObjectId() })
            const newDocument = await createdDocument.save();
            return newDocument.toJSON() as unknown as TDocument;
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("error.DUPLICATE_KEY" + " Key: " + Object.keys(error.keyPattern)[0])
            } else {
                throw new BadRequestException(error)
            }
        }
    }
    async findOne(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<TDocument> {
        const sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        if (filterQuery) {
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }



        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|regex)\b/g,
            (match) => `$${match}`
        );



        return await this.model.findOne(JSON.parse(queryStr), {}, { lean: true })
            .populate(popOptions)
            .sort(sortBy)
            .select(fields) as TDocument;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
        popOptions?: PopulateOptions[],
        fields?: string[]
    ): Promise<TDocument> {
        try {
            const document = await this.model.findOneAndUpdate(filterQuery, update, {
                lean: true,
                new: true,
            })
                .populate(popOptions)
                .select(fields) as TDocument;

            return document
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("error.DUPLICATE_KEY" + " Key: " + Object.keys(error.keyPattern)[0])
            } else {
                throw new BadRequestException(error)
            }
        }

    }


    async find(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<IPaginationData<TDocument>> {
        // extract sort
        const sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        // extract page and limit
        const page = filterQuery?.page * 1 || 1;
        let limit = 10;
        if (filterQuery?.limit) {
            if ((filterQuery.limit * 1) > 50) {
                limit = 50
            } else {
                limit = filterQuery.limit * 1;
            }
        }
        const skip = (page - 1) * limit;

        // remove extra fields
        if (filterQuery) {
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }
        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|regex)\b/g,
            (match) => `$${match}`
        );
        // handle pagination data
        const totalDocs = await this.model.countDocuments(JSON.parse(queryStr));

        return {
            data: await this.model.find(JSON.parse(queryStr), {}, { lean: true })
                .sort(sortBy)
                .limit(limit)
                .select(fields)
                .skip(skip)
                .populate(popOptions),
            pagination: {
                hasNextPage: totalDocs > (skip + limit),
                hasPrevPage: page > 1,
                limit,
                nextPage: totalDocs > (skip + limit) ? page + 1 : null,
                page,
                totalDocs,
                totalPages: Math.ceil(totalDocs / limit)
            }
        }
    }


    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
        popOptions?: PopulateOptions[]
    ) {
        return await this.model.findOneAndDelete(filterQuery, { lean: true }).populate(popOptions);
    }
    async count(filterQuery: FilterQuery<TDocument>) {
        if (filterQuery) {
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }

        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|regex)\b/g,
            (match) => `$${match}`
        );
        return await this.model.countDocuments(JSON.parse(queryStr))
    }


}