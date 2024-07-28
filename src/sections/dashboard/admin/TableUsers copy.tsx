import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  UserCog,
  KeyRound,
  UserPlus,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PasswordInput } from "@/components/PasswordInput";
import { useEffect, useState } from "react";
import {
  adminAddVerificator,
  adminChangeUserLevel,
  adminGetUsersData,
  adminUpdatePasswordUser,
} from "@/apis/admin";
import { TAdminChangeUserLevelRequest, TAdminUserData } from "@/types/admin";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddVerificatorSchema = z.object({
  name: z.string({ required_error: "Nama tidak boleh kosong." }),
  email: z
    .string({ required_error: "Email tidak boleh kosong." })
    .email("Email tidak valid."),
  password: z
    .string({ required_error: "Password baru tidak boleh kosong." })
    .min(8, "Password minimal 8 karakter.")
    .max(32, "Password maksimal 32 karakter."),
});

const updatePasswordSchema = z.object({
  id: z.number(),
  password: z
    .string({ required_error: "Password baru tidak boleh kosong." })
    .min(8, "Password minimal 8 karakter.")
    .max(32, "Password maksimal 32 karakter."),
});

export const TableUsers = () => {
  const { toast } = useToast();
  const [usersData, setUsersData] = useState<TAdminUserData[]>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const addVerificatorForm = useForm<z.infer<typeof AddVerificatorSchema>>({
    resolver: zodResolver(AddVerificatorSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const updatePasswordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmitAddVerificator(
    data: z.infer<typeof AddVerificatorSchema>
  ) {
    await adminAddVerificator({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        addVerificatorForm.reset();
        setIsUpdated(true);
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }

  async function onSubmitUpdatePassword(
    data: z.infer<typeof updatePasswordSchema>
  ) {
    await adminUpdatePasswordUser({
      id: data.id,
      password: data.password,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        // updatePasswordForm.setValue("password", "")
        updatePasswordForm.reset();
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }

  async function onChangeVerificator(data: TAdminChangeUserLevelRequest) {
    await adminChangeUserLevel({
      id: data.id,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          variant: "destructive",
          description: error.message,
        });
      });
  }

  useEffect(() => {
    // declare the async data fetching function
    const fetchUsersData = async () => {
      await adminGetUsersData()
        .then((response) => {
          if (response.data.status) {
            setUsersData(response.data.data);
          }
        })
        .catch((error) => {
          toast({
            title: "Gagal Mengambil Data!",
            variant: "destructive",
            description: error.message,
          });
        });
    };
    // call the function
    fetchUsersData();
    setIsUpdated(false);
  }, [isUpdated]);

  // console.log(updatePassId);
  return (
    <div className="mx-6 my-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Tabel Daftar Pengguna</h2>
          <p className="text-slate-400">
            Berisi informasi mengenai pengguna sistem.
          </p>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Verifikator
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <FormProvider {...addVerificatorForm}>
              <DialogHeader>
                <DialogTitle>Tambah Verifikator</DialogTitle>
                <DialogDescription>
                  Masukkan informasi mengenai detail verifikator.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={addVerificatorForm.handleSubmit(
                  onSubmitAddVerificator
                )}
                className="space-y-6"
              >
                <div className="grid gap-4 py-4">
                  <FormField
                    control={addVerificatorForm.control}
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
                    control={addVerificatorForm.control}
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
                    control={addVerificatorForm.control}
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
                </div>
                <DialogFooter>
                  <Button type="submit">Tambahkan Verifikator</Button>
                </DialogFooter>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <Table className="p-4">
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status Verifikasi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.level}</TableCell>
                <TableCell>
                  {user.isVerified == 1 ? (
                    <Badge variant="success">
                      <ShieldCheck className="h-4 w-4 mr-1" /> Terverifikasi
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <ShieldX className="h-4 w-4 mr-1" />
                      Belum Terverifikasi
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger>
                            <Button variant="outline" size="icon">
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Jadikan Verifikator</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Jadikan sebagai verifikator?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Jika <span className="font-bold">{user.name}</span>{" "}
                          sudah menjadi verifikator, maka tidak bisa
                          dikembalikan menjadi pengguna biasa.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onChangeVerificator({ id: user.id })}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <FormProvider {...updatePasswordForm}>
                    <Dialog>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                              <Button
                                onClick={() => {
                                  updatePasswordForm.setValue("id", user.id);
                                }}
                                variant="outline"
                                size="icon"
                              >
                                <KeyRound className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ubah Password</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ubah Password?</DialogTitle>
                          <DialogDescription>
                            Ini akan mengubah password untuk pengguna{" "}
                            <span className="font-bold">{user.name}</span>.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={updatePasswordForm.handleSubmit(
                            onSubmitUpdatePassword
                          )}
                          className="space-y-6"
                        >
                          <FormField
                            control={updatePasswordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password Baru</FormLabel>
                                <FormControl>
                                  <PasswordInput
                                    autoComplete="password"
                                    placeholder="Masukan Password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full">
                            Simpan Password
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </FormProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
