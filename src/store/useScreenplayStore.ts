import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ScreenplayState } from "../types/screenPlayStoreTypes";

export const useScreenplayStore = create<ScreenplayState>()(
  persist(
    (set) => ({
      value: [
        {
          type: "scene_heading",
          children: [{ text: "Scene Heading" }],
        },
      ],
      setValue: (newValue) => set(() => ({ value: newValue })),

      currentSelectedLine: null,
      setCurrentSelectedLine: (line) => set(() => ({ currentSelectedLine: line })),

      suggestion: null,
      setSuggestion: (suggestion) => set(() => ({ suggestion })),

      hasHydrated: false,
      setHasHydrated: (state) => set(() => ({ hasHydrated: state })),
      
    }),
    {
      name: "screenplay",
      partialize: (state) => ({ value: state.value }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
