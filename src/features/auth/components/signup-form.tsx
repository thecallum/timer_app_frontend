import { ErrorMessage } from "@/components/form";
import { TextInputWithLabel } from "@/components/form/text-input-with-label";
import { ContinueWithGoogle } from "@/features/auth/components/continue-with-google";
import { useState } from "react";
import Validator from "validator";

interface Props {
  onSubmit: (props: { email: string; password: string }) => void;
}

export const SignupForm = (props: Props) => {
  const { onSubmit } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (email === null || email.trim() === "") {
      errors["email"] = "Email cannot be empty";
    } else if (!Validator.isEmail(email)) {
      errors["email"] = "Email invalid";
    }

    if (password === null || password.trim() === "") {
      errors["password"] = "Password cannot be empty";
    } else if (!Validator.isLength(password, { min: 8, max: 100 })) {
      errors["password"] = "Password must be between 8 and 100 characters";
    }

    if (confirmPassword === null || confirmPassword.trim() === "") {
      errors["confirmPassword"] = "Confirm Password cannot be empty";
    } else if (confirmPassword !== password) {
      errors["confirmPassword"] = "Password doesn't match";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length >= 1) {
      return;
    }

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInputWithLabel
          label="Email"
          autoFocus
          value={email}
          setValue={setEmail}
          id="email"
          name="email"
          ariaLabel="Email"
          error={errors?.email}
        />

        {errors?.email && <ErrorMessage message={errors?.email} />}
      </div>

      <div className="mb-4">
        <TextInputWithLabel
          label="Password"
          value={password}
          setValue={setPassword}
          id="password"
          name="password"
          ariaLabel="Password"
          error={errors?.password}
          type="password"
        />

        {errors?.password && <ErrorMessage message={errors?.password} />}
      </div>

      <div className="mb-4">
        <TextInputWithLabel
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          id="confirmPassword"
          name="confirmPassword"
          ariaLabel="Confirm password"
          error={errors?.confirmPassword}
          type="password"
        />

        {errors?.confirmPassword && (
          <ErrorMessage message={errors?.confirmPassword} />
        )}
      </div>

      <div>
        <button className="bg-purple-600 text-xl mb-8 text-white w-full px-2 py-3 rounded shadow-md">
          Sign up
        </button>
      </div>

      <ContinueWithGoogle />
    </form>
  );
};
