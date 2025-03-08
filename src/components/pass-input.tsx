import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useState } from "react";

export default function PassInput(props: React.PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(false);
  console.log("isVisible changed", isVisible);
  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      endContent={
        <Button
          isIconOnly
          variant="light"
          onPress={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeOffIcon className="w-6 h-6 cursor-pointer" />
          ) : (
            <EyeIcon className="w-6 h-6 cursor-pointer" />
          )}
        </Button>
      }
    />
  );
}
