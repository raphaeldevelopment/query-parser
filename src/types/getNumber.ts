export const getNumber = (value: string): number | null => {
    if (value.replace(/\s/g, "") === "") {
        return null;
    }
    return !isNaN(Number(value)) ? Number(value) : null;
}