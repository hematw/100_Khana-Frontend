import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Button } from "@heroui/button";
import { AxiosError } from "axios";
import { Input } from "@heroui/input";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    console.log(values);
    try {
      const { data } = await axiosInstance.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");

      setLoginError(data.message || "Login failed, try again!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setLoginError(error.response.data.message);
        } else if (error.request) {
          setLoginError("Something went wrong! please try again");
        }
      }
      console.log(error);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="max-w-md w-[32rem] border-2 px-8 py-12 rounded-2xl shadow-xl">
        <h1 className="text-center text-2xl font-bold">
          Login to <span className="text-gradient">100 Khana</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-4 relative">
            <Input
              label="Email"
              {...register("email", {
                required: "Email field is empty!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
              errorMessage={errors.email?.message}
            />
            {!errors.email && loginError && (
              <p className="error">{loginError}</p>
            )}
          </div>

          <div className="flex flex-col mt-4 relative">
            <Input
              label="Password"
              {...register("password", {
                required: "Password field is empty!",
              })}
              errorMessage={errors.password?.message} // Only pass FieldError
            />
            {!errors.password && loginError && (
              <p className="error">{loginError}</p>
            )}
          </div>

          <div className="flex flex-col mt-8">
            <Button>Login</Button>
            <Button onPress={() => navigate("/register")}>Register</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
