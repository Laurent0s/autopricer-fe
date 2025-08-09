import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  onCommit,
  formatValue = (v) => v.toLocaleString(),
  unit = "",
}) {
  const [localValue, setLocalValue] = React.useState(value ?? [min, max]);

  React.useEffect(() => {
    if (Array.isArray(value)) setLocalValue(value);
  }, [value]);

  const handleSliderChange = (v) => {
    setLocalValue(v);
    onChange?.(v);
  };

  const handleSliderCommit = (v) => {
    setLocalValue(v);
    onCommit?.(v);
  };

  const handleInputChange = (index, inputValue) => {
    const num = parseFloat(inputValue);
    const fallback = index === 0 ? min : max;
    const clamped = Math.max(min, Math.min(max, isNaN(num) ? fallback : num));
    const next = [...localValue];
    next[index] = clamped;
    setLocalValue(next);
    onChange?.(next);
  };

  const commitFromInputs = () => onCommit?.(localValue);
  const commitOnEnter = (e) => {
    if (e.key === "Enter") onCommit?.(localValue);
  };

  return (
    <div className="space-y-4">
      <Label className="text-slate-700 font-medium text-sm">{label}</Label>

      <div className="px-3">
        <Slider
          value={localValue}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
          max={max}
          min={min}
          step={step}
          className="w-full"
          onPointerUp={() => onCommit?.(localValue)}
          onTouchEnd={() => onCommit?.(localValue)}
        />
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <Label className="text-xs text-slate-500 mb-1 block">Від</Label>
          <div className="relative">
            <Input
              type="number"
              value={localValue[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              onBlur={commitFromInputs}
              onKeyDown={commitOnEnter}
              className="h-9 text-sm pr-8"
              min={min}
              max={max}
              step={step}
            />
            {unit && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                {unit}
              </span>
            )}
          </div>
        </div>

        <div className="text-slate-400 mt-5 text-sm">—</div>

        <div className="flex-1">
          <Label className="text-xs text-slate-500 mb-1 block">До</Label>
          <div className="relative">
            <Input
              type="number"
              value={localValue[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              onBlur={commitFromInputs}
              onKeyDown={commitOnEnter}
              className="h-9 text-sm pr-8"
              min={min}
              max={max}
              step={step}
            />
            {unit && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                {unit}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
