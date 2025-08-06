import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  BarChart,
  ArrowRightLeft,
  FileText,
  TrendingUp,
  TrendingDown,
  Info,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const tooltips = {
  "Середня ціна":
    "Це середнє арифметичне: всі ціни додаються і діляться на кількість авто. Може спотворювати реальну картину, якщо серед оголошень є дуже дешеві чи дуже дорогі варіанти.",
  "Медіанна ціна":
    "Це ціна, яка стоїть посередині серед усіх оголошень. Половина авто коштує стільки ж або більше, половина — стільки ж або менше. Краще відображає реальну ціну, якщо у вибірці оголошень є дуже дешеві чи дуже дорогі варіанти.",
};

export default function MetricsCards({ data, data2 }) {
  const [showTooltip, setShowTooltip] = React.useState(null);

  const metrics = [
    {
      title: "Середня ціна",
      value: `$${data.averagePrice?.toLocaleString() || "0"}`,
      value2: data2 ? `$${data2.averagePrice?.toLocaleString() || "0"}` : null,
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Медіанна ціна",
      value: `$${data.medianPrice?.toLocaleString("de-DE") || "0"}`,
      value2: data2
        ? `$${data2.medianPrice?.toLocaleString("de-DE") || "0"}`
        : null,
      icon: BarChart,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Діапазон цін",
      value: `$${data.minPrice?.toLocaleString() || "0"} - $${data.maxPrice?.toLocaleString() || "0"}`,
      value2: data2
        ? `$${data2.minPrice?.toLocaleString() || "0"} - $${data2.maxPrice?.toLocaleString() || "0"}`
        : null,
      icon: ArrowRightLeft,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Кількість оголошень",
      value: data.totalListings?.toLocaleString() || "0",
      value2: data2 ? data2.totalListings?.toLocaleString() || "0" : null,
      icon: FileText,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex items-center space-x-2">
                  <p className="text-slate-600 text-sm font-medium">
                    {metric.title}
                  </p>
                  {tooltips[metric.title] && (
                    <div className="relative">
                      <Info
                        className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                        onMouseEnter={() => setShowTooltip(metric.title)}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === metric.title && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-4 bg-slate-800 text-white text-sm rounded-lg shadow-xl z-50">
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                          {tooltips[metric.title]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
