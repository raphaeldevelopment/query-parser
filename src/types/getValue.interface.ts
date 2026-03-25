export type PRIMITIVE = number | string | boolean;
export type ARRAY = Array<PRIMITIVE>;
export type VARIABLE = PRIMITIVE | ARRAY;
export type RESPONSE = VARIABLE | Record<string, VARIABLE>;