import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { useAuth } from "@/contexts/auth-context";
import PassInput from "@/components/pass-input";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  console.log(watch())
  const { login } = useAuth();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    console.log(values);
    await login(values);
  };

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
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
            />

            <PassInput
              isRequired
              variant="faded"
              label="Password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "Password is required!",
              })}
            />
          </CardBody>

          <CardFooter className="w-full flex flex-col items-stretch space-y-4">
            <Button color="danger" type="submit">
              Login
            </Button>
            <Button variant="bordered" onPress={() => navigate("/register")}>
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Login;
