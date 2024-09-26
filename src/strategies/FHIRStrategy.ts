// src/strategies/FHIRStrategy.ts
import { v4 as uuidv4 } from 'uuid';
import { HL7MessageInput } from '../HL7MessageInput';
import { HL7Strategy } from '../HL7Strategy';

class FHIRStrategy implements HL7Strategy {
  generateMessage(input: HL7MessageInput): string {
    const messageControlId = uuidv4(); // ID único para el mensaje

    const fhirMessage: any = {
      resourceType: 'Bundle',
      id: messageControlId,
      type: 'transaction',
      entry: []
    };

    // Convertir segmentos genéricos en recursos FHIR
    Object.keys(input.segments).forEach((segmentName) => {
      const resource = {
        resource: {
          resourceType: segmentName,
          id: uuidv4(),
          attributes: input.segments[segmentName].map((value, index) => ({
            key: `${segmentName}${index + 1}`,
            value: value
          }))
        }
      };

      fhirMessage.entry.push(resource);
    });

    return JSON.stringify(fhirMessage, null, 2); // Generar JSON FHIR
  }
}

export default FHIRStrategy;
