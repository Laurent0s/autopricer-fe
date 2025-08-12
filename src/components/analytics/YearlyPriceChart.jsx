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
import { Calendar } from "lucide-react";

export default function YearlyPriceChart({ data, data2, filters, filters2 }) {
  const mergedData = useMemo(() => {
    if (!data) return [];

    const allData = {};

    data.forEach((item) => {
      allData[item.year] = {
        ...allData[item.year],
        year: item.year,
        price1: item.avg_price,
        listings1: item.listings,
      };
    });

    if (data2) {
      data2.forEach((item) => {
        allData[item.year] = {
          ...allData[item.year],
          year: item.year,
          price2: item.avg_price,
          listings2: item.listings,
        };
      });
    }

    return Object.values(allData).sort((a, b) => a.year - b.year);
  }, [data, data2]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
          <p className="font-semibold text-slate-800 mb-2">Рік: {label}</p>
          {payload[0] && payload[0].payload.price1 != null && (
            <div>
              <p style={{ color: payload[0].fill }} className="font-medium">
                {payload[0].name}: ${payload[0].value.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                Пропозицій: {payload[0].payload.listings1}
              </p>
            </div>
          )}
          {payload[1] && payload[1].payload.price2 != null && (
            <div className="mt-2">
              <p style={{ color: payload[1].fill }} className="font-medium">
                {payload[1].name}: ${payload[1].value.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                Пропозицій: {payload[1].payload.listings2}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl text-slate-800">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span>Порівняння цін по роках</span>
        </CardTitle>
        <p className="text-blue-700">{filters.brand} {filters.model}</p>
        {
          filters2.brand && filters2.model && (
            <p className="text-[#f43f5e]">{filters2.brand} {filters2.model}</p>
          )
        }
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={mergedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="price1"
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
                dataKey="price2"
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
      </CardContent>
    </Card>
  );
}
