import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

export default function PriceDistributionChart({
  data,
  data2,
  filters,
  filters2,
}) {
  const processedData = useMemo(() => {
    if (!data) return [];

    const STEP = 500;
    const allRanges = {};

    const processSingleData = (d, keySuffix) => {
      if (!d || !d.priceDistribution) return;
      Object.entries(d.priceDistribution).forEach(([range, count]) => {
        const [startStr] = range.split("-");
        const startPrice = parseInt(startStr);
        const bucketStart = Math.floor(startPrice / STEP) * STEP;
        const bucketKey = `${bucketStart}-${bucketStart + STEP - 1}`;

        if (!allRanges[bucketKey]) {
          allRanges[bucketKey] = {
            range: bucketKey,
            count1: 0,
            ...(data2 && { count2: 0 }),
          };
        }
        allRanges[bucketKey][`count${keySuffix}`] =
          (allRanges[bucketKey][`count${keySuffix}`] || 0) + count;
      });
    };

    processSingleData(data, "1");
    if (data2) {
      processSingleData(data2, "2");
    }

    // Get keys, filter for non-empty ones, then sort numerically.
    const sortedRanges = Object.keys(allRanges)
      .filter((key) => {
        const rangeData = allRanges[key];
        const count1 = rangeData.count1 || 0;
        const count2 = data2 ? rangeData.count2 || 0 : 0;
        return count1 > 0 || count2 > 0;
      })
      .sort((a, b) => {
        const startA = parseInt(a.split("-")[0]);
        const startB = parseInt(b.split("-")[0]);
        return startA - startB;
      });

    if (sortedRanges.length === 0) return [];

    const chartDataPoints = sortedRanges.map((bucketKey) => {
      const rangeData = allRanges[bucketKey];
      const [startPriceStr] = bucketKey.split("-");
      const startPrice = parseInt(startPriceStr);

      return {
        displayRange: `$${startPrice.toLocaleString()}`,
        tooltipRange: `$${startPrice.toLocaleString()} - $${(startPrice + STEP - 1).toLocaleString()}`,
        count1: rangeData.count1 || 0,
        ...(data2 && { count2: rangeData.count2 || 0 }),
      };
    });

    return chartDataPoints;
  }, [data, data2]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
          <p className="font-semibold text-slate-800 mb-2">
            Діапазон: {dataPoint.tooltipRange || label}
          </p>
          {payload.map((p) => (
            <p
              key={p.dataKey}
              style={{ color: p.color }}
              className="font-medium"
            >
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-start space-x-2 text-xl text-slate-800">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span>Розподіл цін за кількістю пропозицій</span>
            <p className="text-blue-700 text-lg">{filters.brand} {filters.model}</p>
          {
            filters2.brand && filters2.model && (
              <p className="text-[#f43f5e] text-lg">{filters2.brand} {filters2.model}</p>
            )
          }
        </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto pb-4">
          <ResponsiveContainer
            width={Math.max(800, processedData.length * (data2 ? 60 : 40))}
            height={400}
          >
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="displayRange"
                stroke="#64748b"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={"preserveStartEnd"}
              />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count1"
                name={
                  filters && filters.brand && filters.model
                    ? `${filters.brand} ${filters.model}`
                    : "Авто 1"
                }
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              {data2 && filters2 && (
                <Bar
                  dataKey="count2"
                  name={
                    filters2.brand && filters2.model
                      ? `${filters2.brand} ${filters2.model}`
                      : "Авто 2"
                  }
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-xl">
          <h4 className="font-semibold text-slate-800 mb-2">
            Як читати графік:
          </h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Вісь X показує цінові діапазони з пропозиціями</li>
            <li>
              • Вісь Y показує кількість доступних автомобілів у кожному
              діапазоні
            </li>
            <li>• Наведіть курсор на стовпчик для детальної інформації</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
