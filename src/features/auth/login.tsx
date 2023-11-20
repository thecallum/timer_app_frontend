import Link from "next/link";
import { useRouter } from "next/router";
import { LoginForm } from "./components/login-form";

export const Login = () => {
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
          <h1 className="text-2xl text-slate-700">Login</h1>
          <div className="text-base text-slate-500">
            Don't have an account?{" "}
            <Link className="text-blue-600 underline" href="/signup">
              Sign up
            </Link>
            .
          </div>
        </div>

        <div className="bg-white p-8 shadow-lg rounded border-purple-600  border-t-8   ">
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
