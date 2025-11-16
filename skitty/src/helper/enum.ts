// Convert enum to string array
export function enumToStringArray<T extends Record<string, string | number>>(enumObject: T): string[] {
    return Object.entries(enumObject)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => key);
}

// Convert enum to mapping from value to name
export function enumToValueMap<T extends Record<string, string | number>>(enumObject: T): Record<number, string> {
    return Object.entries(enumObject)
        .filter(([key]) => isNaN(Number(key)))
        .reduce((acc, [key, value]) => {
            acc[value as number] = key;
            return acc;
        }, {} as Record<number, string>);
}
