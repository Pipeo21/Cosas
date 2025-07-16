import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

const sections = [
  {
    id: "engine-specs",
    title: "Especificaciones del Motor",
    content: `
Motor G4EE 1.4L 4 cilindros en línea:
- Desplazamiento: 1,399 cc
- Potencia máxima: 97 hp @ 6,000 rpm
- Torque máximo: 126 Nm @ 4,700 rpm
- Tipo de combustible: Gasolina sin plomo
- Normativa de emisiones: Euro III

🔧 Procedimiento de revisión general:
1. Inspeccionar visualmente el motor y revisar fugas.
2. Verificar nivel y estado del aceite del motor.
3. Medir compresión en frío: debe estar entre 175 y 210 psi.
4. Comprobar bujías y estado de los cables.

🖼️ Imagen referencial del motor (G4EE):
<img src="/images/engine-diagram.png" alt="Diagrama del motor G4EE" style="width:100%;max-width:500px;" />
    `
  },
  {
    id: "torque-values",
    title: "Valores de Torque",
    content: `
🔩 Valores estándar según diámetro:
- M6: 5 ~ 6 Nm
- M8: 12 ~ 15 Nm
- M10: 25 ~ 30 Nm
- M12: 35 ~ 45 Nm (hasta 80 Nm en aplicaciones críticas)
- M14: 75 ~ 85 Nm
- M16: 110 ~ 130 Nm
- M18: 160 ~ 180 Nm
- M20: 220 ~ 250 Nm
- M22: 290 ~ 330 Nm
- M24: 360 ~ 420 Nm

📌 Consideraciones:
- No aplicar en partes con arandelas dentadas.
- Reducir 15% si hay presencia de aceite o grasa.
    `
  },
  {
    id: "transmission",
    title: "Transmisión Automática (A4AF3)",
    content: `
⚙️ Características:
- Tipo: Automática controlada electrónicamente, 4 velocidades
- Relaciones de marcha:
  1ra: 2.846
  2da: 1.581
  3ra: 1.000
  4ta: 0.685
  Reversa: 2.176
- Relación final: 4.041
- Capacidad de fluido: 6.1 L (SP-III)
- Engranaje planetario: tipo Ravigneaux
- Solenoides: 6 (3 PWM, 3 ON/OFF)

🔧 Procedimiento de cambio de ATF:
1. Levantar el vehículo y asegurar con torres.
2. Retirar tapón de drenaje del cárter de transmisión.
3. Dejar escurrir completamente (~5-6 L).
4. Reinstalar tapón con torque: 35~45 Nm.
5. Llenar con ATF SP-III hasta nivel caliente.

🖼️ Diagrama del sistema de transmisión:
<img src="/images/transmission-schematic.png" alt="Esquema de transmisión A4AF3" style="width:100%;max-width:500px;" />
    `
  },
  {
    id: "lubricants",
    title: "Lubricantes Recomendados",
    content: `
🛢️ Especificaciones por componente:
- Motor: API SL o superior, ILSAC GF-3
- Caja manual: MTF 75W/85 (GL-4)
- Caja automática: ATF SP-III
- Refrigerante: Etilenglicol base aluminio
- Dirección asistida: PSF-III
- Grasa multipropósito: NLGI #2 (bisagras, cables)

🧪 Tip:
Verifica viscosidad del aceite con temperatura ambiental:
<img src="/images/oil-viscosity-chart.png" alt="Tabla viscosidad" style="width:100%;max-width:400px;" />
    `
  },
  {
    id: "identification",
    title: "Identificación del Vehículo",
    content: `
🔍 VIN (17 dígitos):
1-3: País, fabricante, tipo
4-8: Línea, modelo, seguridad
9: Verificador
10: Año
11-17: Planta y número secuencial

🎨 Códigos de color:
- NW: Blanco Noble
- EB: Negro Ébano
- HL: Rojo Hiphop

🖼️ Ubicación del VIN:
<img src="/images/vin-location.png" alt="Ubicación VIN en el Accent" style="width:100%;max-width:400px;" />
    `
  },
  {
    id: "suspension-lift",
    title: "Puntos de Elevación y Apoyo",
    content: `
🧱 Procedimiento seguro:
1. Colocar el gato bajo los puntos reforzados.
2. Asegurar con soportes (torres) en los puntos mostrados.
3. Distribuir peso en maletero si remueves suspensión.

🖼️ Diagrama de puntos de apoyo:
<img src="/images/lift-points.png" alt="Puntos de elevación" style="width:100%;max-width:500px;" />
    `
  },
  {
    id: "towing",
    title: "Remolque de Emergencia",
    content: `
🚧 Recomendaciones:
- Usar grúa con plataforma.
- Evitar remolque con cadenas.
- Para cajas automáticas: seguir secuencia [D] → [N] → Apagar.

📏 Límite: 30 km y 50 km/h máximo.

🖼️ Puntos de remolque:
<img src="/images/towing-points.png" alt="Puntos remolque Accent" style="width:100%;max-width:400px;" />
    `
  },
  {
    id: "cooling-fluids",
    title: "Capacidades de Fluidos",
    content: `
📊 Capacidades:
- Aceite motor: 3.3 L (con filtro)
- Refrigerante: 5.5 ~ 5.8 L
- Caja manual: 2.0 L
- Automática: 6.1 L
- Dirección asistida: 0.75 ~ 0.8 L

🧊 Consejo:
Purgar sistema de refrigeración con el motor en marcha y calefacción activada.
    `
  },
  {
    id: "electrical-system",
    title: "Sistema Eléctrico",
    content: `
⚡ Seguridad:
- Desconectar polo negativo antes de intervenir.
- Revisar conectores por corrosión.

📈 Sensor ATF:
- Tensión: 2.16V a 72°C

🖼️ Diagrama básico de sensores:
<img src="/images/electrical-diagram.png" alt="Esquema eléctrico básico" style="width:100%;max-width:500px;" />
    `
  },
  {
    id: "dtc-codes",
    title: "Códigos de Diagnóstico (DTC)",
    content: `
🧠 Códigos comunes:
- P0707: Falla en interruptor de rango
- P0713: Sensor ATF – señal alta
- P0731 a P0734: Marchas con relación incorrecta
- P0741: Convertidor atascado
- P0750 a P0760: Solenoides dañados

🧪 Uso de scanner:
- Encender contacto
- Conectar Hi-Scan
- Leer y borrar códigos

🖼️ Imagen de conector DLC:
<img src="/images/obd-port.png" alt="Puerto OBD Accent" style="width:100%;max-width:400px;" />
    `
  },
  {
    id: "troubleshooting",
    title: "Diagnóstico y Pruebas",
    content: `
🔍 Prueba hidráulica:
1. Calentar ATF a 80~100°C.
2. Conectar manómetro a puertos de prueba.
3. Leer presión por marcha:
   - R: 8~10 kg/cm²
   - D1: 7~9 kg/cm²

🧪 Stall test:
- Acelerar a fondo en "D": debe estar entre 2400~2800 RPM
- Si es bajo: convertidor dañado

🖼️ Diagrama de puerto de presión:
<img src="/images/pressure-test-port.png" alt="Puerto prueba presión" style="width:100%;max-width:500px;" />
    `
  }
];

export default function HyundaiManualApp() {
  const [query, setQuery] = useState("");

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(query.toLowerCase()) ||
    section.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manual Hyundai Accent 2006</h1>
      <Input
        placeholder="Buscar sección o palabra clave..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md"
      />
      <Tabs defaultValue={filteredSections[0]?.id} className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          {filteredSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card className="mt-4">
              <CardContent className="p-4 whitespace-pre-wrap">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
