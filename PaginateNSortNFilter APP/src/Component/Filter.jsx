import React from "react";

function Filter({
  selectedValue,
  onFilterChange,
  option,
  defaultOption,
  label,
}) {
  return (
    <div className="inline-block">
      {label && (
        <label
          htmlFor="filter-select"
          className="mr-2 text-sm font-medium text-gray-700"
        >
          {label}:
        </label>
      )}
      <select
        id="filter-select"
        value={selectedValue}
        onChange={onFilterChange}
        className="px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base min-w-[120px]"
      >
        <option value="">{defaultOption || "All"}</option>
        {option.map((options) => (
          <option key={options.value} value={options.value}>
            {options.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
