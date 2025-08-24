import LoginForm from "@/app/(auth)/login/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-2">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
