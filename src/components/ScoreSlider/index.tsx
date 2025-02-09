import React from 'react';

type ScoreSliderProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const ScoreSlider = ({ value, onChange, className = '' }: ScoreSliderProps) => {
  // Convert -1 to 1 range to 0 to 100 for the slider
  const sliderValue = ((value + 1) / 2) * 100;

  // Convert slider value back to -1 to 1 range
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSliderValue = parseFloat(e.target.value);
    const newScore = (newSliderValue / 100) * 2 - 1;
    onChange(parseFloat(newScore.toFixed(2)));
  };

  // Get color based on value
  const getColor = () => {
    if (value < -0.33) return 'from-red-500 to-red-400';
    if (value < 0.33) return 'from-yellow-500 to-yellow-400';
    return 'from-green-500 to-green-400';
  };

  // Get label color
  const getLabelColor = () => {
    if (value < -0.33) return 'text-red-600';
    if (value < 0.33) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`w-full space-y-1 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-500">Negative (-1)</span>
        <span className={`text-sm font-semibold ${getLabelColor()}`}>
          {value.toFixed(2)}
        </span>
        <span className="text-xs font-medium text-gray-500">Positive (1)</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleChange}
          className={`w-full h-2 bg-gradient-to-r ${getColor()} rounded-lg appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-gray-300
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-gray-300
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:hover:scale-110`}
        />
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-1">
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSlider;