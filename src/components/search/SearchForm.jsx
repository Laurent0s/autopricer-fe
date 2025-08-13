"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Star, Car, Calendar, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import CAR_DATA from "../../../public/data/cars.json";

export default function SearchForm({ onSearch }) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    yearfrom: "",
    yearTo: "",
  });
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i,
  );

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value,
      ...(key === "brand" ? { model: "" } : {}),
    };

    setFilters(newFilters);

    // Валідація діапазону років
    if (key === "yearfrom" || key === "yearTo") {
      validateYears(newFilters);
    } else {
      setError("");
    }
  };

  const validateYears = (currentFilters) => {
    const yearfrom = parseInt(currentFilters.yearfrom);
    const yearTo = parseInt(currentFilters.yearTo);

    if (yearfrom && yearTo && yearfrom > yearTo) {
      setError(
        'Неможливо почати пошук - значення "від" не можуть бути більшими за "до"',
      );
    } else {
      setError("");
    }
  };

  const handleAnalyze = () => {
    if (!filters.brand || !filters.model) {
      return;
    }

    // Перевірка валідності років перед переходом
    const yearfrom = parseInt(filters.yearfrom);
    const yearTo = parseInt(filters.yearTo);

    if (yearfrom && yearTo && yearfrom > yearTo) {
      setError(
        'Неможливо почати пошук - значення "від" не можуть бути більшими за "до"',
      );
      return;
    }

    const params = new URLSearchParams(filters).toString();
    router.push(`/PriceAnalysis?${params.toString()}`);
  };

  const isFormValid = filters.brand && filters.model && !error;

  return (
    <div className="fflex flex-col grow">
      <Card className="border-0 shadow-none">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Швидкий пошук
            </h2>
            <p className="text-slate-600 text-lg">
              Обери параметри для перегляду цін
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Марка */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-blue-600" />
                Марка автомобіля
              </Label>
              <Select
                value={filters.brand}
                onValueChange={(value) => handleFilterChange("brand", value)}
              >
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Оберіть марку" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CAR_DATA).map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Модель */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                Модель
              </Label>
              <Select
                value={filters.model}
                onValueChange={(value) => handleFilterChange("model", value)}
                disabled={!filters.brand}
              >
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Оберіть модель" />
                </SelectTrigger>
                <SelectContent>
                  {filters.brand &&
                    CAR_DATA[filters.brand]?.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Рік випуску (від) */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Рік від
              </Label>
              <Select
                value={filters.yearfrom}
                onValueChange={(value) => handleFilterChange("yearfrom", value)}
              >
                <SelectTrigger
                  className={`h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 ${error ? "border-red-300" : ""} w-full`}
                >
                  <SelectValue placeholder="Від року" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Рік випуску (до) */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Рік до
              </Label>
              <Select
                value={filters.yearTo}
                onValueChange={(value) => handleFilterChange("yearTo", value)}
              >
                <SelectTrigger
                  className={`h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 ${error ? "border-red-300" : ""} w-full`}
                >
                  <SelectValue placeholder="До року" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!isFormValid}
              className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              <Search className="w-6 h-6 mr-3" />
              Аналізувати ціни
            </Button>
          </div>

          {!isFormValid && !error && (
            <p className="text-center text-slate-500 mt-4">
              Обери марку та модель для продовження
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
