import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Button } from "@heroui/button";
import { AxiosError } from "axios";
import { Input } from "@heroui/input";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { addToast } from "@heroui/toast";

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
    watch,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    console.log(values);
    try {
      const { data } = await axiosInstance.post("/auth/login", values);
      console.log(data);
      setLoginError(data.message || "Login failed, try again!");
    } catch (error) {
      console.error(error);

      addToast({ title: "Invalid credential", color: "danger", variant: "flat", description: "Oops! The email or password you entered doesn't match our records. Please try again." })
    }
  };

  console.log(errors)
  console.log(watch())

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[420px] p-6">
        <CardHeader className="text-center text-2xl font-bold">
          Login to <span className="text-gradient">100 Khana</span>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="space-y-8">
            <Input
              isRequired
              variant="faded"
              label="Email"
              placeholder="ahmad@example.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email field is empty!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
            />

            <Input
              isRequired
              variant="faded"
              label="Password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message} // Only pass FieldError
              {...register("password", {
                required: "Password field is empty!",
              })}
            />
          </CardBody>

          <CardFooter className="w-full">
            <div className="flex flex-col w-full space-y-4">
              <Button color="danger" type="submit">Login</Button>
              <Button variant="bordered" onPress={() => navigate("/register")}>Register</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section >
  );
};

export default Login;
