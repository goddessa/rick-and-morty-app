import React, { InputHTMLAttributes, useCallback, useId } from "react";
import { Field } from "react-final-form";
import copy from "../../copy";

type InputFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
  showErrorMsg?: boolean;
  type?: string;
  autoComplete?: string;
  suffixNode?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  required,
  validate,
  showErrorMsg = true,
  type = "text",
  autoComplete,
  suffixNode,
  ...rest
}) => {
  const id = useId();

  const composedValidation = useCallback(
    (value: string) => {
      if (required && !value) {
        return copy.requiredField;
      }
      return validate ? validate(value) : undefined;
    },
    [required, validate]
  );

  return (
    <Field name={name} validate={composedValidation}>
      {({ input, meta }) => {
        const hasError = meta.touched && meta.error;

        return (
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={id}
                className={`text-sm font-medium ${
                  hasError ? "text-red-500" : "text-gray-700"
                }`}
              >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            )}

            <div className="relative">
              <input
                {...input}
                {...rest}
                id={id}
                type={type}
                autoComplete={autoComplete}
                aria-invalid={hasError || undefined}
                aria-describedby={hasError ? `${id}-error` : undefined}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                  hasError
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                } ${suffixNode ? "pr-10" : ""}`}
              />
              {suffixNode && (
                <span className="absolute right-3 top-2.5 text-gray-500">
                  {suffixNode}
                </span>
              )}
            </div>

            {hasError && showErrorMsg && (
              <small
                id={`${id}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {meta.error}
              </small>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default InputField;
