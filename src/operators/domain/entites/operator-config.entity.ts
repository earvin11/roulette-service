export interface OperatorConfigEntity {
    operator: string;
    order: number;
    currencies: string[];
    pleno?: number;
    semiPleno?: number;
    cuadro?: number;
    calle?: number;
    linea?: number;
    column?: number;
    dozens?: number;
    chanceSimple?: number;
    evenOdd?: number;
    color?: number;
    cubre?: number;
    specialCalle?: number;
    layout?: boolean;
    template?: string;
    logo?: string;
}