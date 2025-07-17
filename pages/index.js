import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

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
  }
];

export default function Home() {
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
      <Tabs defaultValue={filteredSections[0]?.id || ""} className="w-full">
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