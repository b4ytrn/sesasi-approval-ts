import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminAddVerificator } from "@/apis/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../PasswordInput";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

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

type TProps = {
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormNewVerificator = ({ setIsUpdated }: TProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const addVerificatorForm = useForm<z.infer<typeof AddVerificatorSchema>>({
    resolver: zodResolver(AddVerificatorSchema),
    defaultValues: {
      email: "",
      name: "",
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
        setOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
        setOpen(false);
      });
  }
  return (
    <FormProvider {...addVerificatorForm}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah Verifikator
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Verifikator</DialogTitle>
            <DialogDescription>
              Masukkan informasi mengenai detail verifikator.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={addVerificatorForm.handleSubmit(onSubmitAddVerificator)}
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
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default FormNewVerificator;
