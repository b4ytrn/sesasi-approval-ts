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
import { UserCog, ShieldCheck, ShieldX } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { adminChangeUserLevel, adminGetUsersData } from "@/apis/admin";
import { TAdminChangeUserLevelRequest } from "@/types/admin";
import { TUserData } from "@/types/universal";
import FormUpdatePassword from "@/components/admin/FormUpdatePassword";
import FormNewVerificator from "@/components/admin/FormNewVerificator";
import NoDataTable from "@/components/NoDataTable";

export const TableUsers = () => {
  const { toast } = useToast();
  const [usersData, setUsersData] = useState<TUserData[]>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

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

  const fetchUsersData = async () => {
    await adminGetUsersData()
      .then((response) => {
        setUsersData(response.data.data);
      })
      .catch((error) => {
        toast({
          title: "Gagal Mengambil Data!",
          variant: "destructive",
          description: error.message,
        });
      });
  };

  useEffect(() => {
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
        <FormNewVerificator setIsUpdated={setIsUpdated} />
      </div>
      {usersData?.length === 0 ? (
        <NoDataTable />
      ) : (
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
                    <FormUpdatePassword
                      user={{ id: user.id, name: user.name }}
                    />
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
