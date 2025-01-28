"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log("signInData", signInData);
    if (signInData?.error) {
      console.log("signInData", signInData);
    } else {
      router.push("/admin");
    }
  };

  return (
    <Form {...form}>
      <div className="text-center text-2xl font-extrabold">Sign In</div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account?&nbsp;
        <Link className="text-[#89c5d1] text-sm font-semibold" href="/sign-up">
          Sign up
        </Link>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs bg-[#fff4f5]"
                    placeholder="mail@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs bg-[#fff4f5]"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-right text-sm text-gray-600 mt-2">
          <Link className="text-sm font-semibold" href="/sign-up">
            Forgot password?
          </Link>
        </p>

        <Button
          className="w-full mt-6 bg-[#89c5d1] hover:bg-[#89c5d1]/90"
          type="submit"
        >
          Sign in
        </Button>
      </form>

      {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div> */}
      {/* <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
    </Form>
  );
};

export default SignInForm;
