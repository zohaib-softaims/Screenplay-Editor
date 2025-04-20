import { SuggestionPopupProps } from "@/src/types/suggestionPopupTypes";

const SuggestionPopup = ({ suggestion, onAccept, onDismiss }: SuggestionPopupProps) => {
  return (
    <div className="text-white fixed top-28 right-10 bg-slate-900 border border-slate-700 p-4 rounded shadow-md w-[260px] z-50">
      <p className="text-sm mb-2">
        Suggestion: <span className="font-semibold">{suggestion.suggestion}</span>
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={onAccept} className="bg-blue-600 text-white px-3 py-1 text-sm rounded">
          Accept
        </button>
        <button onClick={onDismiss} className="text-black bg-gray-200 px-3 py-1 text-sm rounded">
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default SuggestionPopup;
