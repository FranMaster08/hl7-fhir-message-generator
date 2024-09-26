// src/index.ts
import HL7MessageContext from './HL7MessageContext';
import HL7v2Strategy from './strategies/HL7v2Strategy';
import FHIRStrategy from './strategies/FHIRStrategy';
import { HL7MessageInput } from './HL7MessageInput';
import HL7v3Strategy from './strategies/HL7v3Strategy';

// Datos genéricos de ejemplo
const jsonData = {
  transactionId: "TX12345",
  producto: "Medicamento",
  cantidad: "10",
  precioUnitario: "100",
  total: "1000"
};

const input: HL7MessageInput = {
  sistemaOrigen: "SistemaVentas",
  sistemaDestino: "SistemaFacturacion",
  fechaOperacion: new Date(),
  tipoMensaje: 'ADT^A01',
  codeSystem: '2.16.840.1.113883.1.6',
  segments: {
    transactionId: ["TX12345"],
    producto: ["Medicamento"],
    cantidad: ["10"],
    precioUnitario: ["100"],
    total: ["1000"]
  }
};

// Inicializamos el contexto con la estrategia de HL7 v2.x
const hl7Context = new HL7MessageContext(new HL7v2Strategy());

// 1. Generar y exportar mensaje HL7 v2.x
let messageContent = hl7Context.generateMessage(input);
hl7Context.exportToFile('./hl7v2_output.hl7', messageContent);

// 2. Cambiar la estrategia a HL7 v3 y exportar
hl7Context.setStrategy(new HL7v3Strategy());
messageContent = hl7Context.generateMessage(input);
hl7Context.exportToFile('./hl7v3_output.xml', messageContent);

// 3. Cambiar la estrategia a FHIR y exportar
hl7Context.setStrategy(new FHIRStrategy());
messageContent = hl7Context.generateMessage(input);
hl7Context.exportToFile('./fhir_output.json', messageContent);
