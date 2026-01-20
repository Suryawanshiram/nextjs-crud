"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Login failed:", result);
        return;
      }

      console.log("Login success:", result);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="py-6 px-4">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="max-lg:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
              alt="login img"
            />
          </div>

          <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
            {/* ✅ ONE FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-12">
                <h1 className="text-slate-900 text-3xl font-semibold">Login</h1>
                <p className="text-slate-600 text-[15px] mt-6 leading-relaxed">
                  Login to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    {...register("email")}
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    {...register("password")}
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {/* Remember */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-12">
                <button
                  type="submit" // ✅ MUST be submit
                  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Sign in
                </button>

                <p className="text-sm mt-6 text-center text-slate-600">
                  Do not have an account{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
