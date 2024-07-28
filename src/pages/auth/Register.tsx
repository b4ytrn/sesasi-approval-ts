import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Card className="mx-auto w-[350px]">
        <CardHeader>
          <CardTitle>Daftar</CardTitle>
          <CardDescription>Sistem Pengelolaan Karyawan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Masukan Nama Lengkap" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="name@email.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Masukan Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">Daftar Sekarang</Button>
          <div className="flex items-center mt-3">
            <p>Sudah punya akun?</p>
            <Button
              className="pl-2"
              variant="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Masuk Disini
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
