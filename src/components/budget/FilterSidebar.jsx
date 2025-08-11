import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RangeSlider from "@/components/search/RangeSlider";
import { Search } from "lucide-react";

export default function FilterSidebar({CAR_DATA, filters, handleFilterChange, years, engineDraft, setEngineDraft, handleSearch, setPage, setFilters}) {
  return (
    <Card className="sticky top-24 shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg">Фільтри</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label className="text-slate-700 font-medium pb-2">Марка</Label>
          <Select
            value={filters.brand || ""}
            onValueChange={(value) =>
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
          <Label className="text-slate-700 font-medium pb-2">Модель</Label>
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
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-slate-700 font-medium pb-2">Рік від</Label>
                  <Select
                    value={filters?.yearfrom ? String(filters.yearfrom) : ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearfrom", Number(value))
                    }
                  >
                    <SelectTrigger
                      suppressHydrationWarning
                      className=" border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 w-full"
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
          
            <div className="flex-1">
              <Label className="text-slate-700 font-medium pb-2">Рік до</Label>
                  <Select
                    value={filters?.yearTo ? String(filters?.yearTo) : ""}
                    onValueChange={(value) =>
                      handleFilterChange("yearTo", Number(value))
                    }
                  >
                    <SelectTrigger
                      suppressHydrationWarning
                      className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 w-full"
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

          <Label className="text-slate-700 font-medium">
                      Тип пального
                    </Label>
                    <Select
                      value={filters?.fuel || ""}
                      onValueChange={(value) =>
                        handleFilterChange("fuel", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
                        <SelectItem value="All">Всі типи</SelectItem>
                        <SelectItem value="Бензин">Бензин</SelectItem>
                        <SelectItem value="Дизель">Дизель</SelectItem>
                        <SelectItem value="Гібрид">Гібрид</SelectItem>
                        <SelectItem value="Електро">Електро</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label className="text-slate-700 font-medium">
                      Тип трансмісії
                    </Label>
                    <Select
                      value={filters?.transmission || ""}
                      onValueChange={(value) =>
                        handleFilterChange("transmission", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
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

                    <Label className="text-slate-700 font-medium">
                      Тип приводу
                    </Label>
                    <Select
                      value={filters?.driveType || ""}
                      onValueChange={(value) =>
                        handleFilterChange("driveType", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full"
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

                    <Label className="text-slate-700 font-medium">
                      Тип кузова
                    </Label>
                    <Select
                      value={filters?.bodyType || ""}
                      onValueChange={(value) =>
                        handleFilterChange("bodyType", value)
                      }
                    >
                      <SelectTrigger
                        suppressHydrationWarning
                        className="h-11 border-slate-300 focus:border-emerald-500 w-full"
                      >
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent suppressHydrationWarning>
                        <SelectItem value="All">Всі типи</SelectItem>
                        <SelectItem value="Седан">Седан</SelectItem>
                        <SelectItem value="Кросовер">Кросовер</SelectItem>
                        <SelectItem value="Купе">Купе</SelectItem>
                        <SelectItem value="Універсал">Універсал</SelectItem>
                        <SelectItem value="Хетчбек">Хетчбек</SelectItem>
                        <SelectItem value="Мінівен">Мінівен</SelectItem>
                      </SelectContent>
                    </Select>

          <RangeSlider
                                label="Об'єм двигуна"
                                min={1.0}
                                max={6.0}
                                step={0.1}
                                value={engineDraft}
                                onChange={setEngineDraft}
                                onCommit={([min, max]) =>
                                  setFilters((p) => ({
                                    ...p,
                                    engineFrom: min,
                                    engineTo: max,
                                  }))
                                }
                                unit="л"
                              />
          <Button
                              suppressHydrationWarning
                              onClick={() => {
                                setPage(1);
                                handleSearch();
                              }}
                              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Search className="w-4 h-4 mr-2" />
                              Підібрати авто
                            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
