# 🚀 Generador Dinámico de Mensajes HL7 & FHIR

Este proyecto es un **generador dinámico de mensajes** que soporta múltiples estándares de interoperabilidad en el ámbito de la salud, incluyendo **HL7 v2.x**, **HL7 v3**, y **FHIR**. Utiliza el **Patrón Strategy** para permitir la generación dinámica de mensajes basados en cualquier estructura de entrada, lo que lo hace altamente flexible para diversos casos de uso (transacciones, registros médicos, etc.).

> ⚠️ **Nota**: Esta es una **versión ALPHA** y puede contener errores o características incompletas. Úsalo bajo tu propio riesgo y no dudes en contribuir.

---

## 📋 Estándares Soportados

Este proyecto soporta los siguientes estándares de interoperabilidad:

### 1. **HL7 v2.x** 
   - **Descripción**: HL7 v2.x es la versión más adoptada de los estándares HL7. Se basa en mensajes de texto delimitados por el carácter `|` (pipe). Cada mensaje contiene segmentos que representan diferentes piezas de información clínica o administrativa.
   - **Ejemplo de Mensaje**:
     ```hl7
     MSH|^~\&|SistemaVentas|SistemaFacturacion|2024-09-26T14:00:00Z||ADT^A01|MSG12345|P|2.5
     PID|1||12345^^^SistemaVentas^MR||John^Doe||19800101|M|||123 Main St^Apt 101^City^CA^90210
     ```

   - **Referencias**:
     - [Estándar HL7 v2.x](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185)
     - [Guía de Estructura de Mensajes HL7 v2.x](https://hl7-definition.caristix.com/v2/HL7v2.3/Segments/MSH)

### 2. **HL7 v3** 
   - **Descripción**: HL7 v3 está basado en XML y es más estructurado que HL7 v2.x. Ofrece un enfoque formalizado para el intercambio de datos entre sistemas de salud, pero su adopción es más limitada debido a la complejidad adicional.
   - **Ejemplo de Mensaje** (en XML):
     ```xml
     <ClinicalDocument xmlns="urn:hl7-org:v3">
       <id extension="MSG12345"/>
       <code code="ADT^A01" codeSystem="2.16.840.1.113883.1.6"/>
       <effectiveTime value="2024-09-26T14:00:00"/>
       <component>
         <structuredBody>
           <component>
             <section>
               <title>Transaction</title>
               <entry>
                 <name>Transaction1</name>
                 <value>TX12345</value>
               </entry>
             </section>
           </component>
         </structuredBody>
       </component>
     </ClinicalDocument>
     ```

   - **Referencias**:
     - [Estándar HL7 v3](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=186)

### 3. **FHIR (Fast Healthcare Interoperability Resources)** 
   - **Descripción**: FHIR es el estándar más moderno de HL7, diseñado para la simplicidad y escalabilidad. Utiliza **JSON**, **XML**, y **APIs REST** para facilitar la integración y la interoperabilidad entre los sistemas de salud.
   - **Ejemplo de Mensaje** (en JSON):
     ```json
     {
       "resourceType": "Bundle",
       "id": "MSG12345",
       "type": "transaction",
       "entry": [
         {
           "resource": {
             "resourceType": "Transaction",
             "id": "TX12345",
             "attributes": [
               {
                 "key": "transactionId1",
                 "value": "TX12345"
               },
               {
                 "key": "producto1",
                 "value": "Medicamento"
               }
             ]
           }
         }
       ]
     }
     ```

   - **Referencias**:
     - [Descripción General de FHIR](https://www.hl7.org/fhir/overview.html)
     - [Recursos FHIR](https://www.hl7.org/fhir/resourcelist.html)

---

## 🔧 Dependencias

Este proyecto utiliza las siguientes dependencias de Node.js:

- **fs**: Módulo nativo de Node.js para manejar operaciones en el sistema de archivos, como lectura y escritura de archivos.
- **hl7**: Biblioteca para serializar y deserializar mensajes HL7 v2.x.
  - Instalación: 
    ```bash
    npm install hl7
    ```
- **xml2js**: Biblioteca para convertir objetos JavaScript a XML (utilizada para la generación de HL7 v3).
  - Instalación: 
    ```bash
    npm install xml2js
    ```
- **uuid**: Biblioteca para generar identificadores únicos universales (UUID), que asegura que cada mensaje tenga un identificador único.
  - Instalación: 
    ```bash
    npm install uuid
    ```

---

## 🚀 Instalación y Configuración

1. **Clona el repositorio**:
   ```bash
   https://github.com/FranMaster08/hl7-fhir-message-generator.git
   
   cd hl7-dynamic-generator
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el generador** (ejemplo):
   ```bash
   npm start
   ```

---

## 📝 Cómo Usar

1. Define tus **datos de entrada** en una estructura dinámica (esto puede ser datos de transacciones, registros médicos, inventario, etc.).

2. Elige el **estándar** que deseas utilizar (HL7 v2.x, HL7 v3, FHIR).

3. Utiliza el **HL7MessageContext** para cambiar entre estrategias de forma dinámica y generar el mensaje.

4. Exporta el mensaje a un archivo en el formato adecuado (HL7, XML, JSON).

---

## 🔧 Ejemplo de Uso

```typescript
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

// Inicializar el contexto con la estrategia de HL7 v2.x
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
```

---

## 🛠️ Roadmap

Este proyecto está aún en **versión ALPHA** y planeamos agregar las siguientes características:

- Validación más detallada de los mensajes HL7 y FHIR generados.
- Soporte para más formatos de datos del sector salud.
- Mejor manejo de errores y registro (logging).
- Opciones de personalización para los diferentes segmentos del mensaje.

---

## 🤝 Contribuciones

Si deseas contribuir a este proyecto, ¡eres bienvenido! Puedes enviar un pull request o abrir un issue. Aceptamos contribuciones que mejoren la calidad del código, agreguen características o corrijan errores.

---

## 🧑‍💻 Autor

Creado por **Francisco Javier Jimenez Cohen**.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🔗 Referencias

1. [Estándar HL7 v2.x](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185)
2. [Estándar HL7 v3](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=186)
3. [Descripción General de FHIR](https://www.hl7.org/fhir/overview.html)

---

Este **README** en español incluye emojis para hacerlo más visual y atractivo. Además, cubre todas las dependencias, estándares soportados, y ejemplos de uso, y aclara que estamos en una **versión ALPHA** del proyecto.