import { userRegister } from "@/apis/universal";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string({ required_error: " Nama tidak boleh kosong." })
    .min(3, "Nama minimal 3 huruf.")
    .max(100, "Nama maksimal 100 huruf."),
  email: z
    .string({ required_error: "Email tidak boleh kosong." })
    .email("Email tidak valid."),
  password: z
    .string({ required_error: "Password tidak boleh kosong." })
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter."),
});

export const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await userRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        localStorage.setItem("bearer", response.data.access_token);
        localStorage.setItem("level", "3");
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("id", response.data.data.id.toString());

        navigate("/dashboard/user");
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Card className="mx-auto w-[350px]">
        <FormProvider {...form}>
          <CardHeader>
            <CardTitle>Masuk User</CardTitle>
            <CardDescription>Silahkan masuk sebagai user.</CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        autoComplete="password"
                        placeholder="Masukan Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Daftar Sekarang
              </Button>
              <div className="flex items-center mt-3">
                <p>Sudah punya akun?</p>
                <Button
                  className="pl-2"
                  variant="link"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Klik Disini
                </Button>
              </div>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
