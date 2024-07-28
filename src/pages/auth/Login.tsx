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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { userLogin } from "@/apis/universal";

const FormSchema = z.object({
  email: z
    .string({ required_error: "Email tidak boleh kosong." })
    .email("Email tidak valid."),
  password: z
    .string({ required_error: "Password tidak boleh kosong." })
    .max(32, "Password maksimal 32 karakter."),
});
export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await userLogin({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.data.status == true) {
          localStorage.setItem("bearer", response.data.access_token);
          localStorage.setItem("level", response.data.data.level.toString());
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("id", response.data.data.id.toString());

          response.data.data.level === 1 && navigate("/dashboard/admin");
          response.data.data.level === 2 && navigate("/dashboard/verificator");
          response.data.data.level === 3 && navigate("/dashboard/user");
        } else {
          toast({
            variant: "destructive",
            title: "Gagal!",
            description: response.data.message,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Tabs defaultValue="user" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="verifikator">Verifikator</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <FormProvider {...form}>
              <CardHeader>
                <CardTitle>Masuk User</CardTitle>
                <CardDescription>Silahkan masuk sebagai user.</CardDescription>
              </CardHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent className="space-y-2">
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
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Masuk Sekarang
                  </Button>
                </CardFooter>
              </form>
            </FormProvider>
          </Card>
        </TabsContent>
        <TabsContent value="verifikator">
          <Card>
            <FormProvider {...form}>
              <CardHeader>
                <CardTitle>Masuk Verifikator</CardTitle>
                <CardDescription>
                  Silahkan masuk sebagai verifikator.
                </CardDescription>
              </CardHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent className="space-y-2">
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
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Masuk Sekarang
                  </Button>
                </CardFooter>
              </form>
            </FormProvider>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <FormProvider {...form}>
              <CardHeader>
                <CardTitle>Masuk Admin</CardTitle>
                <CardDescription>Silahkan masuk sebagai admin.</CardDescription>
              </CardHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent className="space-y-2">
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
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Masuk Sekarang
                  </Button>
                </CardFooter>
              </form>
            </FormProvider>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
