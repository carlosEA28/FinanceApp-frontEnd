import { Card, CardContent } from "../ui/card";
import logo from "@/assets/icons/Logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/auth";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const { user, signout } = useAuthContext();
  return (
    <Card>
      <CardContent className="px-8 py-4 flex items-center justify-between">
        <div>
          <img src={logo} alt="logo da aplicação" />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex">
              <Button variant="outline" className="space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user.first_name} {user.last_name}
                </p>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                  onClick={signout}
                >
                  <LogOutIcon />
                  sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
