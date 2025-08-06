import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ResponsiveContainer, Treemap } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Інші", size: 20.8, color: "#E2E8F0" },
  { name: "Volkswagen", size: 10.3, color: "#1E40AF" },
  { name: "Audi", size: 5.2, color: "#1D4ED8" },
  { name: "Mercedes-Benz", size: 5.2, color: "#1D4ED8" },
  { name: "BMW", size: 5.2, color: "#1D4ED8" },
  { name: "Renault", size: 5.0, color: "#2563EB" },
  { name: "ВАЗ", size: 4.9, color: "#3B82F6" },
  { name: "Ford", size: 4.8, color: "#60A5FA" },
  { name: "Opel", size: 3.9, color: "#93C5FD" },
  { name: "Nissan", size: 3.9, color: "#93C5FD" },
  { name: "Skoda", size: 3.9, color: "#93C5FD" },
  { name: "Toyota", size: 3.4, color: "#BFDBFE" },
  { name: "Hyundai", size: 3.1, color: "#1E3A8A" },
  { name: "Kia", size: 2.3, color: "#1E293B" },
  { name: "Mazda", size: 2.3, color: "#1E293B" },
  { name: "Chevrolet", size: 2.1, color: "#334155" },
  { name: "Peugeot", size: 2.0, color: "#475569" },
  { name: "Honda", size: 1.9, color: "#64748B" },
  { name: "Mitsubishi", size: 1.9, color: "#64748B" },
  { name: "Daewoo", size: 1.8, color: "#94A3B8" },
  { name: "Tesla", size: 1.4, color: "#CBD5E1" },
  { name: "Citroen", size: 1.2, color: "#E2E8F0" },
  { name: "ЗАЗ", size: 1.2, color: "#E2E8F0" },
  { name: "Volvo", size: 1.1, color: "#F1F5F9" },
  { name: "Jeep", size: 1.1, color: "#F1F5F9" },
];

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  colors,
  name,
  value,
}) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? data[index].color : "none",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && width > 60 && height > 40 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          className="text-sm font-semibold"
        >
          {name}
        </text>
      ) : null}
      {depth === 1 && width > 60 && height > 40 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 18}
          textAnchor="middle"
          fill="#fff"
          className="text-lg font-bold"
        >
          {value}%
        </text>
      ) : null}
    </g>
  );
};

export default function BrandMarketShare() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">
          Частка брендів за кількістю пропозиції на ринку
        </CardTitle>
        <CardDescription>Вся Україна. Вживані авто</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <Treemap
              data={data}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
              content={
                <CustomizedContent
                  colors={[
                    "#8889DD",
                    "#9597E4",
                    "#8DC77B",
                    "#A5D297",
                    "#E2CF45",
                    "#F8C12D",
                  ]}
                />
              }
            />
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
