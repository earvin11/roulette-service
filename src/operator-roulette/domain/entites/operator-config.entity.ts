export interface OperatorConfigEntity {
    operator: string;
    order: number;
    currencies: string[];
    pleno?: number;
    semipleno?: number;
    cuadro?: number;
    calle?: number;
    linea?: number;
    columna?: number;
    docena?: number;
    chanceSimple?: number;
    cubre?: number;
    specialCalle?: number;
    layout?: boolean;
    template?: string;
    logo?: string;
}