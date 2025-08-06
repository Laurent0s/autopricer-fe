import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const BODY_TYPES = [
  { value: "седан", label: "Седан", icon: "🚗" },
  { value: "кросовер", label: "Кросовер", icon: "🚙" },
  { value: "купе", label: "Купе", icon: "🏎️" },
  { value: "універсал", label: "Універсал", icon: "🚛" },
  { value: "хетчбек", label: "Хетчбек", icon: "🚐" },
  { value: "мінівен", label: "Мінівен", icon: "🚌" },
];

export default function BodyTypeSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {BODY_TYPES.map((type) => (
        <Card
          key={type.value}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md relative border-2 ${
            selected === type.value
              ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
          }`}
          onClick={() => onSelect(selected === type.value ? "" : type.value)}
        >
          <CardContent className="p-4 text-center">
            {selected === type.value && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="text-3xl mb-2">{type.icon}</div>
            <p
              className={`text-sm font-medium ${
                selected === type.value ? "text-blue-700" : "text-slate-700"
              }`}
            >
              {type.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
