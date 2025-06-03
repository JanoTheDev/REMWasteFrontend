import { useState } from "react";
import { SkipData } from "../types/skip";
import {
  calculateFinalPrice,
  formatHirePeriod,
} from "../utils/priceCalculations";
import { AlertTriangle, XCircle, Ban, Check, ArrowRight } from "lucide-react";

interface SkipSizeCardProps {
  skip: SkipData;
  isSelected: boolean;
  onSelect: () => void;
  onUnselect: () => void;
}

const SkipSizeCard = ({
  skip,
  isSelected,
  onSelect,
  onUnselect,
}: SkipSizeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const finalPrice = calculateFinalPrice(skip);
  const hirePeriod = formatHirePeriod(skip.hire_period_days);

  const handleClick = () => {
    if (isSelected) {
      onUnselect();
    } else {
      onSelect();
    }
  };

  return (
    <div
      className={`
        relative bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group lg:h-[375px] flex flex-col
        ${
          isSelected
            ? "ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20 scale-102 sm:scale-105"
            : "hover:scale-102 sm:hover:scale-105 hover:shadow-xl hover:shadow-gray-900/50"
        }
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 z-10" />

      {/* Yards badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
        <div className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
          {skip.size} Yards
        </div>
      </div>

      {/* Restriction warnings */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex flex-col gap-1">
        {!skip.allowed_on_road && (
          <div className="bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap w-min">
            <span>
              <AlertTriangle className="inline-block" size={14} />
            </span>
            <span className="hidden sm:inline">Not Allowed On The Road</span>
          </div>
        )}
        {skip.forbidden && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap w-min">
            <span className="hidden sm:inline">Forbidden</span>
            <span className="sm:hidden">
              <XCircle className="inline-block" size={14} />
            </span>
          </div>
        )}
        {!skip.allows_heavy_waste && (
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap w-min">
            <span className="hidden sm:inline">No Heavy Waste</span>
            <span className="sm:hidden">
              <Ban className="inline-block" size={14} />
            </span>
          </div>
        )}
      </div>

      {/* Skip image - full width */}
      <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
        <img
          src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`}
          alt={`${skip.size} yard skip`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 p-3 sm:p-4 lg:p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1">
            {skip.size} Yard Skip
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
            {hirePeriod}
          </p>

          {/* Additional info for larger skips */}
          {(skip.transport_cost || skip.per_tonne_cost) && (
            <div className="hidden sm:block text-xs text-gray-400 mb-2">
              <div className="flex justify-between gap-4">
                {skip.transport_cost && (
                  <div>Transport: £{skip.transport_cost}</div>
                )}
                {skip.per_tonne_cost && (
                  <div>Per tonne: £{skip.per_tonne_cost}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mt-auto">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">
            £{finalPrice}
          </div>

          <button
            className={`
              px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base
              ${
                isSelected
                  ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white hover:shadow-lg"
              }
            `}
          >
            <span className="hidden sm:inline">
              {isSelected ? "Selected" : "Select"}
            </span>
            <span className="sm:hidden">
              {isSelected ? "Selected" : "Select"}
            </span>
            <span
              className={`transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            >
              {isSelected ? <Check size={14} /> : <ArrowRight size={14} />}
            </span>
          </button>
        </div>
      </div>

      {/* Selection glow effect */}
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
      )}
    </div>
  );
};

export default SkipSizeCard;
