//import { FLAGRISK } from "./enums/FLAGRISK";
import { INumberData } from './interfaces/INumberData';
import { IRouletteConfig } from './interfaces/IRouletteConfig';
import { IRouletteResolve } from './interfaces/IRouletteResolve';
import { ROULETTE_RED_NUMBERS } from './utils/RedNumbers';
import { ROULETTE_NUMBERS } from './utils/RouleteNumbers';
import { generateSecureRandoms } from './utils/SecureRandomGenerator';

export class Jackpot {

    /*
    // Explicación Detallada
    1.  Estructura Básica

        - Configuración: Almacena reglas de la ruleta (multiplicadores, probabilidades).
        - Datos por Número: 38 espacios (0-37) para rastrear:
        - Peso financiero (riesgo para la casa)
        - Apuestas plenas (straight bets)
        - Conteo de apuestas
        - Contadores Globales:
        - maxweight: Máxima exposición financiera en un número
        - numberOfBets: Total de apuestas
        - numberOfBetsStraight: Apuestas a números individuales
    */

    // Configuración de la ruleta (probabilidades, multiplicadores, etc.)
    private config: IRouletteConfig;

    // Datos de cada número (0-37) con información de apuestas
    private numbersData: INumberData[];

    // Peso máximo acumulado entre todos los números
    private maxweight: number;

    // Contadores totales de apuestas
    private numberOfBets: number;
    private numberOfBetsStraight: number;  // Apuestas plenas (a un solo número)


    // Banca Virtual
    //private virtualBank: number;

    // constructor
    constructor(_config: IRouletteConfig) {
        this.config = _config;

        // Inicializa 38 espacios de datos (0 a 37, siendo 37 = '00')
        this.numbersData = Array.from({ length: 38 }, (_, index) => ({
            number: index,                // Asigna el índice actual (0 a 37) -- representa el numero del tablero
            weight: 0,                    // Peso financiero del número
            normalizedWeight: 0,          // Peso normalizado (no usado actualmente)
            isStraightBet: false,         // Tiene apuestas plenas?
            strainghtBetCounter: 0,       // Cantidad de apuestas plenas
            //probability: 0,             // Probabilidad (no usado actualmente)
            betCount: 0,                  // Veces que fue apostado
            //flagRisk: FLAGRISK.LOW        // Flag de riesgo (no usado actualmente)
        }));

        // Inicializa contadores globales
        this.maxweight = 0;
        this.numberOfBets = 0;
        this.numberOfBetsStraight = 0;

        //this.virtualBank = this.config.virtualBank;
    }

    // Convierte número en string a índice numérico
    private getNumberToIndex(number: string): number {
        switch (number) {
            case '0': return 0;      // Índice 0 = '0'
            case '00': return 37;    // Índice 37 = '00'
            default:
                const num = parseInt(number, 10);
                // Valida que sea número válido (1-36)
                return (num >= 1 && num <= 36) ? num : -1;  // -1 = inválido
        }
    }

    // Convierte índice numérico a string (nombre del número)
    private getNumberFromIndex(index: number): string {
        switch (index) {
            case 0: return '0';     // Índice 0 = '0'
            case 37: return '00';   // Índice 37 = '00'
            default: return index.toString();  // 1-36
        }
    }

    // Registra una apuesta en el sistema
    private addBet(numbers: string[], amount: number, reward: number): void {
        // Calcula peso: (monto / números cubiertos) * multiplicador de pago
        //const betWeight = Number(((amount / numbers.length) * reward).toFixed(4));
        const betWeight = (amount / numbers.length) * reward;

        // Aplica peso a cada número apostado
        numbers.forEach(num => {
            const index = this.getNumberToIndex(num)
            if (index !== -1) {  // Si es número válido
                // Acumula peso financiero
                this.numbersData[index].weight += betWeight;

                // Actualiza peso máximo si es necesario
                if (this.numbersData[index].weight > this.maxweight) {
                    this.maxweight = this.numbersData[index].weight;
                }

                // Incrementa contador de apuestas para este número
                this.numbersData[index].betCount++;
            }
        });

        //this.virtualBank += amount;

        // Incrementa contador global de apuestas
        this.numberOfBets++;
    }

    // ========================================================================
    // MÉTODOS DE APUESTAS
    // ========================================================================

    // Apuesta plena (a un solo número)
    betStraight(number: string, amount: number): void {
        const index = this.getNumberToIndex(number);
        if (index !== -1) {
            // Marca que este número tiene apuestas plenas
            this.numbersData[index].isStraightBet = true;
            // Incrementa contador específico para este número
            this.numbersData[index].strainghtBetCounter++;
        }
        // Incrementa contador global de apuestas plenas
        this.numberOfBetsStraight++;
        // Registra la apuesta
        this.addBet([number], amount, this.config.betMultipliers.straightUp);
    }

    // Apuesta split (2 números adyacentes) -- semipleno **
    /* OLD
    betSplit(number1: string, number2: string, amount: number): void {
        this.addBet([number1, number2], amount, this.config.betMultipliers.split);
    }
    */
    betSplit(number: number, amount: number): void {
        this.addBet([number.toString()], amount / 2, this.config.betMultipliers.split);
    }

    // Apuesta street (fila de 3 números)  --- calle **
    /* OLD
    betStreet(streetStart: number, amount: number): void {
        // Genera números: start, start+1, start+2
        const numbers = [streetStart, streetStart + 1, streetStart + 2].map(String);
        this.addBet(numbers, amount, this.config.betMultipliers.street);
    }
    */
    betStreet(number: number, amount: number): void {
        this.addBet([number.toString()], amount / 3, this.config.betMultipliers.street);
    }

    // Apuesta corner (esquina de 4 números) --- cuadro **
    /* OLD
    betCorner(baseNumber: number, amount: number): void {
        // Ejemplo para base=1: [1, 2, 4, 5]
        const numbers = [baseNumber, baseNumber + 1, baseNumber + 3, baseNumber + 4].map(String);
        this.addBet(numbers, amount, this.config.betMultipliers.corner);
    }
    */
    betCorner(number: number, amount: number): void {
        // Ejemplo para base=1: [1, 2, 4, 5]
        this.addBet([number.toString()], amount / 4, this.config.betMultipliers.corner);
    }

    // Apuesta basket (0, 00, 1, 2, 3)
    betBasket(amount: number): void {
        this.addBet(['0', '00', '1', '2', '3'], amount, this.config.betMultipliers.basket);
    }

    // Apuesta double street (2 filas = 6 números) /6 --- doble calle **
    /*
    betDoubleStreet(startNumber: number, amount: number): void {
        // Genera 6 números consecutivos
        const numbers = Array.from({ length: 6 }, (_, i) => startNumber + i).map(String);
        this.addBet(numbers, amount, this.config.betMultipliers.line);
    }
    */
    betDoubleStreet(number: number, amount: number): void {
        this.addBet([number.toString()], amount / 6, this.config.betMultipliers.line);
    }

    // Apuesta a docena (1-12, 13-24, 25-36) 
    betDozen(dozen: number, amount: number): void {
        // Calcula inicio de la docena (1, 13 o 25)
        const start = (dozen - 1) * 12 + 1;
        // Genera 12 números consecutivos
        const numbers = Array.from({ length: 12 }, (_, i) => (start + i).toString());
        this.addBet(numbers, amount, this.config.betMultipliers.dozen);
    }

    // Apuesta a columna (primera, segunda o tercera columna)
    betColumn(column: number, amount: number): void {
        // Ejemplo columna 1: [1, 4, 7, ... 34]
        const numbers = Array.from({ length: 12 }, (_, i) => (column + (i * 3)).toString());
        this.addBet(numbers, amount, this.config.betMultipliers.column);
    }

    // Apuesta a color (rojo/negro)
    betColor(color: 'red' | 'black', amount: number): void {
        const numbers: string[] = [];
        // Recorre todos los números
        for (let index = 0; index < this.numbersData.length; index++) {
            const num = this.getNumberFromIndex(index);
            // Salta 0 y 00 (no tienen color)
            if (num === '0' || num === '00') continue;

            // Verifica si es rojo (usando conjunto predefinido)
            const isRed = ROULETTE_RED_NUMBERS.has(num);

            // Comprueba coincidencia con color apostado
            if ((color === 'red' && isRed) || (color === 'black' && !isRed)) {
                numbers.push(num);
                // ADICIONAL: Añade peso directo (esto podría duplicar el peso)
                // this.numbersData[index].weight += amount;
            }
        }
        // Registra apuesta normal
        this.addBet(numbers, amount, this.config.betMultipliers.redBlack);
    }

    // Apuesta a par/impar
    betEvenOdd(type: 'even' | 'odd', amount: number): void {
        const numbers: string[] = [];
        // Solo números 1-36 (0 y 00 no aplican)
        for (let i = 1; i <= 36; i++) {
            if ((type === 'even' && i % 2 === 0) || (type === 'odd' && i % 2 !== 0)) {
                numbers.push(i.toString());
            }
        }
        this.addBet(numbers, amount, this.config.betMultipliers.evenOdd);
    }

    // Apuesta a bajo/alto (1-18 / 19-36)
    betHighLow(range: 'low' | 'high', amount: number): void {
        const start = range === 'high' ? 19 : 1;  // 19 para alto, 1 para bajo
        // Genera 18 números consecutivos
        const numbers = Array.from({ length: 18 }, (_, i) => (start + i).toString());
        this.addBet(numbers, amount, this.config.betMultipliers.lowHigh);
    }

    // Baraja un array (algoritmo Fisher-Yates)
    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            // Elige índice aleatorio entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));
            // Intercambia elementos
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    public resolve(bank: Number): IRouletteResolve {

        console.log("\n\n\t [ Paso 1 ]: ✅ Iniciando Resolve.");

        // Preparar objeto de resultados
        let result: IRouletteResolve = {
            jackpots: []  // Lista de números ganadores con multiplicadores 
        };

        // normalizacion y probabilidad
        this.numbersData.forEach(numData => {
            //numData.normalizedWeight = Number((numData.weight / this.maxweight).toFixed(4));
            numData.normalizedWeight = numData.weight / this.maxweight;
            //numData.probability = Number((numData.betCount / this.numberOfBets).toFixed(4));
        })



        //========================= Show
        // console.table(this.numbersData);
        console.log("\t ➡️ maxweight: ", this.maxweight);
        console.log("\t ➡️ numberOfBets: ", this.numberOfBets);
        console.log("\t ➡️ numberOfBetsStraight: ", this.numberOfBetsStraight);
        //console.log("\t ➡️ virtualBank: ", this.virtualBank);


        // Generar 8 números aleatorios seguros para todo el proceso
        const rndBlock: number[] = generateSecureRandoms(8);
        let rndIndex = 0;  // Puntero para usar los números aleatorios
        //========================= Show
        console.log("\t ➡️ Bloque de Randoms: ", rndBlock.length);
        //console.table(rndBlock);


        //porciento de apuestas plenas con relacion al total de apuestas ingresadas
        // const percentBetStringht = (this.numberOfBetsStraight / this.numberOfBets) * 100;
        // console.log("\t ➡️ Porciento apuestas plenas / total... ", Number(percentBetStringht.toFixed(2)));


        // **** Paso 1: Determinar cantidad de jackpots (3-5) (pasar a configurable si es necesario)
        const totalSize = Math.floor(rndBlock[rndIndex++] * 3) + 3;
        console.log("\t ➡️ Cantidad de Jackpots planificada...", totalSize);

        // tabla de datos
        //console.table(sortedByWeight);
        //console.table(straightBetSortedByWeight);

        // Paso 2: Caso especial sin apuestas o sin apuestas plenas 
        // (Entra solo si en la ronda no se van a entregar premios(pagos) y si esta capa esta disponible)
        if (this.numberOfBets === 0 || this.numberOfBetsStraight === 0) {
            console.log("\n\n\t [ Paso 2 ]: ✅ Determinar cantidad de jackpots (3-5) (pasar a configurable si es necesario)");
            // Crear copia de todos los números de ruleta
            const shuffleCollection = [...ROULETTE_NUMBERS];

            // Barajar aleatoriamente
            this.shuffleArray(shuffleCollection);

            //========================= Show            
            //console.log("shuffleArray",shuffleCollection);

            // Seleccionar los primeros 'totalSize' números
            for (let i = 0; i < totalSize; i++) {
                // Asignar multiplicador aleatorio
                const multiplier = this.config.jackpotsCollection[
                    Math.floor(rndBlock[rndIndex++] * this.config.jackpotsCollection.length)
                ];

                //========================= Show
                //console.log("\nAsignar multiplicador aleatorio: ", multiplier);

                // Agregar al resultado
                result.jackpots.push({
                    number: shuffleCollection[i],
                    multiply: multiplier
                });
            }

            // Limpiar sistema para siguiente ronda
            this.cleanUpTheTrash();

            // Finalizar monitoreo y retornar
            //monitor.endTimer('resolveJackpots()');
            return result;  // ============================== Retornar resultados 
        } else {
            console.log("\n\n\t [ Paso 2 ]: ❌ Determinar cantidad de jackpots (3-5) (pasar a configurable si es necesario)");
        }


        // Paso 3: Capa 0 - Bloque Fuerte (números SIN apuestas plenas)
        if (this.config.enableStrongBlock && rndBlock[rndIndex++] <= this.config.strongBlock) {
            console.log("\n\n\t [ Paso 3 ]: ✅ Bloque Fuerte (números SIN apuestas plenas)");

            // Recolectar índices de números seguros (sin apuestas plenas)
            const nonStraightIndices: number[] = [];
            for (let i = 0; i < this.numbersData.length; i++) {
                if (!this.numbersData[i].isStraightBet) {
                    nonStraightIndices.push(i);
                }
            }
            console.log("\t ➡️ Cantidad de indices de apuestas sin pleno", nonStraightIndices.length);

            //Punto de control
            // verifica que realmente puede ejecutarse el bloque de seleccion
            if (nonStraightIndices.length > 0) {
                // Barajar para selección aleatoria
                this.shuffleArray(nonStraightIndices);

                // Determinar cantidad a seleccionar
                let selectionSize = 0;
                if (nonStraightIndices.length >= totalSize) {
                    // Si hay muchos disponibles: 3-5
                    //selectionSize = Math.floor(rndBlock[rndIndex++] * 3) + 3;
                    selectionSize = totalSize;
                } else if (nonStraightIndices.length > 0) {
                    // Si hay pocos: tomar todos
                    selectionSize = nonStraightIndices.length;
                }
                console.log("\t ➡️ Cantidad de jackpots a seleccionar: ", selectionSize);

                // Procesar selección
                for (let i = 0; i < selectionSize; i++) {
                    const index = nonStraightIndices[i];
                    const number = this.getNumberFromIndex(index);

                    // Asignar multiplicador aleatorio
                    const multiplier = this.config.jackpotsCollection[
                        Math.floor(rndBlock[rndIndex++] * this.config.jackpotsCollection.length)
                    ];

                    // Agregar al resultado
                    result.jackpots.push({ number, multiply: multiplier });
                }
            } else {
                console.log("\t ⚠️ No hay numeros disponibles para seleccionar");
                console.log("\t ...Saliendo del [ Paso 3 ]");
            };

        } else {
            let enable: string = this.config.enableStrongBlock ? "🟢" : "🔴";
            console.log("\n\n\t [ Paso 3 ]: ❌ Bloque Fuerte enabled:[" + enable + "]"
                + `\trndBlock: ${rndBlock[rndIndex - 1]} <= ${this.config.strongBlock}`);
        }



        // Paso 4: Capa 1 - Bloque de Riesgo (números de Medio peso) (todos los numeros estan ocupados con pleno)
        const activeRiskBlock: boolean = true; // calcular basado en banca
        if (activeRiskBlock) {
            console.log("\n\n\t [ Paso 4 ]: ✅ Bloque de Riesgo (números de Medio peso)");

            // 1. 10 números con menor peso OK
            console.log("\t ▶️ Extrayendo los 10 Numeros de menor peso");
            const sortedByWeight: INumberData[] = [...this.numbersData]
                .sort((a, b) => a.weight - b.weight)
                .slice(0, 10);

            // 2. Dispersión
            console.log("\t ▶️ Calculando Dispersion");
            const weights = sortedByWeight.map(item => item.weight);
            const mean = weights.reduce((sum, val) => sum + val, 0) / weights.length;
            const variance = weights.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / weights.length;
            const standardDeviation = Math.sqrt(variance);
            const coefficientOfVariation = (standardDeviation / mean) * 100;

            console.log("\t\t ➡️ Media: ", mean.toFixed(2));
            console.log("\t\t ➡️ Varianza: ", variance.toFixed(2));
            console.log("\t\t ➡️ Desviacion Estandar: ", standardDeviation.toFixed(2));
            console.log("\t\t ➡️ Coeficiente de variación: ", coefficientOfVariation.toFixed(2) + "%");

            // 3. Variabilidad
            console.log("\t ▶️ Calculando Variabilidad");
            let variabilityLevel = "";
            if (coefficientOfVariation < 15) {
                variabilityLevel = "BAJA";
                console.log("\t ➡️ ✅ BAJA variabilidad: Los pesos son muy consistentes");
            } else if (coefficientOfVariation < 30) {
                variabilityLevel = "MODERADA";
                console.log("\t ➡️ ☑️ MODERADA variabilidad: Los pesos tienen dispersión aceptable");
            } else {
                variabilityLevel = "ALTA";
                console.log("\t ➡️ ⚠️ ALTA variabilidad: Los pesos son muy dispares");
            }

            // 4. Definir los Jackpots
            console.log("\t ▶️ Definiendo los Jackpots");
            let jackpotLength = 0;

            if (variabilityLevel === "BAJA") {
                // Para baja variabilidad: 2-4 jackpots
                jackpotLength = Math.floor(rndBlock[rndIndex++] * 3) + 2;
                console.log("\t\t ➡️ Jackpots (2-4): " + jackpotLength);
            } else if (variabilityLevel === "MODERADA") {
                // Para variabilidad moderada: 1-2 jackpots
                jackpotLength = Math.floor(rndBlock[rndIndex++] * 2) + 1;
                console.log("\t\t ➡️ Jackpots (1-2): " + jackpotLength);
            } else {
                // Para alta variabilidad: solo 1 jackpot                
                jackpotLength = 1;
                console.log("\t\t ➡️ Jackpots (1): " + jackpotLength);
            }

            // 5. Seleccionar números aleatorios de los de bajo peso
            const shuffledLowWeight = this.shuffleArray([...sortedByWeight]);

            for (let index = 0; index < jackpotLength; index++) {
                if (index >= shuffledLowWeight.length) break;

                const element = shuffledLowWeight[index];
                const isStraight = element.isStraightBet;

                result.jackpots.push({
                    number: element.number.toString(),
                    multiply: isStraight
                        ? this.config.jackpotsCollection[0]
                        : this.config.jackpotsCollection[Math.floor(rndBlock[rndIndex++] * this.config.jackpotsCollection.length)]
                });
            }

            console.log(`\t ➡️ Se agregaron ${jackpotLength} jackpots por riesgo (${variabilityLevel})`);
            this.cleanUpTheTrash();
            return result;
        }

        // Paso 6: Limpieza final (( o destruccion de la instancia )) ?
        this.cleanUpTheTrash();

        return result; //retornar resultado final -- Ej: [{ number: '32', multiply: 100 },  { number: '17', multiply: 50 }] number es str para asegurar '00'
    }

    private getVariance(data: number[], isSample: boolean = false): number {
        const n = data.length;
        if (n === 0) return 0; // Manejar array vacío

        // Calcular la media
        const mean = data.reduce((sum, value) => sum + value, 0) / n;

        // Suma de diferencias al cuadrado
        const squaredDifferences = data.reduce((sum, value) => {
            return sum + Math.pow(value - mean, 2);
        }, 0);

        // Ajustar por población o muestra
        return isSample ? squaredDifferences / (n - 1) : squaredDifferences / n;
    }

    // Reinicia todos los contadores y estados
    public cleanUpTheTrash(): void {
        console.log("\n\n\t [ Paso 6 ]: ✅ Limpieza Final");
        // Recorre todos los números y los reinicia a 0
        this.numbersData.forEach(data => {
            data.weight = 0;
            data.isStraightBet = false;
            data.strainghtBetCounter = 0;
            data.betCount = 0;
        });

        // Reinicia contadores globales
        this.maxweight = 0;
        this.numberOfBets = 0;
        this.numberOfBetsStraight = 0;
    }
}