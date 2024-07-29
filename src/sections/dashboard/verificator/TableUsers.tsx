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
import { ShieldCheck, ShieldX, UserRoundCog } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TUserData } from "@/types/universal";
import { useEffect, useState } from "react";
import {
  verificatorGetUsersData,
  verificatorVerifyUser,
} from "@/apis/verificator";
import { useToast } from "@/components/ui/use-toast";
import NoDataTable from "@/components/NoDataTable";

export const TableUsers = () => {
  const { toast } = useToast();
  const [usersData, setUsersData] = useState<TUserData[]>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const fetchUsersData = async () => {
    await verificatorGetUsersData()
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

  const handleVerifyUser = async (id: number) => {
    await verificatorVerifyUser({
      id: id,
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
          description: error.message,
        });
      });
  };

  useEffect(() => {
    // call the function
    fetchUsersData();
    setIsUpdated(false);
  }, [isUpdated]);

  return (
    <div className="mx-6 my-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Tabel Daftar Pengguna</h2>
          <p className="text-slate-400">
            Berisi informasi mengenai pengguna sistem.
          </p>
        </div>
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
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                          <Button
                            disabled={user.isVerified == 1 ? true : false}
                            variant="outline"
                            size="icon"
                            onClick={() => handleVerifyUser(user.id)}
                          >
                            <UserRoundCog className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {user.isVerified == 1 ? (
                            <p>Sudah Terverifikasi</p>
                          ) : (
                            <p>Verifikasi Pengguna</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
