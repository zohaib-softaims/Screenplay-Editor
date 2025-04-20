export function formatSceneHeading(text: string): string {
    let upperText:string = text.toUpperCase().trim();

    // Check if the text starts with a location match (INT., EXT.)
    const locationMatch:boolean = /^(INT\.|EXT\.|INT\.\/EXT\.)/.test(upperText);
    if (!locationMatch) {
      upperText = `INT. ${upperText}`;
    }

      // Check if the text ends with a time of day (e.g., "DAY", "NIGHT", etc.)
    const hasTimeOfDay:boolean = /( - )(DAY|NIGHT|EVENING|MORNING|DUSK|DAWN|CONTINUOUS|SAME|LATER)$/.test(upperText);
    if (!hasTimeOfDay) {
      upperText += " - DAY";
    }
    return upperText;
  }
  