import { UseMutateFunction } from "@tanstack/react-query";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useZodForm<TFieldValues extends FieldValues, S extends z.ZodType<TFieldValues>>(
    schema: S,
    mutation: UseMutateFunction<unknown, unknown, TFieldValues, unknown>,
    defaultValues?: DefaultValues<TFieldValues>
) {
    const resolver = zodResolver(schema as unknown as z.ZodType<any, any, any>) as unknown as Resolver<TFieldValues>;

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<TFieldValues>({
        resolver,
        defaultValues,
    });

    const onFormSubmit = handleSubmit(async (values: TFieldValues) => mutation(values));

    return {
        register,
        watch,
        reset,
        onFormSubmit,
        errors,
    };
}