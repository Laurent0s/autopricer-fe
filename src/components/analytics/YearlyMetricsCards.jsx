import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function YearlyMetricsCards({
  averagePriceFrom1,
  averagePriceTo1,
  averagePriceFrom2,
  averagePriceTo2,
  quantity1,
  quantity2,
}) {
  console.log(averagePriceFrom1);
  const metrics = [
    {
      title: "Діапазон середніх цін",
      value: `$${averagePriceFrom1} - $${averagePriceTo1}`,
      value2:
        averagePriceFrom2 && averagePriceTo2
          ? `$${averagePriceFrom2} - $${averagePriceTo2}`
          : null,
      icon: ArrowRightLeft,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Загальна кількість оголошень",
      value: quantity1,
      value2: quantity2,
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
