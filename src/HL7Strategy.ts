import { HL7MessageInput } from "./HL7MessageInput";

// src/HL7Strategy.ts
export interface HL7Strategy {
  generateMessage(input: HL7MessageInput): string;
}
