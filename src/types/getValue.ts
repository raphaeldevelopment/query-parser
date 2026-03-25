import { getArray } from "./getArray";
import { getBoolean } from "./getBoolean";
import { getNumber } from "./getNumber";
import { getString } from "./getString";
import { PRIMITIVE, VARIABLE } from "./getValue.interface";

const getPrimitive = (value: string): PRIMITIVE => {
    const number = getNumber(value);

    if (number !== null) {
        return number;
    }
    
    const boolean = getBoolean(value);

    if (boolean !== null) {
        return boolean;
    }

    return getString(value);
}

export const getValue = (value: string): VARIABLE => {
    const arr = getArray(value);

    if (arr !== null) {
        return arr.map(getPrimitive);
    }

    return getPrimitive(value);
}