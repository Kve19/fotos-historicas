"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Camera, User } from "lucide-react";

export default function PhotoHistoryGenerator() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);

  const handleGenerate = () => {
    const lines = input.split("\n");
    const photoData: any = {};

    lines.forEach((line) => {
      const [key, ...rest] = line.split(":");
      photoData[key.trim().toLowerCase()] = rest.join(":").trim();
    });

    setData(photoData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Foto: Boulevard du Temple\nAño: 1838\nFotógrafo: Louis Daguerre\nTécnica: Daguerrotipo\nHistoria: Esta es la primera fotografía conocida que muestra a un ser humano.\nImagen: /boulevard.jpg`}
        className="w-full h-40 p-4 border rounded-xl text-sm font-mono"
      />
      <button
        onClick={handleGenerate}
        className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
      >
        Generar Tarjeta
      </button>

      {data && (
        <Card className="rounded-2xl shadow-md">
          <img
            src={data["imagen"] || "/placeholder.jpg"}
            alt={data["foto"] || "Foto histórica"}
            className="rounded-t-2xl object-cover w-full h-72"
          />
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">
              {data["foto"] || "Foto histórica"}
            </h2>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} /> <span>{data["año"]}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} /> <span>{data["fotógrafo"]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera size={16} /> <span>{data["técnica"]}</span>
              </div>
            </div>

            <div className="text-gray-700 leading-relaxed">
              {data["historia"]}
            </div>

            <Badge variant="outline">#FotosQueHicieronHistoria</Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}