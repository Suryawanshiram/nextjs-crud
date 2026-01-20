"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Signup failed:", result.message);
        return;
      }

      console.log("Signup success:", result);

      router.push("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center lg:p-12 p-8 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          {/* ✅ Only one form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg w-full mx-auto"
          >
            <div className="mb-12">
              <h1 className="text-3xl font-semibold text-purple-400">
                Create an account
              </h1>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-white text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  {...register("name")}
                  className="w-full bg-transparent text-sm text-white border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  {...register("email")}
                  className="w-full bg-transparent text-sm text-white border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  {...register("password")}
                  className="w-full bg-transparent text-sm text-white border-b border-slate-500 focus:border-white pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-slate-300 ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="text-purple-400 font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-8">
              {/* ✅ type="submit" */}
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 min-w-32 text-sm text-white font-medium rounded-sm bg-purple-600 hover:bg-purple-500 focus:outline-none cursor-pointer"
              >
                Register
              </button>

              <p className="text-sm text-slate-300 mt-8">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 font-medium hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
