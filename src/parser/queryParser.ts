import { getValue } from "../types/getValue";
import { RESPONSE } from "../types/getValue.interface";

export const queryParser = (query: string): RESPONSE => {
    const queryModified = query[0] === "?" ? query.replace("?", "") : query;

    if (queryModified.indexOf("&") === -1 && queryModified.indexOf("=") === -1) {
        return getValue(queryModified);
    }


    const response = queryModified.split("&").map(couple => {
        const [key, value] = couple.split("=");
        return {[key]: getValue(value)};
    }).reduce((acc, curr) => Object.assign(acc, curr), {});

    return response;
}