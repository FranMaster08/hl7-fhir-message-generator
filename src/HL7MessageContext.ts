// src/HL7MessageContext.ts
import * as fs from 'fs';
import { HL7MessageInput } from './HL7MessageInput';
import { HL7Strategy } from "./HL7Strategy";

class HL7MessageContext {
  private strategy: HL7Strategy;

  constructor(strategy: HL7Strategy) {
    this.strategy = strategy;
  }

  // Permite cambiar la estrategia en tiempo de ejecución
  setStrategy(strategy: HL7Strategy): void {
    this.strategy = strategy;
  }

  // Genera el mensaje utilizando la estrategia actual
  generateMessage(input: HL7MessageInput): string {
    return this.strategy.generateMessage(input);
  }

  // Exporta el mensaje a un archivo
  exportToFile(filePath: string, content: string): void {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Mensaje exportado correctamente en ${filePath}`);
    } catch (error) {
      console.error(`Error al exportar archivo: ${error}`);
      throw error;
    }
  }
}

export default HL7MessageContext;
