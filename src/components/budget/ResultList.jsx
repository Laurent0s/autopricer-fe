'use client'
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CarResultCard from "./CarResultCard";
import { ListFilter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ResultList({
  results,
  handleNext,
  handlePrevious,
  handleSpecific,
  handleModelsNumber,
  handleAnalysisSearch,
  limit,
  page,
  totalOffers
}) {
  const pagemax = Math.ceil(totalOffers / limit);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          Знайдено моделей:
          <span className="font-bold text-slate-800"> {totalOffers}</span>
        </p>
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-500" />
          <Label>Моделей на сторінці:</Label>
          <Select value={String(limit)} onValueChange={(value) => {handleModelsNumber(value)}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className="space-y-4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {results.map((car) => (
          <CarResultCard key={`${car.brand}-${car.model}-${car.bodyType}-${car.years}-${car.id}`} car={car} handleAnalysisSearch={handleAnalysisSearch}/>
        ))}
        <Pagination>
          <PaginationContent>
            {page > 2 ? (
              <>
                <PaginationItem onClick={handlePrevious}>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem
                  onClick={() => {
                    handleSpecific(1);
                  }}
                >
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem
                  onClick={() => {
                    handleSpecific(page - 1);
                  }}
                >
                  <PaginationLink href="#">{page - 1}</PaginationLink>
                </PaginationItem>
              </>
            ) : null}
            {page === 2 ? (
              <PaginationItem
                onClick={() => {
                  handleSpecific(1);
                }}
              >
                <PaginationLink href="#">{1}</PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
            {page === pagemax - 1 ? (
              <PaginationItem
                onClick={() => {
                  handleSpecific(pagemax);
                }}
              >
                <PaginationLink href="#">{pagemax}</PaginationLink>
              </PaginationItem>
            ) : null}
            {page < pagemax - 1 ? (
              <>
                <PaginationItem
                  onClick={() => {
                    handleSpecific(page + 1);
                  }}
                >
                  <PaginationLink href="#">{page + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem
                  onClick={() => {
                    handleSpecific(pagemax);
                  }}
                >
                  <PaginationLink href="#">{pagemax}</PaginationLink>
                </PaginationItem>
                <PaginationItem onClick={handleNext}>
                  <PaginationNext href="#" />
                </PaginationItem>
              </>
            ) : null}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
