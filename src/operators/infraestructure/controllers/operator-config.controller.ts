import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { OperatorConfigUseCases } from 'src/operators/application/operator-config.use-cases';
import { CreateOperatorConfigDto } from '../dtos/create-operator-config.dto';
import { UpdateOperatorConfigDto } from '../dtos/update-operator-config.dto';

@Controller('config')
export class OperatorConfigController {

    constructor(
        private readonly operatorConfigUseCases: OperatorConfigUseCases
    ) {}

    @Post(':operatorId')
    async create(
        @Param('operatorId') operatorId: string,
        @Body() createOperatorConfigDto: CreateOperatorConfigDto
    ) {
        return await this.operatorConfigUseCases.create({...createOperatorConfigDto, operator: operatorId.trim()});
    };

    @Get(':operatorId')
    async findByOperator(@Param('operatorId') operatorId: string) {
        const data = await this.operatorConfigUseCases.findByOperator(operatorId);
        if(!data) throw new NotFoundException('Config by operator not found');
        return data;
    };

    @Put(':operatorId')
    async updateByOperator(
        @Param('operatorId') operatorId: string,
        @Body() updateOperatorConfigDto: UpdateOperatorConfigDto
    ) {
        const data = await this.operatorConfigUseCases.updateByOperator(operatorId, updateOperatorConfigDto);
        if(!data) throw new NotFoundException('Config by operator not found');
        return data;
    }
}