export function filterUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}