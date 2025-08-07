import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BRANDS = ["Всі", "Peugeot", "Audi", "BMW"];
const MODELS = [
  "Всі",
  "BMW 5 Series (G30)",
  "Peugeot Traveller",
  "Dodge Challenger",
];

export default function FilterSidebar() {
  return (
    <Card className="sticky top-24 shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg">Фільтри</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={["brand", "model"]}
          className="w-full"
        >
          <AccordionItem value="brand">
            <AccordionTrigger>Марка</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} />
                  <Label htmlFor={`brand-${brand}`} className="font-normal">
                    {brand}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="model">
            <AccordionTrigger>Модель</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {MODELS.map((model) => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox id={`model-${model}`} />
                  <Label htmlFor={`model-${model}`} className="font-normal">
                    {model}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="engine-type">
            <AccordionTrigger>Тип пального</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
          <AccordionItem value="engine-volume">
            <AccordionTrigger>Об'єм двигуна</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
          <AccordionItem value="transmission">
            <AccordionTrigger>Тип трансмісії</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
          <AccordionItem value="body-type">
            <AccordionTrigger>Тип кузова</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
          <AccordionItem value="drive-type">
            <AccordionTrigger>Тип приводу</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
          <AccordionItem value="year">
            <AccordionTrigger>Рік</AccordionTrigger>
            <AccordionContent>...</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
