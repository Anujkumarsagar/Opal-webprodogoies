import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import { ErrorMessage } from "@hookform/error-message"
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

type Props<T extends FieldValues> = {
    type?: 'text' | 'email' | 'password' | 'number'
    inputType: 'select' | 'input' | 'textarea'
    option?: { value: string; label: string; id: string }[]
    label?: string
    placeholder: string
    register: UseFormRegister<T>
    name: Path<T>
    errors: FieldErrors<T>
    lines?: number
}

const FormGenerator = <T extends FieldValues,>({
    type,
    errors,
    inputType,
    name,
    placeholder,
    register,
    label,
    lines,
    option
}: Props<T>) => {
    switch (inputType) {
        case 'input':
            return (
                <Label className='flex flex-col gap-2 text-[#9D9D9D]'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Input
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        className='bg-transparent border-gray-700 text-gray-950'
                        {...register(name)}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name as unknown as never}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>{message === 'Required' ? '' : message}</p>
                        )}
                    />
                </Label>
            )

        case 'select':
            return (
                <Label className='flex flex-col gap-2 text-[#9D9D9D]'
                    htmlFor={`select-${label}`}
                >

                    {label && label}

                    <select id={`select-${label}`}

                        className='w-full bg-transparent border-[1px] p-3 rounded-lg'
                        {...register(name)}
                    >


                        {
                            option?.length &&
                            option.map((option) => (
                                <option
                                    value={option.value}
                                    key={option.id}
                                    className='dark:bg-muted'
                                >
                                    {option.label}
                                </option>
                            ))
                        }
                    </select>

                    <ErrorMessage
                        errors={errors}
                        name={name as unknown as never}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>{message === 'Required' ? '' : message}</p>
                        )}
                    />
                </Label>
            )

        case 'textarea':
            return (
                <Label className='flex flex-col gap-2 text-[#9D9D9D]'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Textarea
                        id={`input-${label}`}
                        placeholder={placeholder}
                        className='bg-transparent border-gray-700 text-gray-950'
                        rows={lines}
                        {...register(name)}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name as unknown as never}
                        render={({ message }) => (
                            <p className='text-red-400 mt-2'>{message === 'Required' ? '' : message}</p>
                        )}
                    />
                </Label>
            )

        default:
            break
    }
}

export default FormGenerator