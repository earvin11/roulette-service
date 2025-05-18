import { Processor } from '@nestjs/bullmq';
import { CreateRoundUseCase } from 'src/rounds/application/create-round.use-case';
// import { UseCaseProxy } from 'src/infrastructure/core/use-case-proxy';
// import { CreateRoundUseCase } from 'src/application/use-cases/create-round.use-case';

@Processor('round-queue')
export class RoundProcessor {
  constructor(
    private readonly createRoundUseCase: CreateRoundUseCase,
    // private readonly createRoundUseCase: UseCaseProxy<CreateRoundUseCase>,
  ) {}

//   @Process('create-round')
  async process(job: any) {
    const { data } = job; // data es de tipo CreateRoundJob
    return await this.createRoundUseCase.run(data);
  }
}