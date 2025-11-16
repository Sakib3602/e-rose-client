"use client";

import { Button } from "@/components/ui/button";
import { Link,  useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Mail, Lock } from "lucide-react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPub from "../Axios/useAxiosPub";
import { useMutation } from "@tanstack/react-query";

// ✅ Form field types
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  // const {person,SignNow} = useContext(AuthContext);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { person, SignNow, GoogleS } = auth;
  console.log(person, "login");
  interface userDatam {
    email: string | null;
    password: string;
    role: string;
  }
  // const location = useLocation();
  const navigate = useNavigate();
  const xx = () => {
    GoogleS()
      .then((result) => {
        const use = {
          email: result.user.email,
          password: "sign_with_google_no_pass",
          role: "user",
        };

        MutationUp.mutate(use);
        navigate("/");
        toast.success(`Google Logged in`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const axiosPublic = useAxiosPub();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const use = {
      email: data?.email,
      password: data?.password,
      role: "user",
    };

    SignNow(data?.email, data?.password).then(() => {
      toast.success("Loged in Done");
    }).catch((error) => {
      console.error(error);
      toast.error("Login failed");
    });
    MutationUp.mutate(use);
  };

  const MutationUp = useMutation({
    mutationFn: async (b: userDatam) => {
      const res = await axiosPublic.post("/user", b);
      return res.data;
    },
  });

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 40px 40px",
        }}
        className="w-full max-w-md mx-auto p-4"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: "#761A24" }}
            >
              Sign in Now
            </CardTitle>
            <CardDescription>
              Join RoseWood and start shopping for amazing products
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Type password"
                    className="pl-10"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: "#761A24" }}
              >
                Sign in
              </Button>
            </form>

            {/*  Link */}
            <Link to={"/register"}>
              <div className="text-center text-sm text-gray-600">
                haven't an account?{" "}
                <a
                  href="#"
                  className="font-medium underline"
                  style={{ color: "#761A24" }}
                >
                  Sign up here
                </a>
              </div>
            </Link>

            {/* Divider */}
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with Google
                </span>
              </div>
            </div>
            {/* Google Login Button */}
            <Button
              onClick={xx}
              type="button"
              variant="outline"
              className="w-full bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
      <Only_Sm_Show></Only_Sm_Show>
    </>
  );
}
