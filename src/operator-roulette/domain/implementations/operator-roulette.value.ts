import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { OperatorRouletteEntity } from '../entites/operator-roulette.entity';

export class OperatorRoulette implements OperatorRouletteEntity {
    public operator: string;
    public roulette: string;
    public providerId: string;
    public jackpot?: boolean;
    public doubleZero?: boolean;
    public order: number;
    public currencies: string[];
    public pleno?: number;
    public semipleno?: number;
    public cuadro?: number;
    public calle?: number;
    public linea?: number;
    public columna?: number;
    public docena?: number;
    public chanceSimple?: number;
    public cubre?: number;
    public specialCalle?: number;
    public uuid: string;
    public layout?: boolean | undefined;
    public template?: string | undefined;
    public logo?: string | undefined;

    constructor(data: OperatorRouletteEntity) {
        this.operator = data.operator;
        this.roulette = data.roulette;
        this.providerId = data.providerId;
        this.doubleZero = data.doubleZero;
        this.jackpot = data.jackpot;
        this.order = data.order;
        this.currencies = data.currencies;
        this.pleno = data.pleno;
        this.semipleno = data.semipleno;
        this.cuadro = data.cuadro;
        this.calle = data.calle;
        this.linea = data.linea;
        this.columna = data.columna;
        this.docena = data.docena;
        this.chanceSimple = data.chanceSimple;
        this.cubre = data.cubre;
        this.specialCalle = data.specialCalle;
        this.uuid = generateUuid();
        this.layout = data.layout;
        this.template = data.template;
        this.logo = data.logo;
    }
}