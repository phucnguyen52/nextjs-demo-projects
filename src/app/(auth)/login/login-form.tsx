"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "sonner";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(values);
      console.log("1", result);
      toast.success("Đăng nhập thành công");
      // gọi đến auth ở nextjs server để nó setcookies trả về cho client chớ nếu nó set trực tiếp trong trình duyệt thì sẽ không bảo mật
      if (result.status === 200) {
        // gọi API set cookie
        await authApiRequest.auth({
          sessionToken: result.payload.data.token,
          expiresAt: result.payload.data.expiresAt,
        });

        router.push("/me");
      }

      //clientSessionToken.value = result.payload.data.token; không cần vì mình đã set nó trong hàm request ở http.ts
    } catch (error: any) {
      // const errors = error.payload.errors as {
      //   field: string;
      //   message: string;
      // }[];
      // const status = error.status as number;
      // if (status === 422) {
      //   errors.forEach((err) => {
      //     form.setError(err.field as "email" | "password", {
      //       type: "server",
      //       message: err.message,
      //     });
      //   });
      // } else {
      //   toast.error("Đã có lỗi xảy ra");
      // }
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-2/5 w-full flex-shrink-0"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập email của bạn"
                    type="email"
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mật khẩu của bạn"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer mt-4 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
