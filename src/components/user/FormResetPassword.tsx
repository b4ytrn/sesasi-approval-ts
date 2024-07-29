import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../PasswordInput";
import { userResetPassword } from "@/apis/user";

const updatePasswordSchema = z.object({
  password: z
    .string({ required_error: "Password baru tidak boleh kosong." })
    .min(8, "Password minimal 8 karakter.")
    .max(32, "Password maksimal 32 karakter."),
});

const FormResetPassword = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmitUpdatePassword(
    data: z.infer<typeof updatePasswordSchema>
  ) {
    await userResetPassword({
      id: parseInt(localStorage.getItem("id") ?? "{}"),
      password: data.password,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          description: error.message,
        });
      });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitUpdatePassword)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="password"
                  placeholder="Masukan Password Baru"
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
    </FormProvider>
  );
};

export default FormResetPassword;
