// src/HL7MessageInput.ts
export interface HL7SegmentMap {
    [key: string]: any[];
}

export interface HL7MessageInput {
    sistemaOrigen: string;  // Sistema de origen del mensaje
    sistemaDestino: string; // Sistema de destino del mensaje
    fechaOperacion: Date;   // Fecha y hora del mensaje
    tipoMensaje: string;    // Tipo de mensaje (ej. "ADT^A01")
    codeSystem?: string;    // Sistema de códigos (opcional)
    segments: HL7SegmentMap; // Segmentos dinámicos de HL7 para cualquier tipo de dato
}
