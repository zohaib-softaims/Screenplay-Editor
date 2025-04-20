export function formatSceneHeading(text: string): string {
    let upperText = text.toUpperCase().trim();
    const locationMatch = /^(INT\.|EXT\.|INT\.\/EXT\.)/.test(upperText);
    if (!locationMatch) {
      upperText = `INT. ${upperText}`;
    }
    const hasTimeOfDay = /( - )(DAY|NIGHT|EVENING|MORNING|DUSK|DAWN|CONTINUOUS|SAME|LATER)$/.test(upperText);
    if (!hasTimeOfDay) {
      upperText += " - DAY";
    }
    return upperText;
  }
  