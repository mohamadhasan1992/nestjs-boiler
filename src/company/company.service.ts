import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';
import { FilterQuery } from 'mongoose';
import { CompanyDocument } from './model/company.schema';

@Injectable()
export class CompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.create(createCompanyDto);
  }

  async findAll(filterQuery: FilterQuery<CompanyDocument>) {
    return await this.companyRepository.find(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<CompanyDocument>) {
    return await this.companyRepository.findOne(filterQuery);
  }

}
