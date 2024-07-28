import { PasswordInput } from "@/components/PasswordInput";
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
import { useState } from "react";

const UserSettings = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col mx-6 my-8">
      <Card>
        <CardHeader>
          <CardTitle>Ubah Password</CardTitle>
          <CardDescription>
            Kamu bisa mengganti password yang digunakan untuk autentikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label htmlFor="email">Password Baru</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              placeholder="Masukan Password Baru"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Daftar Sekarang</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserSettings;
