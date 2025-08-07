import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Calendar,
  Fuel,
  Settings,
  Package,
  Gauge,
  Zap,
} from "lucide-react";

export default function SearchSummary({ filters, filters2 }) {
  const getFilterIcon = (key) => {
    const icons = {
      brand: Car,
      model: Settings,
      yearFrom: Calendar,
      yearTo: Calendar,
      engineType: Fuel,
      transmission: Settings,
      bodyType: Package,
      driveType: Settings,
      mileageRange: Gauge,
      engineVolume: Zap,
    };
    return icons[key] || Car;
  };

  const getFilterLabel = (key) => {
    const labels = {
      brand: "Марка",
      model: "Модель",
      yearFrom: "Рік від",
      yearTo: "Рік до",
      engineType: "Двигун",
      transmission: "КПП",
      bodyType: "Кузов",
      driveType: "Привід",
      mileageRange: "Пробіг",
      engineVolume: "Об'єм",
    };
    return labels[key] || key;
  };

  const formatFilterValue = (key, value) => {
    if (!value) return "";
    if (key === "mileageRange" && Array.isArray(value)) {
      return `${value[0].toLocaleString()} - ${value[1].toLocaleString()} км`;
    }
    if (key === "engineVolume" && Array.isArray(value)) {
      return `${value[0].toFixed(1)} - ${value[1].toFixed(1)} л`;
    }
    return value.toString();
  };

  const activeFilters = Object.entries(filters || {}).filter(([key, value]) => {
    if (!value) return false;
    if (key === "hide_badge") return false; // Ігноруємо технічні параметри
    if (Array.isArray(value)) {
      // Only show range filters if they differ from default range
      if (key === "mileageRange") return value[0] !== 0 || value[1] !== 500000;
      if (key === "engineVolume") return value[0] !== 1.0 || value[1] !== 6.0;
      return value.length > 0;
    }
    return true;
  });

  const activeFilters2 = Object.entries(filters2 || {}).filter(
    ([key, value]) => {
      if (!value) return false;
      if (key === "hide_badge") return false; // Ігноруємо технічні параметри
      if (Array.isArray(value)) {
        // Only show range filters if they differ from default range
        if (key === "mileageRange")
          return value[0] !== 0 || value[1] !== 500000;
        if (key === "engineVolume") return value[0] !== 1.0 || value[1] !== 6.0;
        return value.length > 0;
      }
      return true;
    },
  );

  if (activeFilters.length === 0 && activeFilters2.length === 0) {
    return null; // Не показуємо блок якщо немає активних фільтрів
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-600" />
          Параметри пошуку
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">АВТО 1</p>
            <div className="flex flex-wrap gap-3">
              {activeFilters.map(([key, value]) => {
                const Icon = getFilterIcon(key);
                const formattedValue = formatFilterValue(key, value);
                return (
                  <Badge
                    key={`filter1-${key}`}
                    variant="secondary"
                    className="px-4 py-2 bg-white/70 border border-blue-200 text-slate-700 hover:bg-white transition-colors"
                  >
                    <Icon className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      <span className="font-medium">
                        {getFilterLabel(key)}:
                      </span>{" "}
                      {formattedValue}
                    </span>
                  </Badge>
                );
              })}
            </div>
          </div>

          {filters2 && activeFilters2.length > 0 && (
            <div>
              <p className="text-xs text-rose-500 mb-2 font-medium">
                АВТО 2 (ПОРІВНЯННЯ)
              </p>
              <div className="flex flex-wrap gap-3">
                {activeFilters2.map(([key, value]) => {
                  const Icon = getFilterIcon(key);
                  const formattedValue = formatFilterValue(key, value);
                  return (
                    <Badge
                      key={`filter2-${key}`}
                      variant="secondary"
                      className="px-4 py-2 bg-rose-50 border border-rose-200 text-slate-700 hover:bg-white transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-2 text-rose-600" />
                      <span className="text-sm">
                        <span className="font-medium">
                          {getFilterLabel(key)}:
                        </span>{" "}
                        {formattedValue}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
