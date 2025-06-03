import { useState, useEffect } from 'react';
import SkipSizeCard from './SkipSizeCard';
import ProgressIndicator from './ProgressIndicator';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import SearchAndFilters from './SearchAndFilters';
import { useSkipData } from '../hooks/useSkipData';
import { calculateFinalPrice, formatHirePeriod } from '../utils/priceCalculations';
import { Lightbulb, ArrowRight, XCircle, Ban, AlertTriangle } from 'lucide-react';

const SkipHireSelection = () => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAllowedOnRoad, setFilterAllowedOnRoad] = useState(false);
  const [filterAllowsHeavyWaste, setFilterAllowsHeavyWaste] = useState(false);
  
  const apiUrl = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"; 
  const { skipData, loading, error } = useSkipData(apiUrl);

  const steps = [
    { name: 'Postcode', completed: true, current: false },
    { name: 'Waste Type', completed: true, current: false },
    { name: 'Select Skip', completed: false, current: true },
    { name: 'Permit Check', completed: false, current: false },
    { name: 'Choose Date', completed: false, current: false },
    { name: 'Payment', completed: false, current: false },
  ];

  const selectedSkip = selectedSkipId ? skipData.find(skip => skip.id === selectedSkipId) : null;

  const handleSkipSelect = (skipId: number) => {
    setSelectedSkipId(skipId);
  };

  const handleSkipUnselect = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSkipId(null);
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  // Fallback data for when API URL is not provided
  const fallbackData = [
    { id: 1, size: 4, hire_period_days: 14, price_before_vat: 211, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 2, size: 6, hire_period_days: 14, price_before_vat: 264, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 3, size: 8, hire_period_days: 14, price_before_vat: 295, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 4, size: 10, hire_period_days: 14, price_before_vat: 336, vat: 20, allowed_on_road: false, allows_heavy_waste: false },
    { id: 5, size: 12, hire_period_days: 14, price_before_vat: 390, vat: 20, allowed_on_road: false, allows_heavy_waste: false },
  ].map(item => ({
    ...item,
    transport_cost: null,
    per_tonne_cost: null,
    postcode: "",
    area: "",
    forbidden: false,
    created_at: "",
    updated_at: "",
  }));

  const displayData = skipData.length > 0 ? skipData : fallbackData;

  // Filter skips based on search term and filters
  const filteredSkips = displayData.filter(skip => {
    const matchesSearch = skip.size.toString().includes(searchTerm);
    const matchesAllowedOnRoad = !filterAllowedOnRoad || skip.allowed_on_road;
    const matchesAllowsHeavyWaste = !filterAllowsHeavyWaste || skip.allows_heavy_waste;
    return matchesSearch && matchesAllowedOnRoad && matchesAllowsHeavyWaste;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32">
        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Select the skip size that best suits your needs. All prices include delivery, collection, and disposal.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterAllowedOnRoad={filterAllowedOnRoad}
          onAllowedOnRoadChange={setFilterAllowedOnRoad}
          filterAllowsHeavyWaste={filterAllowsHeavyWaste}
          onAllowsHeavyWasteChange={setFilterAllowsHeavyWaste}
        />

        {/* Content */}
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {!loading && !error && (
          <>
            {/* Skip Options Grid - 2 columns on mobile, responsive grid on larger screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {filteredSkips.map((skip) => (
                <div key={skip.id} className="animate-fade-in">
                  <SkipSizeCard
                    skip={skip}
                    isSelected={selectedSkipId === skip.id}
                    onSelect={() => handleSkipSelect(skip.id)}
                    onUnselect={handleSkipUnselect}
                  />
                </div>
              ))}
            </div>

            {/* Mobile-only restriction legend */}
            <div className="block sm:hidden mt-2 mb-4 px-2">
              <div className="flex flex-wrap gap-2 items-center text-xs text-gray-300 justify-center">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="inline-block" size={14} />
                  <span>Not Allowed On The Road</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="inline-block" size={14} />
                  <span>Forbidden</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ban className="inline-block" size={14} />
                  <span>No Heavy Waste</span>
                </div>
              </div>
            </div>

            {/* API Status Indicator */}
            {!apiUrl && (
              <div className="text-center text-amber-400 text-sm mb-6 max-w-4xl mx-auto flex items-center justify-center gap-2">
                <Lightbulb className="inline-block" size={18} />
                <span>Using fallback data. Add your API URL to fetch real-time skip data.</span>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-center text-gray-400 text-xs sm:text-sm mb-8 max-w-4xl mx-auto px-4">
              Imagery and information shown throughout this website may not reflect the exact shape or size specification, 
              colours may vary. Options and/or accessories may be featured at additional cost.
            </div>
          </>
        )}
      </div>

      {/* Floating Bottom Navigation */}
      {(selectedSkip || isClosing) && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>
          <div className="bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Selected Skip Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <div className="text-sm sm:text-lg font-semibold text-blue-400">
                  {selectedSkip?.size} Yard Skip
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white">
                  £{calculateFinalPrice(selectedSkip!)}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">
                  {selectedSkip?.hire_period_days ? formatHirePeriod(selectedSkip.hire_period_days) : ''}
                </div>
                <div className="flex gap-4 text-gray-400 text-xs">
                  {selectedSkip?.transport_cost && (
                    <div>Transport: £{selectedSkip.transport_cost}</div>
                  )}
                  {selectedSkip?.per_tonne_cost && (
                    <div>Per tonne: £{selectedSkip.per_tonne_cost}</div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-blue-500/30">
                  Continue
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipHireSelection;
