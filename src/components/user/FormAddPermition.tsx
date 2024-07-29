import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ClipboardPlus } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { userAddPermition } from "@/apis/user";
import { Input } from "../ui/input";

const FormSchema = z.object({
  subject: z
    .string({ required_error: "Subjek harus diisi." })
    .min(5, {
      message: "Komentar harus lebih dari 5 huruf.",
    })
    .max(200, {
      message: "Komentar harus kurang dari 200 huruf.",
    }),
  description: z
    .string({ required_error: "Komentar harus diisi." })
    .min(5, {
      message: "Komentar harus lebih dari 5 huruf.",
    })
    .max(200, {
      message: "Komentar harus kurang dari 200 huruf.",
    }),
});

export type TProps = {
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};
const FormAddPermition = ({ setIsUpdated }: TProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await userAddPermition({
      subject: data.subject,
      description: data.description,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        form.reset();
        setOpen(false);
        setIsUpdated(true);
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
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>
            <ClipboardPlus className="h-4 w-4 mr-2" />
            Buat Izin Baru
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perizinan Baru</DialogTitle>
            <DialogDescription>
              Masukkan detail perizinan kamu.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjek</FormLabel>
                  <FormControl>
                    <Input
                      id="subject"
                      placeholder="Masukkan subjek izin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan deskripsi yang jelas kenapa kamu mengajukan izin."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Tambah Perizinan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default FormAddPermition;
