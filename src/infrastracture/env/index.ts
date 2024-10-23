// const optionalLoadAsBoolean = (index: string, defaultval: boolean): boolean => {
//   if (typeof process.env[index] === 'undefined') {
//     return defaultval;
//   }
//   return process.env[index] === 'true';
// };

// const optionalLoadAsString = (index: string): string | undefined => {
//   return process.env[index];
// };
console.log(process.env);
const loadAsString = (index: string): string => {
  const value: string | undefined = process.env[index];
  console.log(value);
  if (value === undefined) {
    throw new Error(`${index} must be set!`);
  }
  return value;
};

const loadAsNumber = (index: string): number => {
  const value: string | undefined = process.env[index];
  const asNumber = Number(value);
  if (value === undefined || isNaN(asNumber)) {
    throw new Error(`${index} must be set as number!`);
  }
  return asNumber;
};

// const optionalLoadAsNumber = (index: string): number | undefined => {
//   const value: string | undefined = process.env[index];
//   if (value === undefined) {
//     return undefined;
//   }

//   const asNumber = Number(value);
//   if (isNaN(asNumber)) {
//     throw new Error(`${index} must be undefined or set as number!`);
//   }
//   return asNumber;
// };

export const env = {
  DB_NAME: loadAsString('DB_NAME'),
  DB_HOST: loadAsString('DB_HOST'),
  DB_PASS: loadAsString('DB_PASS'),
  DB_PORT: loadAsNumber('DB_PORT'),
  DB_USER: loadAsString('DB_USER'),
  TZ: loadAsString('TZ'),
};