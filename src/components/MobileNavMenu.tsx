import React from "react";
import { BookUser, LogOut, Menu, ScrollText, UserCog } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TProps = {
  level: string;
  tabPosition: number;
  setTabPosition: React.Dispatch<React.SetStateAction<number>>;
  onUserLogout: () => Promise<void>;
};

const MobileNavMenu = (props: TProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Daftar Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(props.level === "1" || props.level === "2") && (
            <>
              <DropdownMenuItem
                onClick={() => props.setTabPosition(1)}
                className="hover:cursor-pointer"
              >
                <BookUser className="mr-2 h-4 w-4" /> Daftar Pengguna
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => props.setTabPosition(2)}
                className="hover:cursor-pointer"
              >
                <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
              </DropdownMenuItem>
            </>
          )}
          {props.level === "3" && (
            <>
              <DropdownMenuItem
                onClick={() => props.setTabPosition(1)}
                className="hover:cursor-pointer"
              >
                <ScrollText className="mr-2 h-4 w-4" /> Daftar Perizinan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => props.setTabPosition(2)}
                className="hover:cursor-pointer"
              >
                <UserCog className="mr-2 h-4 w-4" /> Pengaturan Akun
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              props.onUserLogout();
            }}
            className="w-full !py-1"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MobileNavMenu;
