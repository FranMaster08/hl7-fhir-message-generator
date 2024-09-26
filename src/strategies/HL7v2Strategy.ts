// src/strategies/HL7v2Strategy.ts
import { v4 as uuidv4 } from 'uuid';
import { HL7MessageInput } from '../HL7MessageInput';
import { HL7Strategy } from '../HL7Strategy';

class HL7v2Strategy implements HL7Strategy {
  generateMessage(input: HL7MessageInput): string {
    const message: string[][] = [];

    // Generamos un ID único para el mensaje
    const messageControlId = uuidv4();

    // MSH: Segmento obligatorio en HL7 v2.x
    const mshSegment = [
      'MSH',
      '|^~\\&',
      input.sistemaOrigen,
      'HOSPITAL',
      input.sistemaDestino,
      'DESTINO',
      input.fechaOperacion.toISOString(),
      '',
      input.tipoMensaje,
      messageControlId,
      'P',
      '2.5'
    ];
    message.push(mshSegment);

    // Generamos los segmentos dinámicamente desde el input.segments
    Object.keys(input.segments).forEach((segmentName) => {
      const segmentFields = input.segments[segmentName];
      const segment = [segmentName, ...segmentFields];
      message.push(segment);
    });

    // Serializar los segmentos manualmente (cada segmento separado por '|', y cada línea por '\r')
    return this.serializeHL7Message(message);
  }

  // Función de serialización propia
  private serializeHL7Message(message: string[][]): string {
    return message.map(segment => segment.join('|')).join('\r');
  }
}

export default HL7v2Strategy;
