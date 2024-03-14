import React, {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import InputMask from "react-input-mask";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: FieldError;
}

interface IDateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: { message: string };
}

export const Input = forwardRef(
  (
    { label, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...rest}
        className={`border border-gray-300 p-2 rounded-md w-full ${
          error ? "border-red-500" : "" // Adiciona borda vermelha se houver erro
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  )
);
