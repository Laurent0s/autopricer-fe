import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Fuel, Gauge, Settings, Wind, Leaf, Bolt, Zap } from "lucide-react";
import { motion } from "framer-motion";

const transmissionStats = [
  {
    label: "Автомат",
    count: "152,767",
    avgPrice: "18,780",
    color: "blue",
    icon: Settings,
  },
  {
    label: "Механіка",
    count: "157,027",
    avgPrice: "5,990",
    color: "slate",
    icon: Gauge,
  },
];

const fuelStats1 = [
  {
    label: "Бензин",
    count: "136,711",
    avgPrice: "12,070",
    color: "orange",
    icon: Fuel,
  },
  {
    label: "Дизель",
    count: "100,177",
    avgPrice: "14,260",
    color: "gray",
    icon: Wind,
  },
  {
    label: "Газ",
    count: "59,018",
    avgPrice: "6,460",
    color: "green",
    icon: Leaf,
  }
];

const fuelStats2 = [
  {
    label: "Гібрид",
    count: "6,301",
    avgPrice: "28,950",
    color: "teal",
    icon: Zap,
  },
  {
    label: "Електро",
    count: "15,985",
    avgPrice: "22,270",
    color: "purple",
    icon: Bolt,
  },
]

const colorClasses = {
  blue: { bg: "bg-blue-100", text: "text-blue-800", ring: "ring-blue-300" },
  slate: { bg: "bg-slate-100", text: "text-slate-800", ring: "ring-slate-300" },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    ring: "ring-orange-300",
  },
  gray: { bg: "bg-gray-100", text: "text-gray-800", ring: "ring-gray-300" },
  green: { bg: "bg-green-100", text: "text-green-800", ring: "ring-green-300" },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    ring: "ring-purple-300",
  },
  teal: { bg: "bg-teal-100", text: "text-teal-800", ring: "ring-teal-300" },
};

export default function MarketStats() {
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Transmission stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transmissionStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`p-6 rounded-2xl ring-2 ${colorClasses[stat.color].bg} ${colorClasses[stat.color].ring} ${colorClasses[stat.color].text}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <stat.icon className="w-6 h-6" />
                  <p className="font-bold text-lg">{stat.label}</p>
                </div>
                <p className="text-3xl font-extrabold">{stat.count} авто</p>
                <p className="text-sm opacity-90 mt-1">
                  сер. ціна ${stat.avgPrice}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fuel stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {fuelStats1.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`flex flex-col flex-1 p-4 rounded-xl ring-1 ring-inset ${colorClasses[stat.color].bg} ${colorClasses[stat.color].ring} ${colorClasses[stat.color].text}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4" />
                    <p className="font-semibold text-sm">{stat.label}</p>
                  </div>
                  <p className="text-lg font-bold">{stat.count}</p>
                  <p className="text-xs opacity-80">сер. ${stat.avgPrice}</p>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-6 gap-5">
            {fuelStats2.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              viewport={{ once: true }}
              style={{display: 'grid', flexDirection: 'column', flexGrow: '1', gridColumn: index == 0 ? "2/4" : "4/6" }}
            >
              <div
                className={`grid col-span-2 grow p-4 rounded-xl ring-1 ring-inset ${colorClasses[stat.color].bg} ${colorClasses[stat.color].ring} ${colorClasses[stat.color].text}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-4 h-4" />
                  <p className="font-semibold text-sm">{stat.label}</p>
                </div>
                <p className="text-lg font-bold">{stat.count}</p>
                <p className="text-xs opacity-80">сер. ${stat.avgPrice}</p>
              </div>
            </motion.div>
          ))}
          </div> 
      </CardContent>
    </Card>
  );
}
