
import { UseMutateFunction } from "@tanstack/react-query";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ZodSchemaOf<T extends FieldValues> = z.ZodType<T, z.ZodTypeDef, unknown>;

export function useZodForm<T extends FieldValues>(
    schema: ZodSchemaOf<T>,
    mutation: UseMutateFunction<unknown, unknown, T, unknown>,
    defaultValues?: DefaultValues<T>
) {
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<T>({
        resolver: zodResolver(schema) as unknown as Resolver<T>,
        defaultValues,
    });

    const onFormSubmit = handleSubmit(async (values: T) => mutation(values));

    return {
        register,
        watch,
        reset,
        onFormSubmit,
        errors,
    };
}