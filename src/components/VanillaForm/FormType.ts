import { z } from 'zod';

export const FormSchema = z.object({
    lastName: z.string({ message: 'Too long' }).max(10),
    firstName: z.string(),
});

export interface FormSuccessOutput {
    type: 'success';
    message: string;
}

export interface FormErrorOutput {
    type: 'error';
    message: { [K in keyof z.infer<typeof FormSchema>]?: string[] | undefined };
}

export interface FormEmpty {
    type: undefined;
}

export type FormOutput = FormEmpty | FormErrorOutput | FormSuccessOutput;

export type FormSubmitStructure<T> = Record<keyof T, File | string | null>;
