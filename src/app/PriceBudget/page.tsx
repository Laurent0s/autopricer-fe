"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input"; // Added Input component
import BodyTypeSelector from "@/components/search/BodyTypeSelector";
import RangeSlider from "@/components/search/RangeSlider";
import FilterSidebar from "@/components/budget/FilterSidebar";
import ResultList from "@/components/budget/ResultList";

const CAR_DATA = {
  Audi: ["A4", "A6", "Q5", "Q7", "A3"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "i3"],
  Chevrolet: ["Cruze", "Malibu", "Equinox", "Camaro", "Aveo"],
  Citroen: ["C3", "C4", "C5 Aircross", "Berlingo"],
  Daewoo: ["Lanos", "Nexia", "Matiz"],
  Ford: ["Focus", "Fiesta", "Mondeo", "Kuga", "Fusion"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  Hyundai: ["Sonata", "Elantra", "Tucson", "Santa Fe", "Accent"],
  Jeep: ["Grand Cherokee", "Wrangler", "Compass", "Renegade"],
  Kia: ["Sportage", "Ceed", "Rio", "Optima"],
  Mazda: ["3", "6", "CX-5", "CX-9"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  Mitsubishi: ["Outlander", "Lancer", "ASX", "Pajero Sport"],
  Nissan: ["Qashqai", "X-Trail", "Juke", "Leaf", "Rogue"],
  Opel: ["Astra", "Corsa", "Insignia", "Mokka"],
  Peugeot: ["208", "308", "3008", "5008", "Partner"],
  Porsche: ["Cayenne"],
  Renault: ["Megane", "Clio", "Duster", "Logan", "Captur"],
  Skoda: ["Octavia", "Superb", "Fabia", "Kodiaq"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Camry", "Corolla", "RAV4", "Land Cruiser Prado", "Highlander"],
  Volkswagen: ["Passat", "Golf", "Tiguan", "Jetta", "Polo", "Touareg"],
  Volvo: ["XC90", "XC60", "S60", "V60"],
  ВАЗ: ["21099", "2107", "2106", "2110", "Priora"],
  ЗАЗ: ["Sens", "Lanos", "Forza", "Vida", "Tavria"],
} as const;

void CAR_DATA;

interface MockResult {
  id: number;
  brand: string;
  model: string;
  generation: string;
  years: string;
  avgPrice: number;
  medianPrice: number;
  listings: number;
  engine: string;
  transmission: string;
  fuel: string;
  drive: string;
  imageUrl: string;
}

const MOCK_RESULTS: MockResult[] = [
  {
    id: 1,
    brand: "Peugeot",
    model: "Traveller",
    generation: "III покоління (2nd PL)",
    years: "2018-2024",
    avgPrice: 5000,
    medianPrice: 6000,
    listings: 2,
    engine: "2.0 TSI, 2.5 TDI",
    transmission: "Механіка, Автомат",
    fuel: "Бензин, дизель",
    drive: "FWD, RWD",
    imageUrl:
      "https://images.unsplash.com/photo-1617469724584-18a853534a36?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "BMW",
    model: "5 Series (G30)",
    generation: "III покоління",
    years: "2017-2023",
    avgPrice: 17500,
    medianPrice: 18200,
    listings: 240,
    engine: "2.0 TDI, 2.5 TDI",
    transmission: "Автомат",
    fuel: "Бензин, дизель",
    drive: "FWD, RWD",
    imageUrl:
      "https://images.unsplash.com/photo-1617531322438-28f757d0a597?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    brand: "Dodge",
    model: "Challenger",
    generation: "III покоління",
    years: "2008-2023",
    avgPrice: 25000,
    medianPrice: 26500,
    listings: 150,
    engine: "3.6 V6, 5.7 HEMI",
    transmission: "Автомат",
    fuel: "Бензин",
    drive: "RWD",
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    brand: "BMW",
    model: "5 Series (G30)",
    generation: "III покоління",
    years: "2017-2023",
    avgPrice: 17500,
    medianPrice: 18200,
    listings: 240,
    engine: "2.0 TDI, 2.5 TDI",
    transmission: "Автомат",
    fuel: "Бензин, дизель",
    drive: "FWD, RWD",
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964&auto=format&fit=crop",
  },
];

type RangeTuple = number[];
type engineType = "бензин" | "дизель" | "гібрид" | "електро" | "";
type transmissionType =
  | "механіка"
  | "автомат_всі"
  | "автомат"
  | "робот"
  | "варіатор"
  | "";
type driveType = "fwd" | "rwd" | "awd" | "";

type SearchFilterMap = {
  budget?: number;
  brand?: keyof typeof CAR_DATA;
  model?: string;
  yearFrom?: string;
  yearTo?: string;
  bodyType?: string;
  engineType?: engineType;
  transmission?: transmissionType;
  driveType?: driveType;
  mileageRange?: RangeTuple;
  engineVolume?: RangeTuple;
};

export type SearchFilters = Partial<SearchFilterMap> &
  Record<string, string | number | RangeTuple | undefined>;

type SearchFilterKey = keyof SearchFilterMap;

export default function BudgetFinderPage() {
  const [filters, setFilters] = useState<SearchFilterMap>({
    budget: 15000,
    yearFrom: "2015",
    yearTo: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [excludeUSA, setExcludeUSA] = useState(false);
  const [results, setResults] = useState<MockResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i,
  );

  const handleFilterChange = <K extends SearchFilterKey>(
    key: K,
    value: SearchFilterMap[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Підбір авто за бюджетом
          </h1>
          <p className="text-slate-600 mt-2">
            Усі варіанти в твоєму бюджеті – як на долоні. Далі обираєш ти.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-10"
        >
          {/* Basic Filters */}
          <div className="p-8 bg-gradient-to-r from-emerald-50 to-green-50">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-emerald-600" />
              Основні параметри пошуку
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
              {" "}
              {/* Updated grid layout */}
              {/* Ваш бюджет */}
              <div className="space-y-2">
                <Label
                  htmlFor="budget-input"
                  className="text-slate-700 font-medium"
                >
                  Ваш бюджет, $
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="budget-input"
                    type="number"
                    placeholder="Наприклад, 15000"
                    value={filters.budget || ""}
                    onChange={(e) =>
                      handleFilterChange("budget", Number(e.target.value))
                    }
                    className="h-12 pl-10 text-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    step="500"
                  />
                </div>
              </div>
              {/* Рік від */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Рік від</Label>
                <Select
                  value={filters.yearFrom}
                  onValueChange={(value) =>
                    handleFilterChange("yearFrom", value)
                  }
                >
                  <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20">
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
              {/* Рік до */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Рік до</Label>
                <Select
                  value={filters.yearTo}
                  onValueChange={(value) => handleFilterChange("yearTo", value)}
                >
                  <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20">
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

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-slate-700 hover:bg-white/50 p-2 h-auto text-sm font-medium"
                  >
                    <span className="mr-2">Додаткові параметри</span>
                    {showAdvanced ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="exclude-usa"
                    checked={excludeUSA}
                    onCheckedChange={setExcludeUSA}
                  />
                  <Label
                    htmlFor="exclude-usa"
                    className="text-sm text-slate-700 flex items-center cursor-pointer"
                  >
                    🇺🇸 Прибрати авто з США
                  </Label>
                </div>
                {!showAdvanced && (
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Підібрати авто
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleContent>
              <div className="p-8 bg-slate-50 border-t border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-6">
                  Додаткові параметри
                </h4>

                {/* Тип кузова */}
                <div className="mb-8">
                  <Label className="text-slate-700 font-medium mb-4 block">
                    Тип кузова
                  </Label>
                  <BodyTypeSelector
                    selected={filters.bodyType}
                    onSelect={(value: string) =>
                      handleFilterChange("bodyType", value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Тип пального */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Тип пального
                    </Label>
                    <Select
                      value={filters.engineType || ""}
                      onValueChange={(value: engineType) =>
                        handleFilterChange("engineType", value)
                      }
                    >
                      <SelectTrigger className="h-11 border-slate-300 focus:border-emerald-500">
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Всі типи</SelectItem>
                        <SelectItem value="бензин">Бензин</SelectItem>
                        <SelectItem value="дизель">Дизель</SelectItem>
                        <SelectItem value="гібрид">Гібрид</SelectItem>
                        <SelectItem value="електро">Електро</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Тип трансмісії */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Тип трансмісії
                    </Label>
                    <Select
                      value={filters.transmission || ""}
                      onValueChange={(value: transmissionType) =>
                        handleFilterChange("transmission", value)
                      }
                    >
                      <SelectTrigger className="h-11 border-slate-300 focus:border-emerald-500">
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Всі типи</SelectItem>
                        <SelectItem value="механіка">Механіка</SelectItem>
                        <SelectItem value="автомат_всі">
                          Автомат (всі типи)
                        </SelectItem>
                        <SelectItem value="автомат">Автомат</SelectItem>
                        <SelectItem value="робот">Робот</SelectItem>
                        <SelectItem value="варіатор">Варіатор</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Тип приводу */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Тип приводу
                    </Label>
                    <Select
                      value={filters.driveType || ""}
                      onValueChange={(value: driveType) =>
                        handleFilterChange("driveType", value)
                      }
                    >
                      <SelectTrigger className="h-11 border-slate-300 focus:border-emerald-500">
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Всі типи</SelectItem>
                        <SelectItem value="fwd">Передній (FWD)</SelectItem>
                        <SelectItem value="rwd">Задній (RWD)</SelectItem>
                        <SelectItem value="awd">Повний (AWD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Пробіг */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <RangeSlider
                      label="Пробіг"
                      min={0}
                      max={500000}
                      step={5000}
                      value={filters.mileageRange || [0, 200000]}
                      onChange={(value: RangeTuple) =>
                        handleFilterChange("mileageRange", value)
                      }
                      unit="км"
                    />
                  </div>

                  {/* Об'єм двигуна */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <RangeSlider
                      label="Об'єм двигуна"
                      min={1.0}
                      max={6.0}
                      step={0.1}
                      value={filters.engineVolume || [1.0, 4.0]}
                      onChange={(value: RangeTuple) =>
                        handleFilterChange("engineVolume", value)
                      }
                      unit="л"
                    />
                  </div>
                </div>

                {/* Search button at bottom of advanced filters */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Підібрати авто
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {isSearching && (
          <div className="text-center p-8">Завантаження результатів...</div>
        )}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            <div className="lg:col-span-1">
              <FilterSidebar />
            </div>
            <div className="lg:col-span-3">
              <ResultList results={results} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
