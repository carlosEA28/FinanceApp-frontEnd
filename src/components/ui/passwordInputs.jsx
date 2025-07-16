import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { forwardRef } from "react";

const PasswordInputs = forwardRef(
  ({ placeholder = "Digite sua senha", ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          placeholder={placeholder}
          type={passwordIsVisible ? "text" : "password"}
          ref={ref}
          {...props}
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
);

PasswordInputs.displayName = "PasswordInputs";

export default PasswordInputs;
