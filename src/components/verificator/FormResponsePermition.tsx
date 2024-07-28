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
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { verificatorResponsePermition } from "@/apis/verificator";
import { useState } from "react";

const FormSchema = z.object({
  comment: z
    .string({ required_error: "Komentar harus diisi." })
    .min(5, {
      message: "Komentar harus lebih dari 5 huruf.",
    })
    .max(200, {
      message: "Komentar harus kurang dari 200 huruf.",
    }),
  type: z.enum(["true", "false"], {
    required_error: "Status pengajuan harus dipilih.",
  }),
});

export type TProps = {
  verificatorId: string | null;
  userId: number;
  permittionId: number;
  isApplied: number;
};

const FormResponsePermition = ({
  verificatorId,
  userId,
  permittionId,
  isApplied,
}: TProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await verificatorResponsePermition({
      verificatorId: verificatorId,
      userId: userId.toString(),
      permittionId: permittionId.toString(),
      comment: data.comment,
      isAccepted: data.type === "true" ? true : false,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        // updatePasswordForm.setValue("password", "")
        form.reset();
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
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <Button
                  disabled={isApplied == 1 ? true : false}
                  variant="outline"
                  size="icon"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isApplied == 1 ? (
                  <p>Sudah Direspon</p>
                ) : (
                  <p>Respon Perizinan</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terima Pengajuan?</DialogTitle>
            <DialogDescription>
              Status pengajuan tidak bisa diubah jika sudah diterima atau
              ditolak.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentar</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan komentar atau alasan kenapa pengajuan diterima atau ditolak."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status Pengajuan</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Terima Pengajuan
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Tolak Pengajuan
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Kirim Respon
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default FormResponsePermition;
