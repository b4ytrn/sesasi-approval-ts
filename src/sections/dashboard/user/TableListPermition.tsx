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
import { CheckCircle, CircleX, Info, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
import FormAddPermition from "@/components/user/FormAddPermition";
import FormEditPermition from "@/components/user/FormEditPermition";

export const TableListPermition = () => {
  const [permitionsData, setPermitionData] = useState<TPermition[]>();
  const [isUpdated, setIsUpdated] = useState(false);

  const { toast } = useToast();

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
        <FormAddPermition setIsUpdated={setIsUpdated} />
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
                    <FormEditPermition
                      setIsUpdated={setIsUpdated}
                      permition={permition}
                    />
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
