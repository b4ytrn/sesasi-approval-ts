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
  CircleX,
  ClipboardCheck,
  ClipboardEdit,
  ClipboardPlus,
  ClipboardX,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Input } from "@/components/ui/input";

const permitions = [
  {
    id: 26,
    userId: 40,
    subject: "Cuti gais",
    description:
      "Assalamualaikum pak, izin hari ini saya tidak bisa masuk kantor, dikarenakan saya sedang demam dan flu. Terima kasih",
    isApplied: 0,
    created_at: "2024-07-26T03:52:23.000000Z",
    updated_at: "2024-07-26T04:09:15.000000Z",
  },
];

const FormSchema = z.object({
  description: z
    .string({ required_error: "Deskripsi harus diisi." })
    .min(5, {
      message: "Deksripsi harus lebih dari 5 huruf.",
    })
    .max(300, {
      message: "Deskripsi harus kurang dari 300 huruf.",
    }),
  subject: z
    .string({ required_error: "Subjek harus diisi." })
    .min(5, {
      message: "Subjek harus lebih dari 5 huruf.",
    })
    .max(300, {
      message: "Deskripsi harus kurang dari 300 huruf.",
    }),
});

export const TableListPermition = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "Berhasil!",
      description: "Perubahan berhasil disimpan.",
    });
  }
  return (
    <div className="mx-6 my-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Tabel Data Perizinan</h2>
          <p className="text-slate-400">
            Berisi informasi mengenai semua data perizinan.
          </p>
        </div>
        <Button>
          <ClipboardPlus className="h-4 w-4 mr-2" />
          Buat Izin Baru
        </Button>
      </div>
      <Card>
        <Table className="p-4">
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Subjek</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Dibuat Pada</TableHead>
              <TableHead>Diubah Pada</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permitions.map((permition, index) => (
              <TableRow key={permition.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{permition.subject}</TableCell>
                <TableCell>{permition.description}</TableCell>
                <TableCell>
                  {new Date(permition.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  {new Date(permition.updated_at).toDateString()}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Form {...form}>
                    <Dialog>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                              <Button variant="outline" size="icon">
                                <ClipboardEdit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ubah Perizinan</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ubah Perizinan</DialogTitle>
                          <DialogDescription>
                            Ini akan memperbarui detail perizinan kamu.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
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
                            Kirim Respon
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </Form>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger>
                            <Button variant="outline" size="icon">
                              <CircleX className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Batalkan Perizinan</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Batalkan Perizinan</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah kamu yakin untuk membatalkan perizinan?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        <AlertDialogAction>Yakin</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Hapus Perizinan</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Perizinan</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah kamu yakin untuk menghapus perizinan?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        <AlertDialogAction>Yakin</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
