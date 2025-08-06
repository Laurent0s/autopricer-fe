"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Share2,
  Check,
  Calculator,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import MetricsCards from "@/components/analytics/MetricsCards";
import PriceDistributionChart from "@/components/analytics/PriceDistributionChart";
import SearchSummary from "@/components/analytics/SearchSummary";
import BodyTypeSelector from "@/components/search/BodyTypeSelector";
import RangeSlider from "@/components/search/RangeSlider";

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
};

type ModelData = {
  averagePrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  totalListings: number;
  priceDistribution: Record<string, number>;
};
type Data = Partial<Record<Brand, Record<string, ModelData>>>;

const TEST_DATA: Data = {
  Porsche: {
    Cayenne: {
      averagePrice: 39500,
      medianPrice: 38750,
      minPrice: 27500,
      maxPrice: 49499,
      totalListings: 14,
      priceDistribution: {
        "27500-27999": 1,
        "31500-31999": 2,
        "32000-32499": 1,
        "37500-37999": 1,
        "38000-38499": 1,
        "38500-38999": 1,
        "40000-40499": 1,
        "41500-41999": 1,
        "44000-44499": 1,
        "45000-45499": 2,
        "46500-46999": 1,
        "49000-49499": 1,
      },
    },
  },
  Volkswagen: {
    Touareg: {
      averagePrice: 30450,
      medianPrice: 29750,
      minPrice: 21000,
      maxPrice: 42999,
      totalListings: 70,
      priceDistribution: {
        "21000-21499": 2,
        "22500-22999": 2,
        "23500-23999": 1,
        "24500-24999": 5,
        "25000-25499": 3,
        "25500-25999": 2,
        "26000-26499": 2,
        "26500-26999": 5,
        "27000-27499": 3,
        "27500-27999": 5,
        "28500-28999": 3,
        "29000-29499": 4,
        "29500-29999": 4,
        "30000-30499": 2,
        "30500-30999": 1,
        "31000-31499": 4,
        "31500-31999": 5,
        "32000-32499": 2,
        "32500-32999": 3,
        "33500-33999": 2,
        "34000-34499": 1,
        "34500-34999": 1,
        "35000-35499": 4,
        "35500-35999": 2,
        "36000-36499": 3,
        "38500-38999": 3,
        "41500-41999": 1,
        "42500-42999": 1,
      },
    },
  },
  Toyota: {
    Camry: {
      averagePrice: 23827,
      medianPrice: 23727.5,
      minPrice: 18499,
      maxPrice: 32999,
      totalListings: 40,
      priceDistribution: {
        "18400-18599": 2,
        "18600-18799": 1,
        "19000-19199": 1,
        "19600-19799": 1,
        "19800-19999": 2,
        "20000-20199": 3,
        "20800-20999": 2,
        "21000-21199": 1,
        "22000-22199": 2,
        "22400-22599": 1,
        "22800-22999": 2,
        "23400-23599": 2,
        "23800-23999": 1,
        "24000-24199": 1,
        "24400-24599": 2,
        "24800-24999": 3,
        "25400-25599": 1,
        "25800-25999": 2,
        "26400-26599": 2,
        "26800-26999": 1,
        "27400-27599": 1,
        "28600-28799": 1,
        "29400-29599": 3,
        "30000-30199": 1,
        "32800-32999": 1,
      },
    },
    Corolla: {
      averagePrice: 16500,
      medianPrice: 15800,
      minPrice: 12000,
      maxPrice: 22000,
      totalListings: 189,
      priceDistribution: {
        "12000-12499": 15,
        "12500-12999": 20,
        "13000-13499": 25,
        "13500-13999": 15,
        "14000-14499": 18,
        "14500-14999": 22,
        "15000-15499": 24,
        "15500-15999": 16,
        "16000-16499": 10,
        "16500-16999": 8,
        "17000-17999": 5,
        "18000-18999": 4,
        "19000-19999": 3,
        "20000-20999": 2,
        "21000-22000": 2,
      },
    },
  },
  BMW: {
    "3 Series": {
      averagePrice: 28500,
      medianPrice: 27000,
      minPrice: 18000,
      maxPrice: 45000,
      totalListings: 156,
      priceDistribution: {
        "18000-18499": 2,
        "19000-19499": 3,
        "20000-20499": 4,
        "21000-21499": 5,
        "22000-22499": 7,
        "23000-23499": 8,
        "24000-24499": 10,
        "25000-25499": 12,
        "26000-26499": 15,
        "27000-27499": 13,
        "28000-28499": 10,
        "29000-29499": 8,
        "30000-30499": 7,
        "32000-32499": 6,
        "34000-34499": 5,
        "36000-36499": 4,
        "38000-38499": 3,
        "40000-40499": 2,
        "42000-42499": 1,
        "44000-44499": 1,
      },
    },
  },
};

// type SearchFilters = {
//   mileageRange?: number[];
//   engineVolume?: number[];
//   [k: string]: string | number | number[] | undefined;
// };

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

// Allow arbitrary extras, but keep strong types for known keys.
export type SearchFilters = Partial<SearchFilterMap> &
  Record<string, string | number | RangeTuple | undefined>;

type SearchFilterKey = keyof SearchFilterMap;

type Brand = keyof typeof CAR_DATA;

export default function PriceAnalysisPage() {
  const [data, setData] = useState<ModelData | null>(null);
  const [data2, setData2] = useState<ModelData | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filters2, setFilters2] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [excludeUSA, setExcludeUSA] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i,
  );

  (useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchFilters: SearchFilters = {};
    for (const [key, value] of urlParams.entries()) {
      if (key === "mileageRange" || key === "engineVolume") {
        searchFilters[key] = value.split(",").map(Number);
      } else {
        searchFilters[key] = value;
      }
    }
    setFilters(searchFilters);
    loadData(searchFilters, {}, isCompareMode); // Pass null for second filters initially
  }),
    []);

  const loadData = (
    searchFilters: SearchFilters,
    searchFilters2: SearchFilters,
    isCompareMode: boolean,
  ) => {
    setIsLoading(true);
    setError(""); // Clear any previous errors at the start of a new load

    setTimeout(() => {
      // First car data
      const brand1 = searchFilters.brand;
      const model1 = searchFilters.model;
      if (brand1 && model1 && TEST_DATA[brand1] && TEST_DATA[brand1][model1]) {
        setData(TEST_DATA[brand1][model1]);
      } else {
        setData(null); // Set to null if specific car not found in TEST_DATA
        // Only set error if brand and model are actually selected but data is missing
        if (brand1 && model1) {
          setError(
            "Дані для обраної марки та моделі відсутні. Спробуйте іншу комбінацію.",
          );
        }
      }

      // Second car data (only if compare mode is active)
      if (
        isCompareMode &&
        searchFilters2 &&
        searchFilters2.brand &&
        searchFilters2.model
      ) {
        const brand2 = searchFilters2.brand;
        const model2 = searchFilters2.model;
        if (
          brand2 &&
          model2 &&
          TEST_DATA[brand2] &&
          TEST_DATA[brand2][model2]
        ) {
          setData2(TEST_DATA[brand2][model2]);
        } else {
          setData2(null); // No data for second car if not found in TEST_DATA
          if (brand2 && model2) {
            setError((prev) =>
              prev
                ? prev + " " + "Дані для другого автомобіля відсутні."
                : "Дані для другого автомобіля відсутні.",
            );
          }
        }
      } else {
        setData2(null); // Clear data2 if not in compare mode or no second filters
      }

      setIsLoading(false);
    }, 800);
  };

  const validateYears = (currentFilters: SearchFilters) => {
    const yearFrom = parseInt(currentFilters.yearFrom!);
    const yearTo = parseInt(currentFilters.yearTo!);

    if (yearFrom && yearTo && yearFrom > yearTo) {
      setError(
        'Неможливо почати пошук - значення "від" не можуть бути більшими за "до"',
      );
      return false;
    } else {
      // Clear year-related error if validation passes, but preserve other errors
      if (error.includes("Неможливо почати пошук")) {
        setError("");
      }
      return true;
    }
  };

  const handleFilterChange = <K extends SearchFilterKey>(
    key: K,
    value: SearchFilterMap[K],
  ) => {
    const newFilters = {
      ...filters,
      [key]: value,
      ...(key === "brand" ? { model: "" } : {}),
    };
    setFilters(newFilters);

    // Validate years immediately on change for better user feedback
    if (key === "yearFrom" || key === "yearTo") {
      validateYears(newFilters);
    } else {
      // If changing other filters, clear year validation error if it exists
      if (error.includes("Неможливо почати пошук")) {
        setError("");
      }
    }

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== "") {
        if (Array.isArray(v)) {
          params.set(k, v.join(","));
        } else {
          params.set(k, v);
        }
      }
    });
    // This only updates the URL for the main filters, not for compare mode filters
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );
  };

  const handleFilterChange2 = <K extends SearchFilterKey>(
    key: K,
    value: SearchFilterMap[K],
  ) => {
    const newFilters = {
      ...filters2,
      [key]: value,
      ...(key === "brand" ? { model: "" } : {}),
    };
    setFilters2(newFilters);
  };

  const handleSearch = () => {
    if (!filters.brand || !filters.model) {
      setError("Будь ласка, оберіть марку та модель автомобіля.");
      return;
    }
    if (isCompareMode && (!filters2.brand || !filters2.model)) {
      setError((prev) =>
        prev
          ? prev + " " + "Будь ласка, оберіть марку та модель для порівняння."
          : "Будь ласка, оберіть марку та модель для порівняння.",
      );
      return;
    }
    if (!validateYears(filters)) {
      return; // Validation error already set by validateYears
    }
    loadData(filters, isCompareMode ? filters2 : {}, isCompareMode);
  };

  const resetAllFilters = () => {
    setFilters({});
    setFilters2({}); // Reset second car filters
    setIsCompareMode(false); // Disable compare mode
    setError(""); // Clear any errors
    setData(null); // Clear loaded data
    setData2(null); // Clear loaded comparison data
    setExcludeUSA(false);
    window.history.replaceState({}, "", window.location.pathname);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleGoToCalculator = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, String(value));
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Аналізуємо ринкові дані...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-50 hover:border-blue-300 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Аналіз цін та пропозиції на ринку
              </h1>
              <p className="text-slate-600 mt-1">
                Покажемо скільки реально коштує омріяне авто
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleGoToCalculator}
            >
              <Calculator className="w-4 h-4" />
              <span>Калькулятор</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={resetAllFilters}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Скинути</span>
            </Button>
            <Button onClick={handleShare} className="w-36">
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  <span>Скопійовано</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  <span>Поділитися</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Main Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Basic Filters */}
            <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                Основні параметри пошуку
              </h3>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Марка */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Марка</Label>
                  <Select
                    value={filters.brand || ""}
                    onValueChange={(value: Brand) =>
                      handleFilterChange("brand", value)
                    }
                  >
                    <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
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
                  <Label className="text-slate-700 font-medium">Модель</Label>
                  <Select
                    value={filters.model || ""}
                    onValueChange={(value) =>
                      handleFilterChange("model", value)
                    }
                    disabled={!filters.brand}
                  >
                    <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
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

                {/* Рік від */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Рік від</Label>
                  <Select
                    value={filters.yearFrom || ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearFrom", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 ${error.includes("Неможливо почати пошук") ? "border-red-300" : ""}`}
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

                {/* Рік до */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Рік до</Label>
                  <Select
                    value={filters.yearTo || ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearTo", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 ${error.includes("Неможливо почати пошук") ? "border-red-300" : ""}`}
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

              {/* Compare Mode Toggle & Second Car Filters */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Switch
                    id="compare-mode"
                    checked={isCompareMode}
                    onCheckedChange={(checked) => {
                      setIsCompareMode(checked);
                      if (!checked) setData2(null);
                    }}
                  />
                  <Label
                    htmlFor="compare-mode"
                    className="font-medium text-slate-700 cursor-pointer"
                  >
                    Порівняти з іншим авто
                  </Label>
                </div>
                {isCompareMode && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-100/50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Марка 2
                      </Label>
                      <Select
                        value={filters2.brand || ""}
                        onValueChange={(value: Brand) =>
                          handleFilterChange2("brand", value)
                        }
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
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
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Модель 2
                      </Label>
                      <Select
                        value={filters2.model || ""}
                        onValueChange={(value) =>
                          handleFilterChange2("model", value)
                        }
                        disabled={!filters2.brand}
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                          <SelectValue placeholder="Оберіть модель" />
                        </SelectTrigger>
                        <SelectContent>
                          {filters2.brand &&
                            CAR_DATA[filters2.brand]?.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
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
                  {!showAdvanced && ( // Only show search button here if advanced filters are not open
                    <Button
                      onClick={handleSearch}
                      disabled={
                        !filters.brand ||
                        !filters.model ||
                        (isCompareMode &&
                          (!filters2.brand || !filters2.model)) ||
                        !!error
                      }
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Перевірити ціни
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
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500">
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
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500">
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
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500">
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
                      disabled={
                        !filters.brand ||
                        !filters.model ||
                        (isCompareMode &&
                          (!filters2.brand || !filters2.model)) ||
                        !!error
                      }
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Перевірити ціни
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </motion.div>

        {/* Search Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SearchSummary
            filters={filters}
            filters2={isCompareMode ? filters2 : null}
          />
        </motion.div>

        {/* Metrics Cards */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <MetricsCards data={data} data2={data2} />
          </motion.div>
        )}

        {/* Price Distribution Chart */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <PriceDistributionChart
              data={data}
              data2={data2}
              filters={filters}
              filters2={filters2}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
