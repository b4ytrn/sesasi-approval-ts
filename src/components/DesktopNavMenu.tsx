import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { BookUser, LogOut, ScrollText, UserCog } from "lucide-react";
import { Button } from "./ui/button";

export type TProps = {
  level: string;
  tabPosition: number;
  setTabPosition: React.Dispatch<React.SetStateAction<number>>;
  onUserLogout: () => Promise<void>;
};

const DesktopNavMenu = (props: TProps) => {
  return (
    <>
      <NavigationMenu>
        {(props.level === "1" || props.level === "2") && (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={props.tabPosition == 1 ? true : false}
                onClick={() => props.setTabPosition(1)}
              >
                <BookUser className="mr-2 h-4 w-4" /> Daftar Pengguna
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={props.tabPosition == 2 ? true : false}
                onClick={() => props.setTabPosition(2)}
              >
                <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
        {props.level === "3" && (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={props.tabPosition == 1 ? true : false}
                onClick={() => props.setTabPosition(1)}
              >
                <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={props.tabPosition == 2 ? true : false}
                onClick={() => props.setTabPosition(2)}
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
            props.onUserLogout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </div>
    </>
  );
};

export default DesktopNavMenu;
