import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Fuel, Settings, Package, RotateCcw } from "lucide-react";

export default function AdvancedFilters({ filters, onFilterChange, onReset }) {
  const handleChange = (key, value) => {
    onFilterChange(key, value);
  };

  const hasAdvancedFilters =
    filters.engineType || filters.transmission || filters.bodyType;

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-slate-800">
            Розширені фільтри
          </CardTitle>
          {hasAdvancedFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-slate-600 hover:text-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Скинути
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Тип двигуна */}
        <div className="space-y-2">
          <Label className="text-slate-700 font-medium flex items-center gap-2">
            <Fuel className="w-4 h-4 text-blue-600" />
            Тип двигуна
          </Label>
          <Select
            value={filters.engineType || ""}
            onValueChange={(value) => handleChange("engineType", value)}
          >
            <SelectTrigger className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Всі типи" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Всі типи</SelectItem>
              <SelectItem value="бензин">Бензин</SelectItem>
              <SelectItem value="дизель">Дизель</SelectItem>
              <SelectItem value="гібрид">Гібрид</SelectItem>
              <SelectItem value="електро">Електро</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Тип КПП */}
        <div className="space-y-2">
          <Label className="text-slate-700 font-medium flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            Тип КПП
          </Label>
          <Select
            value={filters.transmission || ""}
            onValueChange={(value) => handleChange("transmission", value)}
          >
            <SelectTrigger className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Всі типи" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Всі типи</SelectItem>
              <SelectItem value="механіка">Механіка</SelectItem>
              <SelectItem value="автомат">Автомат</SelectItem>
              <SelectItem value="робот">Робот</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Тип кузова */}
        <div className="space-y-2">
          <Label className="text-slate-700 font-medium flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            Тип кузова
          </Label>
          <Select
            value={filters.bodyType || ""}
            onValueChange={(value) => handleChange("bodyType", value)}
          >
            <SelectTrigger className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Всі типи" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Всі типи</SelectItem>
              <SelectItem value="седан">Седан</SelectItem>
              <SelectItem value="хетчбек">Хетчбек</SelectItem>
              <SelectItem value="універсал">Універсал</SelectItem>
              <SelectItem value="кросовер">Кросовер</SelectItem>
              <SelectItem value="позашляховик">Позашляховик</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
