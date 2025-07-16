
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

// ... contenido omitido por brevedad, ya lo hemos guardado antes ...

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
