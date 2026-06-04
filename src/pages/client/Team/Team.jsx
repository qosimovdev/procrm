import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Plus, Trash2Icon } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";
import { useGetUsers } from "../../../hooks/useGetUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationDemo } from "@/components/layout/Pagination/Pagination";
import { Card, CardTitle } from "@/components/ui/card";
import AddMemberModal from "@/components/common/Team/AddMemberModal";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Alert } from "@/components/layout/Alert/Alert";

function Developers() {
  const [page, setPage] = useState(1);
  const { openModal, modalType, closeModal } = useModalStore();
  const { mutate: deleteUser } = useDeleteUser();
  const { data, isLoading, error } = useGetUsers();
  const users = data?.users ?? [];
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load team members");
    }
  }, [error]);
  const itemsPerPage = 8;
  const totalMembers = Math.ceil(users.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentMembers = users.slice(startIndex, startIndex + itemsPerPage);
  const handleDelete = (id) => {
    deleteUser(id);
  };
  if (isLoading) return <div>Loading...</div>;
  console.log(users);

  return (
    <section>
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Team Members</h1>
          <p className="text-text-secondary">Team Members</p>
        </div>

        <AddMemberModal
          open={modalType === "invite-member"}
          onOpenChange={closeModal}
        />
        <Button
          variant="default"
          className="btn-primary py-6 px-2 text-lg rounded-xl"
          onClick={() => openModal("invite-member")}
        >
          <Plus className=" size-5" /> Invite Member
        </Button>
      </div>
      {/* team members */}
      <div className="overflow-x-auto rounded-xl shadow-purple">
        <Card className="glass shadow-purple rounded-xl p-4 py-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-text-primary ">
              Team Overview
            </CardTitle>
            <div className="flex items-center justify-between my-2">
              <div>
                <CardTitle className="hidden text-sm text-text-secondary font-medium ">
                  Showing 1 to 5 of 25 tasks
                </CardTitle>
              </div>
              <div>
                <PaginationDemo
                  page={page}
                  setPage={setPage}
                  totalPages={totalMembers}
                />
              </div>
            </div>
          </div>
          <Table className="text-text-primary">
            <TableHeader className="glass">
              <TableRow className="hover:bg-black/10">
                <TableHead className="text-text-primary font-bold text-lg">
                  Member Name
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Email
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Role
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Department
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Position
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Status
                </TableHead>
                <TableHead className="text-text-primary font-bold text-lg">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentMembers.map((user) => (
                <TableRow
                  className="hover:bg-white/5 transition text-base text-text-secondary"
                  key={user.id}
                >
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department || "-"}</TableCell>
                  <TableCell>{user.position || "-"}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    {" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-xl hover:bg-white/10 hover:glass hover:shadow-purple hover:text-text-primary transition-all duration-300"
                        >
                          <MoreHorizontalIcon className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="glass text-text-primary "
                      >
                        <DropdownMenuItem className="hover:bg-gradient-dark cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gradient-dark cursor-pointer">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Alert
                          alerTitle="Delete Member?"
                          alertDesc="Are you sure?"
                          firstBtnText="Delete Member"
                          btnText="Delete"
                          handler={() => handleDelete(user.id)}
                          icon={<Trash2Icon />}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}

export default Developers;
