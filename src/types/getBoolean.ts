export const getBoolean = (value: string): boolean | null => {
    return (value === "true" || value === "false") ? value === "true" : null;
}