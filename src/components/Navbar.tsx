import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, BookUser, ScrollText, UserCog } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { userLogout } from "@/apis/universal";
import { useToast } from "./ui/use-toast";

type IProps = {
  level: string;
  email: string;
  name: string;
  tabPosition: number;
  setTabPosition: React.Dispatch<React.SetStateAction<number>>;
};

export const Navbar = ({
  level,
  email,
  name,
  tabPosition,
  setTabPosition,
}: IProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onUserLogout() {
    await userLogout()
      .then((response) => {
        // console.log(response);
        localStorage.clear();
        navigate("/login");
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }
  return (
    <div className="w-full py-4 px-4 border-b">
      <div className="flex flex-row justify-between">
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-3">
            <p className="text-base font-semibold text-slate-950">
              {level === "1" ? "Administrator" : name}
            </p>
            <p className="text-sm text-slate-400">{email}</p>
          </div>
        </div>
        <NavigationMenu>
          {(level === "1" || level === "2") && (
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={tabPosition == 1 ? true : false}
                  onClick={() => setTabPosition(1)}
                >
                  <BookUser className="mr-2 h-4 w-4" /> Daftar Pengguna
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={tabPosition == 2 ? true : false}
                  onClick={() => setTabPosition(2)}
                >
                  <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          )}
          {level === "3" && (
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={tabPosition == 1 ? true : false}
                  onClick={() => setTabPosition(1)}
                >
                  <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={tabPosition == 2 ? true : false}
                  onClick={() => setTabPosition(2)}
                >
                  <UserCog className="mr-2 h-4 w-4" /> Pengaturan Akun
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          )}
        </NavigationMenu>
        <div>
          <Button
            variant="destructive"
            onClick={() => {
              onUserLogout();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </div>
    </div>
  );
};
