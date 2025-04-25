import React from "react";

function ItemList({ items }) {
  if (!items || items.lenghth === 0) {
    return (
      <p className="text-center p-5 italic text-gray-500">
        No items match your criteria.
      </p>
    );
  }
  return (
    // Removed list-none p-0 m-0 as ul defaults are often reset by Tailwind base
    <ul className="space-y-3">
      {/* Add vertical space between items */}
      {items.map((item) => (
        <li
          key={item.id}
          className="border border-gray-200 bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200" // Tailwind classes
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {item.id}: {item.title}
          </h3>
          <p className="text-xs text-gray-500 uppercase mb-2">
            User ID: {item.userId}
          </p>
          <p className="text-sm text-gray-700">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
