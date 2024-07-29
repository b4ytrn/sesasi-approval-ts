import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CircleX,
  ClipboardEdit,
  ClipboardPlus,
  Info,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import {
  userCancelPermition,
  userCheckPermition,
  userDeletePermition,
  userGetPermitionsData,
} from "@/apis/user";
import { useEffect, useState } from "react";
import { TPermition } from "@/types/universal";
import {
  TUserCancelPermitionRequest,
  TUserCheckPermitionRequest,
  TUserDeletePermitionRequest,
} from "@/types/user";
import NoDataTable from "@/components/NoDataTable";

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
  const [permitionsData, setPermitionData] = useState<TPermition[]>();
  const [isUpdated, setIsUpdated] = useState(false);

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

  async function fetchPermitionsData() {
    await userGetPermitionsData()
      .then((response) => {
        setPermitionData(response.data.data);
      })
      .catch((error) => {
        toast({
          title: "Gagal Mengambil Data!",
          variant: "destructive",
          description: error.message,
        });
      });
  }

  async function onCancelPermition(data: TUserCancelPermitionRequest) {
    await userCancelPermition({
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

  async function onDeletePermition(data: TUserDeletePermitionRequest) {
    await userDeletePermition({
      id: data.id,
    })
      .then((response) => {
        toast({
          title: "Berhasil!",
          description: response.data.message,
        });
        setIsUpdated(true);
      })
      .catch((error) => {
        toast({
          title: "Gagal!",
          variant: "destructive",
          description: error.message,
        });
      });
  }

  async function onCheckPermition(data: TUserCheckPermitionRequest) {
    await userCheckPermition({
      id: data.id,
    })
      .then((response) => {
        toast({
          title: "Status Perizinan : ",
          description: (
            <div className="flex items-center gap-2">
              {response.data.data.status === "Belum diizinkan" ? (
                <Info className="w-4 h-4" color="#c25d5d" />
              ) : (
                <CheckCircle className="w-4 h-4" color="#6ac25d" />
              )}
              {response.data.data.status}
            </div>
          ),
        });
        setIsUpdated(true);
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
    // call the function
    fetchPermitionsData();
    setIsUpdated(false);
  }, [isUpdated]);

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
      {permitionsData?.length === 0 ? (
        <NoDataTable />
      ) : (
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
              {permitionsData?.map((permition, index) => (
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
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              onCheckPermition({ id: permition.id })
                            }
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cek Status Perizinan</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                          <AlertDialogTitle>
                            Batalkan Perizinan
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah kamu yakin untuk membatalkan perizinan?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Kembali</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              onCancelPermition({ id: permition.id })
                            }
                          >
                            Yakin
                          </AlertDialogAction>
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
                          <AlertDialogAction
                            onClick={() => {
                              onDeletePermition({ id: permition.id });
                            }}
                          >
                            Yakin
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};
