import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/Auth/Auth.context";
import copy from "../../../../../copy";
import validations from "../../../../../validations";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import InputField from "../../../../../components/InputField";
import PasswordField from "../../../../../components/PasswordField";
import FIREBASE_ERRORS from "../../../../../constants/firebaseErrors";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/characters");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await login(values.email, values.password);
      navigate("/characters");
    } catch (error: any) {
      console.error("Login error full object:", error);

      if (
        validations.firebaseErrorMatches(
          error,
          FIREBASE_ERRORS.INVALID_LOGIN_CREDENTIALS
        )
      ) {
        setServerError(copy.invalidLoginCredentials ?? "Invalid credentials");
      } else if (
        validations.firebaseErrorMatches(error, FIREBASE_ERRORS.INVALID_EMAIL)
      ) {
        setServerError(copy.invalidEmail ?? "Invalid email");
      } else if (
        validations.firebaseErrorMatches(
          error,
          FIREBASE_ERRORS.INVALID_CREDENTIAL
        )
      ) {
        setServerError(copy.invalidCredentials);
      } else {
        setServerError(copy.loginFailed);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageWrapper title={copy.login}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md mx-auto"
            aria-labelledby="login-form-title"
          >
            <h1 id="login-form-title" className="sr-only">
              {copy.login}
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

            <PasswordField name="password" label={copy.password} required />

            <button
              type="submit"
              disabled={isLoading || submitting}
              aria-busy={isLoading || submitting}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {copy[isLoading ? "loggingInProgress" : "login"]}
            </button>
          </form>
        )}
      />
    </AuthPageWrapper>
  );
};

export default Login;
