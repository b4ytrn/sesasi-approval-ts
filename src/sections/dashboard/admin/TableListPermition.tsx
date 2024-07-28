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
import { ClipboardCheck, ClipboardX } from "lucide-react";
import { useEffect, useState } from "react";
import { adminGetPermitionsData, adminGetUsersData } from "@/apis/admin";
import { useToast } from "@/components/ui/use-toast";
import { TPermition, TUserData } from "@/types/universal";

export const TableListPermition = () => {
  const [permitionsData, setPermitionData] = useState<TPermition[]>();
  const [usersData, setUsersData] = useState<TUserData[]>();

  const { toast } = useToast();

  useEffect(() => {
    // call the function
    fetchPermitionsData();
    fetchUsersData();
  }, []);

  const fetchPermitionsData = async () => {
    await adminGetPermitionsData()
      .then((response) => {
        if (response.data.status) {
          setPermitionData(response.data.data);
        }
      })
      .catch((error) => {
        toast({
          title: "Gagal Mengambil Data!",
          variant: "destructive",
          description: error.message,
        });
      });
  };

  const fetchUsersData = async () => {
    await adminGetUsersData()
      .then((response) => {
        if (response.data.status) {
          setUsersData(response.data.data);
        }
      })
      .catch((error) => {
        toast({
          title: "Gagal Mengambil Data!",
          variant: "destructive",
          description: error.message,
        });
      });
  };

  return (
    <div className="mx-6 my-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Tabel Data Perizinan</h2>
          <p className="text-slate-400">
            Berisi informasi mengenai semua data perizinan.
          </p>
        </div>
      </div>
      <Card>
        <Table className="p-4">
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Subjek</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Diajukan Oleh</TableHead>
              <TableHead>Status Pengajuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permitionsData?.map((permition, index) => (
              <TableRow key={permition.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{permition.subject}</TableCell>
                <TableCell>{permition.description}</TableCell>
                <TableCell>
                  {usersData?.map(
                    (user) => user.id == permition.userId && user.name
                  )}
                </TableCell>
                <TableCell>
                  {permition.isApplied == 1 ? (
                    <Badge variant="success">
                      <ClipboardCheck className="h-4 w-4 mr-1" /> Sudah Direspon
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <ClipboardX className="h-4 w-4 mr-1" />
                      Belum Direspon
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
