import { IsString } from 'class-validator';

 export class CreateOrEndRoundDto {
    @IsString()
    ID_Ruleta: string;

    @IsString()
    ID_Ronda: string;

    @IsString()
    Resultado: string;

    @IsString()
    Giro: string;

    @IsString()
    Rpm: string;

    @IsString()
    Error: string;

    @IsString()
    Fecha: string;
}