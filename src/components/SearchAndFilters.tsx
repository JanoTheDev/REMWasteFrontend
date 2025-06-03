import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterAllowedOnRoad: boolean;
  onAllowedOnRoadChange: (checked: boolean) => void;
  filterAllowsHeavyWaste: boolean;
  onAllowsHeavyWasteChange: (checked: boolean) => void;
}

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  filterAllowedOnRoad,
  onAllowedOnRoadChange,
  filterAllowsHeavyWaste,
  onAllowsHeavyWasteChange,
}: SearchAndFiltersProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
      <div className="relative w-full sm:w-80 lg:w-96">
        <Input
          type="text"
          placeholder="Search by size..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
      </div>
      
      <div className="flex gap-6">
        <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors duration-200">
          <Checkbox
            checked={filterAllowedOnRoad}
            onCheckedChange={(checked) => onAllowedOnRoadChange(checked as boolean)}
            className="h-4 w-4 border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <span className="select-none">Allowed On Road</span>
        </label>
        
        <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors duration-200">
          <Checkbox
            checked={filterAllowsHeavyWaste}
            onCheckedChange={(checked) => onAllowsHeavyWasteChange(checked as boolean)}
            className="h-4 w-4 border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <span className="select-none">Allows Heavy Waste</span>
        </label>
      </div>
    </div>
  );
};

export default SearchAndFilters; 