import React, { useState, useCallback, useId } from "react";
import { Field } from "react-final-form";
import validations from "../../validations";
import copy from "../../copy";
import EyeVisibilityOffIcon from "../../icons/EyeVisibilityOffIcon";
import EyeVisibilityOnIcon from "../../icons/EyeVisibilityOnIcon";

type PasswordFieldProps = {
  name?: string;
  label?: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  name = "password",
  label = copy.password,
  required = true,
  validate,
}) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const composedValidation = useCallback(
    (value: string) => {
      if (required && !value) {
        return copy.requiredField;
      }
      return validate ? validate(value) : validations.passwordValidate()(value);
    },
    [required, validate]
  );

  const icon = showPassword ? (
    <EyeVisibilityOnIcon className="w-6 h-6" />
  ) : (
    <EyeVisibilityOffIcon className="w-6 h-6" />
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
                id={id}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-label={label}
                aria-invalid={hasError || undefined}
                aria-describedby={hasError ? `${id}-error` : undefined}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                  hasError
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                } pr-10`}
              />

              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {icon}
              </button>
            </div>

            {hasError && (
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

export default PasswordField;
