export interface Prompts {
  [key: string]: (arrayValues?: string[]) => string;
}

const movies = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the title of a movie, (example of how you will respond: jaws)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these movies from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

export const prompts: Prompts = {
  movies,
  // tv_shows: () => {},
  // countries: () => {},
  // capital_cities: () => {},
  // animals: () => {},
  // sports: () => {},
};
