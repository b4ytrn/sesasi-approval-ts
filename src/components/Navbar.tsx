import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { userLogout } from "@/apis/universal";
import { useToast } from "./ui/use-toast";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import DesktopNavMenu from "./DesktopNavMenu";
import MobileNavMenu from "./MobileNavMenu";

type TProps = {
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
}: TProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { width } = useWindowDimensions();

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
    <div className="w-full py-4 px-4 border-b sticky top-0 bg-white z-50">
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
        {width >= 768 ? (
          <DesktopNavMenu
            level={level}
            onUserLogout={onUserLogout}
            setTabPosition={setTabPosition}
            tabPosition={tabPosition}
          />
        ) : (
          <MobileNavMenu
            level={level}
            onUserLogout={onUserLogout}
            setTabPosition={setTabPosition}
            tabPosition={tabPosition}
          />
        )}
      </div>
    </div>
  );
};
