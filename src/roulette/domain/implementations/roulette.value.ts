import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RouletteEntity } from '../entites/roulette.entity';

export class Roulette implements RouletteEntity {
    type: string;
    doubleZero: boolean;
    language: string;
    status: boolean;
    lastJackpot: number;
    jackpotRounds: number;
    currenJackpotRound: number;
    jackpotWin?: any[];
    rollback: boolean;
    active: boolean;
    manualDisable: boolean;
    jackpotRandom: boolean;
    jackpotVersion: string;
    alertEmails: string[];
    maxRepeatedResults: number;
    multisAllowed: number[];
    isManualRoulette: boolean;
    numbersDistribution: string;
    bank: number;
    isShow: boolean;
    openingTime: string;
    closingTime: string;
    alwaysOpen: boolean;
    cameraVersion: string;
    initialBank: number;
    maximunBank: number;
    name: string;
    code: string;
    logo: string;
    imgBackground: string;
    color: string;
    providerId: string;
    pleno: number;
    semipleno: number;
    cuadro: number;
    calle: number;
    linea: number;
    columna: number;
    docena: number;
    chanceSimple: number;
    cubre: number;
    specialCalle: number;
    minBet: number;
    maxBet: number;
    maxBetPosition: number;
    urlTransmision: string;
    roundDuration: number;
    minutesToDisable: number;
    animals: any[];
    maxPlenosBet: number;
    numbersOfJackpot: number;
    uuid: string;

    constructor(data: RouletteEntity) {
        this.type = data.type
        this.doubleZero = data.doubleZero
        this.language = data.language
        this.status = data.status
        this.lastJackpot = data.lastJackpot
        this.jackpotRounds = data.jackpotRounds
        this.currenJackpotRound = data.currenJackpotRound
        this.jackpotWin = data.jackpotWin
        this.rollback = data.rollback
        this.active = data.active
        this.manualDisable = data.manualDisable
        this.jackpotRandom = data.jackpotRandom
        this.jackpotVersion = data.jackpotVersion
        this.alertEmails = data.alertEmails
        this.maxRepeatedResults = data.maxRepeatedResults
        this.multisAllowed = data.multisAllowed
        this.isManualRoulette = data.isManualRoulette
        this.numbersDistribution = data.numbersDistribution
        this.bank = data.bank
        this.isShow = data.isShow
        this.openingTime = data.openingTime
        this.closingTime = data.closingTime
        this.alwaysOpen = data.alwaysOpen
        this.cameraVersion = data.cameraVersion
        this.initialBank = data.initialBank
        this.maximunBank = data.maximunBank
        this.name = data.name
        this.code = data.code
        this.logo = data.logo
        this.imgBackground = data.imgBackground
        this.color = data.color
        this.providerId = data.providerId
        this.pleno = data.pleno
        this.semipleno = data.semipleno
        this.cuadro = data.cuadro
        this.calle = data.calle
        this.linea = data.linea
        this.columna = data.columna
        this.docena = data.docena
        this.chanceSimple = data.chanceSimple
        this.cubre = data.cubre
        this.specialCalle = data.specialCalle
        this.minBet = data.minBet
        this.maxBet = data.maxBet
        this.maxBetPosition = data.maxBetPosition
        this.urlTransmision = data.urlTransmision
        this.roundDuration = data.roundDuration
        this.minutesToDisable = data.minutesToDisable
        this.animals = data.animals
        this.maxPlenosBet = data.maxPlenosBet
        this.numbersOfJackpot = data.numbersOfJackpot
        this.uuid = generateUuid()
    }
}