// src/strategies/HL7v3Strategy.ts
import { Builder } from 'xml2js';
import { v4 as uuidv4 } from 'uuid';
import { HL7MessageInput } from '../HL7MessageInput';
import { HL7Strategy } from '../HL7Strategy';

class HL7v3Strategy implements HL7Strategy {
  generateMessage(input: HL7MessageInput): string {
    const messageControlId = uuidv4(); // ID único del mensaje

    const xmlMessage: any = {
      ClinicalDocument: {
        $: { xmlns: 'urn:hl7-org:v3' },
        id: { extension: messageControlId },
        code: { code: input.tipoMensaje, codeSystem: input.codeSystem || '2.16.840.1.113883.1.6' },
        effectiveTime: { value: input.fechaOperacion.toISOString() },
        component: {
          structuredBody: {
            component: []
          }
        }
      }
    };

    // Convertir los segmentos dinámicos en componentes de XML
    Object.keys(input.segments).forEach((segmentName) => {
      const segmentData = input.segments[segmentName].map((field, index) => ({
        name: `${segmentName}${index + 1}`,
        value: field
      }));

      xmlMessage.ClinicalDocument.component.structuredBody.component.push({
        section: {
          title: segmentName,
          entry: segmentData
        }
      });
    });

    const builder = new Builder();
    return builder.buildObject(xmlMessage); // Convertir a XML
  }
}

export default HL7v3Strategy;
