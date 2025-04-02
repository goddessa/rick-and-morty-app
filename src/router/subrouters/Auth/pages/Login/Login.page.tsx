import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import auth from "../../../../../api/auth";
import copy from "../../../../../copy";
import validations from "../../../../../validations";
import AuthContext from "../../providers/Auth/Auth.context";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import InputField from "../../../../../components/InputField";
import PasswordField from "../../../../../components/PasswordField";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/characters");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await auth.login(values.email, values.password);
      navigate("/characters");
    } catch (error) {
      console.error(error);
      alert(copy.loginFailed);
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
