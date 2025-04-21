import React, { useEffect, useRef, useState } from "react";

const SuggestionDropdown = ({ position, options, onSelect, onClose }: { position: { top: number; left: number }; options: string[]; onSelect: (option: string) => void; onClose?: () => void }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSelect(options[focusedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    }
  };

  return (
    <div
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="absolute bg-white text-black border shadow rounded p-2 z-10 focus:outline-none"
      style={{ top: position.top, left: position.left }}
    >
      {options.map((option, idx) => (
        <div key={idx} className={`cursor-pointer p-1 ${idx === focusedIndex ? "bg-gray-300" : "hover:bg-gray-200"}`} onClick={() => onSelect(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default SuggestionDropdown;
