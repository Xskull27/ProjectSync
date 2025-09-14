"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// Password strength checker
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", color: "text-red-500" };
  if (score === 3 || score === 4) return { label: "Medium", color: "text-yellow-500" };
  if (score === 5) return { label: "Strong", color: "text-green-600" };
  return { label: "", color: "" };
}
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import register from "../../../../public/images/register.jpg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// auth
import { useAuth } from "@/lib/authContext";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    role: z.enum(["PM", "Developer", "Designer"], {
      message: "Please select a valid role.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match.",
    path: ["confirm_password"],
  });

const Register = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();
  const { register: registerUser, error } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      is_active: true,
      confirm_password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values) {
    try {
      await registerUser({
        username: values.username,
        email: values.email,
        role: values.role,
        password: values.password,
        confirm_password: values.confirm_password,
        is_active: true,
      });

      toast({
        title: "Account created",
        description:
          "Your account has been created successfully. Please log in.",
        variant: "success",
      });

      router.push("/login");
      form.reset();
    } catch (error) {
      console.error("Registration error:", error);

      const errorMsg = error.message || error.detail || "Registration failed. Please try again.";
      toast({
        title: "Registration failed",
        description: errorMsg,
        variant: "destructive",
      });

      form.setError("root", {
        type: "manual",
        message: errorMsg,
      });
    }
  }

  return (
    <div className="flex h-full w-full ">
      <div className="hidden md:block md:w-1/2 relative rounded-2xl overflow-hidden">
        <Image
          src={register}
          alt="Bug tracking illustration"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
          <div className="text-white max-w-md p-8">
            <h1 className="text-3xl font-bold mb-4">Track Bugs Effectively</h1>
            <p className="text-xl">
              Join our platform to streamline your development workflow and
              manage issues efficiently.
            </p>
          </div>
        </div> */}
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your details to register for ProjectSync
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 border rounded"
                        >
                          <option value="PM">Project Manager</option>
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    const strength = getPasswordStrength(passwordValue);
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              onChange={e => {
                                field.onChange(e);
                                setPasswordValue(e.target.value);
                              }}
                              onFocus={() => setPasswordFocused(true)}
                              onBlur={() => setPasswordFocused(false)}
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                              onClick={() => setShowPassword(v => !v)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          {passwordFocused && (
                            <span className="block font-medium text-xs text-gray-500 mt-1">
                              Password must contain:
                              <ul className="list-disc ml-5 mt-1">
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                                <li>At least one special character</li>
                              </ul>
                            </span>
                          )}
                          {passwordValue && (
                            <span className={`block mt-2 text-sm font-semibold ${strength.color}`}>
                              Password strength: {strength.label}
                            </span>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
