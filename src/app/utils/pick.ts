export const pick = (
  obj: Record<string, string>,
  keys: string[]
): Record<string, string> =>
  keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

export const omit = (obj: any, keys: string[]) =>
  Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

export const pickAndOmit = (obj: any, pickKeys: string[], omitKeys: string[]) =>
  pick(omit(obj, omitKeys), pickKeys);
