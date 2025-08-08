"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";

import { Mail, Lock } from "lucide-react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

// ✅ Form field types
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { person, creatPerson, out } = auth;

  console.log(person);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      console.log(data.email, data.password);

      await creatPerson(data.email, data.password);
      await out();

      toast.success("Account created Successfuly!");

      // Wait 1 second before navigating (optional)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

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
        className="w-full max-w-md mx-auto pt-4"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: "#761A24" }}
            >
              Create Account
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
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    {...register("confirmPassword", { required: true })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Please confirm your password
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: "#761A24" }}
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <Link to={"/login"}>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium underline"
                  style={{ color: "#761A24" }}
                >
                  Sign in here
                </a>
              </div>
            </Link>

           
          </CardContent>
        </Card>
      </div>
      <Footer />
      <Only_Sm_Show></Only_Sm_Show>
    </>
  );
}
