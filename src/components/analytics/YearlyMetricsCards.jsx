import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function YearlyMetricsCards({ data, data2 }) {
  const metricsData = useMemo(() => {
    let priceRange1 = { min: Infinity, max: -Infinity };
    let totalListings1 = 0;

    if (data) {
      data.forEach((item) => {
        if (item.avg_price < priceRange1.min) priceRange1.min = item.avg_price;
        if (item.avg_price > priceRange1.max) priceRange1.max = item.avg_price;
        totalListings1 += item.listings;
      });
    }

    let priceRange2 = null;
    let totalListings2 = null;

    if (data2) {
      priceRange2 = { min: Infinity, max: -Infinity };
      totalListings2 = 0;
      data2.forEach((item) => {
        if (item.avg_price < priceRange2.min) priceRange2.min = item.avg_price;
        if (item.avg_price > priceRange2.max) priceRange2.max = item.avg_price;
        totalListings2 += item.listings;
      });
    }

    return { priceRange1, totalListings1, priceRange2, totalListings2 };
  }, [data, data2]);

  const { priceRange1, totalListings1, priceRange2, totalListings2 } =
    metricsData;

  const metrics = [
    {
      title: "Діапазон середніх цін",
      value: `$${priceRange1.min === Infinity ? "0" : priceRange1.min.toLocaleString()} - $${priceRange1.max === -Infinity ? "0" : priceRange1.max.toLocaleString()}`,
      value2:
        priceRange2 && priceRange2.min !== Infinity
          ? `$${priceRange2.min.toLocaleString()} - $${priceRange2.max.toLocaleString()}`
          : null,
      icon: ArrowRightLeft,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Загальна кількість оголошень",
      value: totalListings1.toLocaleString(),
      value2: totalListings2 != null ? totalListings2.toLocaleString() : null,
      icon: FileText,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}
                >
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-slate-600 text-sm font-medium">
                  {metric.title}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-slate-800">
                  {metric.value}
                </p>
                {metric.value2 && (
                  <p className="text-xl md:text-2xl font-bold text-rose-500">
                    {metric.value2}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
