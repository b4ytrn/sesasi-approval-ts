import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormResetPassword from "@/components/user/FormResetPassword";

const UserSettings = () => {
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
          <FormResetPassword />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
