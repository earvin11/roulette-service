import { RoundEntity } from "../entities/round.entity";

export class Round implements RoundEntity {
    code: string;
    start_date: Date;
    end_date: Date;
    // jackpot_values: JackpotValues[];
    result: number;
    providerId: string;
    roulette: string;
    open: boolean;
    number: number;
    identifierNumber: number;
    crupier: string;

    constructor(data: RoundEntity) {
        this.code = data.code;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        // this.jackpot_values = data.jackpot_values;
        this.result = data.result;
        this.providerId = data.providerId;
        this.roulette = data.roulette;
        this.open = true;
        this.number = data.number;
        this.identifierNumber = data.identifierNumber;
        this.crupier = data.crupier;
    }
}
