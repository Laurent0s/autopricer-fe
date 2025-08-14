"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import RangeSlider from "@/components/search/RangeSlider";
import FilterSidebar from "@/components/budget/FilterSidebar";
import ResultList from "@/components/budget/ResultList";
import { useAppDispatch } from "@/store/hooks";
import { fetchBudget, PriceBudgetsCar } from "@/store/slices/PriceBudgetSlice";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import CAR_DATA from "../../../public/data/cars.json";

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
  price: number;
  page: number;
  limit: number;
  brand: keyof typeof CAR_DATA | null;
  model: string;
  ifusa: boolean;
  yearfrom: number | null;
  yearTo: number | null;
  bodyType: string | null;
  fuel: string | null;
  transmission: string | null;
  driveType: string | null;
  mileageFrom: number | null;
  mileageTo: number | null;
  engineFrom: number | null;
  engineTo: number | null;
};

export type SearchFilters = Partial<SearchFilterMap>;

type SearchFilterKey = keyof SearchFilterMap;

export default function BudgetFinderPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [excludeUSA, setExcludeUSA] = useState(false);
  const [results, setResults] = useState<PriceBudgetsCar[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalOffers, setTotalOffers] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [error, setError] = useState("");
  const [found, setFound] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleSearch = (pageArg?: number, clicked?: boolean) => {
    setError("");
    setResults([])
    if(!filters.price && clicked) {
      setError('Будь ласка оберіть ваш бюджет');
      return null;
    }
    if(!pageArg) {
      setPage(1);
    } else {
      loadData(pageArg);
    }
  };

  const loadData = useCallback(async (pageArg?: number) => {
    setIsSearching(true);
    setError("");
    setFound((prev) => prev + 1);
    const data = await dispatch(
      fetchBudget({
        price: filters?.price ?? 0,
        page: pageArg ?? page,
        limit: limit,
        brand: filters?.brand ?? null,
        model: filters?.model ?? null,
        ifusa: excludeUSA,
        yearfrom: filters?.yearfrom ?? null,
        yearTo: filters?.yearTo ?? null,
        bodyType: filters?.bodyType === "All" ? null : (filters?.bodyType ?? null),
        fuel: filters?.fuel === "All" ? null : (filters?.fuel ?? null),
        transmission: filters?.transmission === "All"
              ? null
              : (filters?.transmission ?? null),
        driveType: filters?.driveType === "All"
              ? null
              : (filters?.driveType ?? null),
        mileageFrom: filters?.mileageFrom ?? null,
        mileageTo: filters?.mileageTo ?? null,
        engineFrom: filters?.engineFrom ?? null,
        engineTo: filters?.engineTo ?? null,
      }),
    ).unwrap();
    setIsSearching(false);
    setResults(data.data);
    setTotalOffers(Number(data.totalOffers));
  }, [dispatch,filters, page, limit]);

  useEffect(() => {
    handleSearch(page);
  }, [page, limit]);

  const [mileageDraft, setMileageDraft] = useState<RangeTuple>([
    filters?.mileageFrom ?? 0,
    filters?.mileageTo ?? 200000,
  ]);
  useEffect(() => {
    setMileageDraft([filters?.mileageFrom ?? 0, filters?.mileageTo ?? 200000]);
  }, [filters?.mileageFrom, filters?.mileageTo]);

  const [engineDraft, setEngineDraft] = useState<RangeTuple>([
    filters?.engineFrom ?? 1,
    filters?.engineTo ?? 4,
  ]);
  useEffect(() => {
    setEngineDraft([filters?.engineFrom ?? 1, filters?.engineTo ?? 4]);
  }, [filters?.engineFrom, filters?.engineTo]);

  const handleNext = () => {
    setPage((p) => p + 1);
  };

  const handlePrevious = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleSpecific = (page: number) => {
    setPage(page);
  };

  const handleModelsNumber = (value: string) => {
    setPage(1);
    setLimit(Number(value));
  }

  const handleAnalysisSearch = (Filters: SearchFilters) => {
    const params = new URLSearchParams();
    Object.entries(Filters).forEach(([k, v]) => {
      if (v && v !== "") {
        if (Array.isArray(v)) {
          params.set(k, v.join(","));
        } else {
          params.set(k, String(v));
        }
      }
    });
    // This only updates the URL for the main filters, not for compare mode filters

    router.push(`/PriceAnalysis?${params.toString()}`);
  }

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

            {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                    suppressHydrationWarning
                    id="budget-input"
                    type="number"
                    placeholder="Наприклад, 15000"
                    value={filters?.price || ""}
                    onChange={(e) =>
                      handleFilterChange("price", Number(e.target.value))
                    }
                    className="h-12 pl-10 text-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    step="500"
                  />
                </div>
              </div>
              {/* Рік від */}
              <div className="space-y-2 h-full">
                <Label className="text-slate-700 font-medium">Рік від</Label>
                <Select
                  value={filters?.yearfrom ? String(filters.yearfrom) : ""}
                  onValueChange={(value) =>
                    handleFilterChange("yearfrom", Number(value))
                  }
                >
                  <SelectTrigger
                    suppressHydrationWarning
                    className=" border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 w-full cursor-pointer"
                  >
                    <SelectValue placeholder="Від року" />
                  </SelectTrigger>
                  <SelectContent suppressHydrationWarning>
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
                  value={filters?.yearTo ? String(filters?.yearTo) : ""}
                  onValueChange={(value) =>
                    handleFilterChange("yearTo", Number(value))
                  }
                >
                  <SelectTrigger
                    suppressHydrationWarning
                    className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 w-full cursor-pointer"
                  >
                    <SelectValue placeholder="До року" />
                  </SelectTrigger>
                  <SelectContent suppressHydrationWarning>
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
                    suppressHydrationWarning
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
                    className="text-sm text-slate-700 flex items-center"
                  >
                    🇺🇸 Прибрати авто з США
                  </Label>
                </div>
                {!showAdvanced && (
                  <Button
                    suppressHydrationWarning
                    onClick={() => {
                      handleSearch(1, true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  {/* Тип кузова */}
                                      <div className="space-y-2">
                                        <Label className="text-slate-700 font-medium">
                                          Тип кузова
                                        </Label>
                                        <Select
                                          value={filters?.bodyType || ""}
                                          onValueChange={(value: string) =>
                                            handleFilterChange("bodyType", value)
                                          }
                                        >
                                          <SelectTrigger className="h-11 border-slate-300 focus:border-blue-500 w-full cursor-pointer">
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
                      value={filters?.fuel || ""}
                      onValueChange={(value: engineType) =>
                        handleFilterChange("fuel", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
                        <SelectItem value="All">Всі типи</SelectItem>
                        <SelectItem value="Газ">Газ</SelectItem>
                        <SelectItem value="Газ метан / Бензин">Газ метан / Бензин</SelectItem>
                        <SelectItem value="Газ пропан-бутан / Бензин">Газ пропан-бутан / Бензин</SelectItem>
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
                      value={filters?.transmission || ""}
                      onValueChange={(value: transmissionType) =>
                        handleFilterChange("transmission", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
                        <SelectItem value="All">Всі типи</SelectItem>
                        <SelectItem value="Автомат">Автомат</SelectItem>
                        <SelectItem value="Ручна / Механіка">
                          Ручна / Механіка
                        </SelectItem>
                        <SelectItem value="Типтронік">Типтронік</SelectItem>
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
                      value={filters?.driveType || ""}
                      onValueChange={(value: driveType) =>
                        handleFilterChange("driveType", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
                        <SelectItem value="All">Всі типи</SelectItem>
                        <SelectItem value="Передній">Передній (FWD)</SelectItem>
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
                    suppressHydrationWarning
                    onClick={() => {
                      handleSearch(1, true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
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
              <FilterSidebar CAR_DATA={CAR_DATA} filters={filters} handleFilterChange={handleFilterChange} years={years} engineDraft={engineDraft} setEngineDraft={setEngineDraft} handleSearch={handleSearch} setPage={setPage} setFilters={setFilters}/>
            </div>
            <div className="lg:col-span-3">
              <ResultList
                results={results}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleSpecific={handleSpecific}
                handleModelsNumber={handleModelsNumber}
                handleAnalysisSearch={handleAnalysisSearch}
                limit={limit}
                page={page}
                totalOffers={totalOffers}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
