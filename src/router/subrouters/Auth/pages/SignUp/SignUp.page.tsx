import React, { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import auth from "../../../../../api/auth";
import copy from "../../../../../copy";
import validations from "../../../../../validations";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import InputField from "../../../../../components/InputField";
import PasswordField from "../../../../../components/PasswordField";
import FIREBASE_ERRORS from "../../../../../constants/firebaseErrors";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await auth.signUp(values.email, values.password);
      navigate("/characters");
    } catch (error: any) {
      console.error("Signup error full object:", error);

      if (
        validations.firebaseErrorMatches(
          error,
          FIREBASE_ERRORS.EMAIL_ALREADY_IN_USE
        )
      ) {
        setServerError(copy.emailAlreadyExists ?? "Email already exists");
      } else {
        setServerError(copy.signUpFailed ?? "Sign up failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageWrapper title={copy.signUp}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md mx-auto"
            aria-labelledby="signup-form-title"
          >
            <h1 id="signup-form-title" className="sr-only">
              {copy.signUp}
            </h1>

            {serverError && (
              <div className="text-red-500 text-sm" role="alert">
                {serverError}
              </div>
            )}

            <InputField
              name="email"
              type="email"
              label={copy.email}
              required
              autoComplete="email"
              validate={validations.emailValidation()}
            />

            <PasswordField
              name="password"
              label={copy.newPassword ?? "New password"}
              required
            />

            <button
              type="submit"
              disabled={isLoading || submitting}
              aria-busy={isLoading || submitting}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              {copy[isLoading ? "signingInProgress" : "signUp"]}
            </button>
          </form>
        )}
      />
    </AuthPageWrapper>
  );
};

export default SignUp;
