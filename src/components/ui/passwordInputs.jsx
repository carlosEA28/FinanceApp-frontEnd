import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function PasswordInputs({ placeholder }) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        type={passwordIsVisible ? "text" : "password"}
      />

      <Button
        variant="ghots"
        className="absolute right-0 top-0 bottom-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setPasswordIsVisible((prevValue) => !prevValue)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}
