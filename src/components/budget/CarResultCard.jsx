'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, BarChart2 } from "lucide-react";

export default function CarResultCard({ car, handleAnalysisSearch }) {
  let years = [];
  let yearfrom = '';
  let yearTo = '';
  let fuel = '';
  let transmission = '';

  if(car.fuel.includes(',')) {
    fuel = car.fuel.split(',')[0];
  } else {
    fuel = car.fuel;
  }

  if(car.transmission.includes(',')) {
    transmission = car.transmission.split(',')[0];
  } else {
    transmission = car.transmission;
  }

  if(car.years.includes('-')) {
    years = car.years.split('-');
    yearfrom = years[0];
    yearTo = years[1];
  } else {
    yearfrom = years;
  }
  const carData = {
    brand: car.brand,
    model: car.model,
    yearfrom: yearfrom ?? null,
    yearTo: yearTo ?? null,
    bodyType: car.bodyType ?? null,
    fuel: fuel ?? null,
    transmission: transmission ?? null,
    driveType: car.driveType ?? null,
  };
  return (
    <Card className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 w-full p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-52">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="md:w-2/3 flex">
          <div className="p-5 flex-1">
            <h3 className="text-lg font-bold text-slate-800">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              {car.generation ? (
                <>
                  {car.generation} · {car.years}
                </>
              ) : (
                car.years
              )}
            </p>

            <div className="flex items-baseline gap-4 mb-4">
              <div>
                <span className="text-xs text-slate-500">середня</span>
                <p className="text-xl font-bold text-slate-700">
                  ${car.avgPrice.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500">медіана</span>
                <p className="text-xl font-bold text-slate-700">
                  ${car.medianPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => 
              handleAnalysisSearch(carData)
              }>
              <BarChart2 className="w-4 h-4 mr-2" />
              Аналіз цін
            </Button>
          </div>

          <div className="p-5 bg-slate-50/70 border-l w-56 text-xs text-slate-600 space-y-2 hidden sm:block">
            <p>
              <strong>Пропозицій на ринку:</strong> {car.listings}
            </p>
            <p>
              <strong>Двигун:</strong> {car.engine}
            </p>
            <p>
              <strong>КПП:</strong> {car.transmission}
            </p>
            <p>
              <strong>Пальне:</strong> {car.fuel}
            </p>
            <p>
              <strong>Привід:</strong> {car.drive}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
