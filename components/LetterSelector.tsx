
import React from 'react';
import type { LuckyLetter, LetterOption } from '../types';

interface LetterSelectorProps {
  selectedLetter: LuckyLetter;
  onLetterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: LetterOption[];
  disabled: boolean;
}

const LetterSelector: React.FC<LetterSelectorProps> = ({ selectedLetter, onLetterChange, options, disabled }) => {
  return (
    <div className="bg-white/10 p-6 rounded-xl border border-white/30 h-full">
      <label htmlFor="luckyLetter" className="block text-lg font-semibold mb-2 text-gray-100">2. Select a Lucky Letter</label>
      <p className="text-sm text-gray-300 mb-4">Each letter creates a unique Tet moment for your family.</p>
      <select 
        id="luckyLetter" 
        value={selectedLetter} 
        onChange={onLetterChange}
        className="w-full p-3 border rounded-lg border-yellow-400 bg-[#001f40]/50 text-white text-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffd700%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-6.5%200-12.3%203.2-16.1%208.1-3.8%204.9-4.7%2011-2.9%2016.5l133.7%20163.7c5.4%206.6%2015.6%206.6%2021%200l133.7-163.7c1.8-5.5.9-11.6-2.9-16.5z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7em top 50%', backgroundSize: '0.65em auto' }}
        disabled={disabled}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-[#001f40] text-white">
            {option.label}
          </option>
        ))}
      </select>
      <div className="mt-4 p-4 bg-black/20 rounded-lg min-h-[6rem]">
        <p className="font-semibold text-yellow-400">{options.find(o => o.value === selectedLetter)?.label}</p>
        <p className="text-gray-200">{options.find(o => o.value === selectedLetter)?.description}</p>
      </div>
    </div>
  );
};

export default LetterSelector;
