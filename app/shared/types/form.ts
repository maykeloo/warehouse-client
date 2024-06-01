export type FormState<T> = {
    message: string;
    errors: Record<keyof T, string> | undefined | unknown;
    data: T | undefined;
};