import { TriangleAlert } from "lucide-react";
import { Card } from "./ui/card";

const NoDataTable = () => {
  return (
    <Card className="container flex flex-col items-center py-10">
      <div className="flex flex-col gap-6 text-center items-center">
        <div className="p-6 rounded-full bg-slate-500">
          <TriangleAlert color="#ffffff" className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-gray-600 mb-2">
            Belum Ada Data
          </h2>
          <p className="text-base text-slate-400">
            Tidak ada data yang ditemukan pada database.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default NoDataTable;
