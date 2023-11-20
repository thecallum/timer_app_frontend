import Link from "next/link";
import { useRouter } from "next/router";
import { SignupForm } from "./components/signup-form";

export const Signup = () => {
  const router = useRouter();

  const onSubmit = (props: { email: string; password: string }) => {
    if (confirm("Continue to calendar")) {
      router.push("/calendar");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-[calc(100%-60px)] max-w-[600px] ">
        <div className="mb-4">
          <h1 className="text-2xl text-slate-700">Sign up</h1>
          <div className="text-base text-slate-500">
            Already have an account?{" "}
            <Link className="text-blue-600 underline" href="/login">
              Login
            </Link>
            .
          </div>
        </div>

        <div className="bg-white p-8 shadow-lg rounded border-purple-600  border-t-8   ">
          <SignupForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
