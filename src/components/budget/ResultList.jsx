import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CarResultCard from "./CarResultCard";
import { ListFilter } from "lucide-react";

export default function ResultList({ results }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          Знайдено моделей:{" "}
          <span className="font-bold text-slate-800">{results.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-500" />
          <Label>Сортування:</Label>
          <Select defaultValue="price-asc">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Ціна: по зростанню</SelectItem>
              <SelectItem value="price-desc">Ціна: по спаданню</SelectItem>
              <SelectItem value="listings-desc">
                Пропозиції: по спаданню
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((car) => (
          <CarResultCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
