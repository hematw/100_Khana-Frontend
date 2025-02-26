import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosIns from "../axios";
import { AxiosError } from "axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

type ServerError = {
  message: string;
  duplicateField: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ServerError>({
    message: "",
    duplicateField: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const { data } = await axiosIns.post("/auth/register", values);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          setServerError(error.response.data);
          console.log(error.response.data);
        } else if (error.request) {
          setServerError({
            message: "Something went wrong! please try again",
            duplicateField: "",
          });
        }
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="max-w-md w-[32rem] border-2 px-8 py-12 rounded-2xl shadow-xl">
        <h1 className="text-center text-2xl font-bold">
          Register to <span className="text-gradient">100 Khana</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col relative mt-4">
            <Input
              placeholder="rezwan"
              label="Username"
              {...register("username", { required: "Username is required!" })}
              errorMessage={errors.username?.message}
            />
            {!errors.username && serverError.duplicateField === "username" && (
              <p className="error">
                <span>{serverError.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col relative mt-4">
            <Input
              placeholder="rezwan@example.com"
              label="Email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
              errorMessage={errors.email?.message}
            />
            {!errors.email && serverError.duplicateField === "email" && (
              <p className="error">
                <span>{serverError.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col relative mt-4">
            <Input
              placeholder="Type your password"
              label="Password"
              {...register("password", { required: "Password is required!" })}
              errorMessage={errors.password?.message}
            />
          </div>

          <div className="flex flex-col mt-8">
            <Button variant="solid">Register</Button>
            <Button variant="bordered" onPress={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
