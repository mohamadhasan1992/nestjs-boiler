import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDocument } from './model/company.schema';
import { FilterQuery } from 'mongoose';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get()
  findAll(@Query() query: FilterQuery<CompanyDocument>) {
    return this.companyService.findAll(query);
  }

}
