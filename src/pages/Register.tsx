import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosIns from "../axios";
import { AxiosError } from "axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
      <Card className="w-[420px] p-6">
        <CardHeader className="text-center text-2xl font-bold">
          Register to <span className="text-gradient"> 100 Khana</span>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col relative space-y-4 mt-4">
            <Input
              isRequired
              variant="faded"
              label="Username"
              placeholder="@rezwan"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              {...register("username", { required: "Username is required!" })}
            />

            <Input
              isRequired
              variant="faded"
              label="Email"
              placeholder="rezwan@example.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email is required!",
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
              errorMessage={errors.password?.message}
              {...register("password", { required: "Password is required!" })}
            />
            <Input
              isRequired
              variant="faded"
              label="Confirm Password"
              placeholder="Enter your password confirm"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword", { required: "Confirm Password is required!" })}
            />
          </CardBody>

          <CardFooter className="flex flex-col space-y-4">
            <Button variant="solid" color="danger" type="submit" fullWidth>Register</Button>
            <Button variant="bordered" onPress={() => navigate("/login")} fullWidth>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Register;
