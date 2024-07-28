import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminUpdatePasswordUser } from "@/apis/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../PasswordInput";
import { KeyRound } from "lucide-react";
import { useState } from "react";

const updatePasswordSchema = z.object({
  id: z.number(),
  password: z
    .string({ required_error: "Password baru tidak boleh kosong." })
    .min(8, "Password minimal 8 karakter.")
    .max(32, "Password maksimal 32 karakter."),
});

type TProps = {
  user: {
    id: number;
    name: string;
  };
};

const FormUpdatePassword = ({ user }: TProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const updatePasswordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

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
    <FormProvider {...updatePasswordForm}>
      <Dialog open={open} onOpenChange={setOpen}>
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
            onSubmit={updatePasswordForm.handleSubmit(onSubmitUpdatePassword)}
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
  );
};

export default FormUpdatePassword;
