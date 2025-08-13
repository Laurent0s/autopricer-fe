"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Share2,
  Check,
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

import SearchSummary from "@/components/analytics/SearchSummary";
import BodyTypeSelector from "@/components/search/BodyTypeSelector";
import RangeSlider from "@/components/search/RangeSlider";
import YearlyPriceChart from "@/components/analytics/YearlyPriceChart";
import YearlyMetricsCards from "@/components/analytics/YearlyMetricsCards";
import { useAppDispatch } from "@/store/hooks";
import { fetchPriceYears } from "@/store/slices/PriceYearsSlice";
import { Card, CardContent } from "@/components/ui/card";

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

type Data = {
  averagePriceFrom: string;
  averagePriceTo: string;
  quantity: string;
  years: YearPoint[];
};
type YearPoint = { year: number; avg_price: number; listings: number };

type RangeTuple = number[];
type fuel = "бензин" | "дизель" | "гібрид" | "електро" | "All";
type transmissionType =
  | "механіка"
  | "автомат_всі"
  | "автомат"
  | "робот"
  | "варіатор"
  | "All";
type driveType = "fwd" | "rwd" | "awd" | "All";

type SearchFilterMap = {
  brand: keyof typeof CAR_DATA;
  model: string;
  ifusa?: boolean | null;
  yearfrom?: number | null;
  yearTo?: number | null;
  bodyType?: string | null;
  fuel?: fuel | null;
  transmission?: transmissionType | null;
  driveType?: driveType | null;
  mileageFrom?: number | null;
  mileageTo?: number | null;
  engineFrom: number | null;
  engineTo: number | null;
};

// Allow arbitrary extras, but keep strong types for known keys.
export type SearchFilters = Partial<SearchFilterMap>;

type SearchFilterKey = keyof SearchFilterMap;

type Brand = keyof typeof CAR_DATA;

export default function PriceYears() {
  const [data, setData] = useState<Data | null>(null);
  const [data2, setData2] = useState<Data | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filters2, setFilters2] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [excludeUSA, setExcludeUSA] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useAppDispatch();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i,
  );

  const loadData = useCallback(
    async (searchFilters: SearchFilters, searchFilters2: SearchFilters) => {
      setIsLoading(true);
      setError("");

      const data = await dispatch(
        fetchPriceYears({
          brand: searchFilters.brand!,
          model: searchFilters.model!,
          ifusa: excludeUSA ?? false,
          yearfrom: searchFilters.yearfrom ?? null,
          yearTo: searchFilters.yearTo ?? null,
          bodyType: searchFilters.bodyType ?? null,
          fuel:
            searchFilters.fuel === "All" ? null : (searchFilters.fuel ?? null),
          transmission:
            searchFilters.transmission === "All"
              ? null
              : (searchFilters.transmission ?? null),
          driveType:
            searchFilters.driveType === "All"
              ? null
              : (searchFilters.driveType ?? null),
          mileageFrom: searchFilters.mileageFrom ?? null,
          mileageTo: searchFilters.mileageTo ?? null,
          engineFrom: searchFilters.engineFrom ?? null,
          engineTo: searchFilters.engineTo ?? null,
        }),
      ).unwrap();

      if (
        isCompareMode &&
        searchFilters2 &&
        searchFilters2.brand &&
        searchFilters2.model
      ) {
        const data2 = await dispatch(
          fetchPriceYears({
            brand: searchFilters2.brand!,
            model: searchFilters2.model!,
            ifusa: excludeUSA ?? false,
            yearfrom: searchFilters.yearfrom ?? null,
            yearTo: searchFilters.yearTo ?? null,
            bodyType: searchFilters.bodyType ?? null,
            fuel:
              searchFilters.fuel === "All"
                ? null
                : (searchFilters.fuel ?? null),
            transmission:
              searchFilters.transmission === "All"
                ? null
                : (searchFilters.transmission ?? null),
            driveType:
              searchFilters.driveType === "All"
                ? null
                : (searchFilters.driveType ?? null),
            mileageFrom: searchFilters.mileageFrom ?? null,
            mileageTo: searchFilters.mileageTo ?? null,
            engineFrom: searchFilters.engineFrom ?? null,
            engineTo: searchFilters.engineTo ?? null,
          }),
        ).unwrap();
        const brand1 = searchFilters2.brand;
        const model1 = searchFilters2.model;
        setData2(data2.data[brand1][model1]);
      }

      setTimeout(() => {
        // First car data
        const brand1 = searchFilters.brand;
        const model1 = searchFilters.model;
        if (
          brand1 &&
          model1 &&
          data.data[brand1] &&
          data.data[brand1][model1]
        ) {
          setData(data.data[brand1][model1]);
        } else {
          setData(null);
          if (brand1 && model1) {
            setError("Дані для обраної марки та моделі відсутні.");
          }
        }

        // Second car data

        setIsLoading(false);
      }, 800);
    },
    [dispatch, excludeUSA, isCompareMode],
  );

  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    let searchFilters: Partial<SearchFilters> = {};
    const hasBrand = urlParams.has("brand");
    const hasModel = urlParams.has("model");

    if (!hasBrand || !hasModel) {
      setIsLoading(false);
      return;
    }

    const numberKeys = [
      "yearfrom",
      "yearTo",
      "mileageFrom",
      "mileageTo",
      "engineFrom",
      "engineTo",
    ] as const;

    const allowedKeys = new Set<keyof SearchFilters>([
      "brand",
      "model",
      "bodyType",
      "fuel",
      "transmission",
      "driveType",
      ...numberKeys,
    ]);

    const isFilterKey = (k: string): k is keyof SearchFilters =>
      allowedKeys.has(k as keyof SearchFilters);

    type NumberKey = (typeof numberKeys)[number];
    const isNumberKey = (k: keyof SearchFilters): k is NumberKey =>
      (numberKeys as readonly string[]).includes(k as string);

    function coerce<K extends keyof SearchFilters>(
      k: K,
      raw: string,
    ): SearchFilters[K] {
      if (k === "fuel")
        return (raw === "All" ? null : (raw as fuel)) as SearchFilters[K];
      if (k === "transmission")
        return (
          raw === "All" ? null : (raw as transmissionType)
        ) as SearchFilters[K];
      if (k === "driveType")
        return (raw === "All" ? null : (raw as driveType)) as SearchFilters[K];
      if (k === "bodyType")
        return (raw === "All" ? null : raw) as SearchFilters[K];
      if (k === "brand") return raw as Brand as SearchFilters[K];
      if (isNumberKey(k)) return (raw ? Number(raw) : null) as SearchFilters[K];
      // "model" and other strings
      return (raw || null) as SearchFilters[K];
    }

    for (const [rawKey, rawValue] of urlParams.entries()) {
      if (rawKey === "excludeUSA") {
        setExcludeUSA(rawValue === "true");
        continue;
      }

      if (isFilterKey(rawKey)) {
        const k = rawKey as keyof SearchFilters;
        // 2) Rebuild instead of mutate:
        searchFilters = {
          ...searchFilters,
          [k]: coerce(k, rawValue),
        } as SearchFilters; // one safe cast on the whole object
      }
    }

    setFilters(searchFilters as SearchFilters);
    loadData(searchFilters as SearchFilters, {});
  }, [loadData]);

  const validateYears = (currentFilters: SearchFilters) => {
    const yearfrom = parseInt(String(currentFilters.yearfrom));
    const yearTo = parseInt(String(currentFilters.yearTo));

    if (yearfrom && yearTo && yearfrom > yearTo) {
      setError(
        'Неможливо почати пошук - значення "від" не можуть бути більшими за "до"',
      );
      return false;
    } else {
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
    setFilters((prev) => {
      const next = {
        ...prev,
        [key]: value,
        ...(key === "brand" ? { model: "" } : {}),
      };
      if (key === "yearfrom" || key === "yearTo") validateYears(next);
      else if (error.includes("Неможливо почати пошук")) setError("");
      return next;
    });
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
      return;
    }
    loadData(filters, isCompareMode ? filters2 : {});
  };

  const resetAllFilters = () => {
    setFilters({});
    setFilters2({});
    setIsCompareMode(false);
    setError("");
    setData(null);
    setData2(null);
    setExcludeUSA(false);
  };

  const handleShare = () => {
    const currentUrl = new URL(window.location.href.split("?")[0]);
    const params = new URLSearchParams();

    if (filters.mileageFrom != null && filters.mileageTo != null) {
      params.set("mileageRange", `${filters.mileageFrom},${filters.mileageTo}`);
    }
    if (filters.engineFrom != null && filters.engineTo != null) {
      params.set("engineVolume", `${filters.engineFrom},${filters.engineTo}`);
    }

    // Add main filters
    // for (const key in filters) {
    //   if (
    //     filters[key] !== null &&
    //     filters[key] !== undefined &&
    //     filters[key] !== ""
    //   ) {
    //     if (Array.isArray(filters[key])) {
    //       params.append(key, filters[key].join(","));
    //     } else {
    //       params.append(key, String(filters[key]));
    //     }
    //   }
    // }

    // // Add compare filters if in compare mode
    // if (isCompareMode) {
    //   for (const key in filters2) {
    //     if (
    //       filters2[key] !== null &&
    //       filters2[key] !== undefined &&
    //       filters2[key] !== ""
    //     ) {
    //       if (Array.isArray(filters2[key])) {
    //         params.append(key, filters2[key].join(","));
    //       } else {
    //         params.append(key, String(filters2[key]));
    //       }
    //     }
    //   }
    // }

    // Add excludeUSA
    if (excludeUSA) {
      params.append("excludeUSA", "true");
    }

    currentUrl.search = params.toString();
    navigator.clipboard.writeText(currentUrl.toString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const [mileageDraft, setMileageDraft] = useState<RangeTuple>([
    filters.mileageFrom ?? 0,
    filters.mileageTo ?? 200000,
  ]);
  useEffect(() => {
    setMileageDraft([filters.mileageFrom ?? 0, filters.mileageTo ?? 200000]);
  }, [filters.mileageFrom, filters.mileageTo]);

  const [engineDraft, setEngineDraft] = useState<RangeTuple>([
    filters.engineFrom ?? 1,
    filters.engineTo ?? 4,
  ]);
  useEffect(() => {
    setEngineDraft([filters.engineFrom ?? 1, filters.engineTo ?? 4]);
  }, [filters.engineFrom, filters.engineTo]);

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
                Аналіз цін по роках
              </h1>
              <p className="text-slate-600 mt-1">
                Порівняй, як змінюється ціна на авто залежно від року випуску
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2 cursor-pointer"
              onClick={resetAllFilters}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Скинути</span>
            </Button>
            {/* <Button onClick={handleShare} className="w-36 cursor-pointer">
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
            </Button> */}
          </div>
        </motion.div>

        {/* Search Filters */}
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
                    <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 w-full">
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
                    <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 w-full">
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
                    value={String(filters.yearfrom) || ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearfrom", Number(value))
                    }
                  >
                    <SelectTrigger
                      className={`h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 ${error.includes("Неможливо почати пошук") ? "border-red-300" : ""} w-full`}
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
                    value={String(filters.yearTo) || ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearTo", Number(value))
                    }
                  >
                    <SelectTrigger
                      className={`h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 ${error.includes("Неможливо почати пошук") ? "border-red-300" : ""} w-full`}
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
                      className="text-slate-700 hover:bg-white/50 p-2 h-auto text-sm font-medium cursor-pointer"
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
                      className="cursor-pointer"
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
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

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Тип кузова */}
                                        <div className="space-y-2">
                                          <Label className="text-slate-700 font-medium">
                                            Тип кузова
                                          </Label>
                                          <Select
                                            value={filters.bodyType || ""}
                                            onValueChange={(value: string) =>
                                              handleFilterChange("bodyType", value)
                                            }
                                          >
                                            <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 w-full">
                                              <SelectValue placeholder="Оберіть тип" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="All">Всі типи</SelectItem>
                                              <SelectItem value="Седан">Седан</SelectItem>
                                              <SelectItem value="Кросовер">Кросовер</SelectItem>
                                              <SelectItem value="Купе">Купе</SelectItem>
                                              <SelectItem value="Універсал">Універсал</SelectItem>
                                              <SelectItem value="Хетчбек">Хетчбек</SelectItem>
                                              <SelectItem value="Мінівен">Мінівен</SelectItem>
                                              <SelectItem value="Ліфтбек">Ліфтбек</SelectItem>
                                              <SelectItem value="Мікроавтобус">Мікроавтобус</SelectItem>
                                              <SelectItem value="Пікап">Пікап</SelectItem>
                                              <SelectItem value="Кабріолет">Кабріолет</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>

                    {/* Тип пального */}
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Тип пального
                      </Label>
                      <Select
                        value={filters.fuel || ""}
                        onValueChange={(value: fuel) =>
                          handleFilterChange("fuel", value)
                        }
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 w-full">
                          <SelectValue placeholder="Оберіть тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Всі типи</SelectItem>
                          <SelectItem value="Бензин">Бензин</SelectItem>
                          <SelectItem value="Дизель">Дизель</SelectItem>
                          <SelectItem value="Гібрид">Гібрид</SelectItem>
                          <SelectItem value="Електро">Електро</SelectItem>
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
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 w-full">
                          <SelectValue placeholder="Оберіть тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Всі типи</SelectItem>
                          <SelectItem value="Ручна / Механіка">
                            Ручна / Механіка
                          </SelectItem>
                          <SelectItem value="Типтронік">Типтронік</SelectItem>
                          <SelectItem value="Автомат">Автомат</SelectItem>
                          <SelectItem value="Робот">Робот</SelectItem>
                          <SelectItem value="Варіатор">Варіатор</SelectItem>
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
                        <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 w-full">
                          <SelectValue placeholder="Оберіть тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Всі типи</SelectItem>
                          <SelectItem value="Передній">
                            Передній (FWD)
                          </SelectItem>
                          <SelectItem value="Задній">Задній (RWD)</SelectItem>
                          <SelectItem value="Повний">Повний (AWD)</SelectItem>
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
                        value={mileageDraft}
                        onChange={setMileageDraft}
                        onCommit={([min, max]: [number, number]) =>
                          setFilters((p) => ({
                            ...p,
                            mileageFrom: min,
                            mileageTo: max,
                          }))
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
                        value={engineDraft}
                        onChange={setEngineDraft}
                        onCommit={([min, max]: [number, number]) =>
                          setFilters((p) => ({
                            ...p,
                            engineFrom: min,
                            engineTo: max,
                          }))
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
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

        {data ? (
          <>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <YearlyMetricsCards
                averagePriceFrom1={data.averagePriceFrom}
                averagePriceTo1={data.averagePriceTo}
                quantity1={data.quantity}
                averagePriceFrom2={data2?.averagePriceFrom}
                averagePriceTo2={data2?.averagePriceTo}
                quantity2={data2?.quantity}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <YearlyPriceChart
                data={data.years}
                data2={data2?.years}
                filters={filters}
                filters2={filters2}
              />
            </motion.div>
          </>
        ) : (
          <Card className="h-72 flex flex-col justify-center items-center shadow-lg">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Почніть пошук, щоб переглянути дані.
            </h2></CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
