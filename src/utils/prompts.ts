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

const tv_shows = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the title of a TV show, (example of how you will respond: friends)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these TV shows from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

const countries = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the name of a country, (example of how you will respond: united states)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these countries from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

const capital_cities = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the capital city of a country, (example of how you will respond: washington)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these capital cities from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

const animals = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the name of an animal, (example of how you will respond: dog)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these animals from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

const sports = (arrayValues?: string[]): string => {
  let prompt = `I want you to tell me the name of a sport, (example of how you will respond: soccer)`;

  if (arrayValues && arrayValues.length > 0) {
    prompt += ` omit these sports from your answer [${arrayValues
      .map((value) => `'${value}'`)
      .join(", ")}].`;
  }

  return prompt;
};

export const prompts: Prompts = {
  movies,
  tv_shows,
  countries,
  capital_cities,
  animals,
  sports,
};
