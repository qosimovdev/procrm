import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";
import { useGetUsers } from "@/hooks/useGetUser";
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

function Developers() {
  const [page, setPage] = useState(1);
  const { openModal, modalType, closeModal } = useModalStore();
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

  if (isLoading) return <div>Loading...</div>;
  return (
    <section>
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Team Members</h1>
          <p className="text-text-secondary">Team Members</p>
        </div>
        <Button
          variant="default"
          className="btn-primary py-6 px-2 text-lg rounded-xl"
          onClick={() => openModal("invite-member")}
        >
          <Plus className=" size-5" /> Invite Member
        </Button>
        {/* <AddProjectModal
          open={modalType === "create-project"}
          onOpenChange={closeModal}
        /> */}
      </div>
      {/* team members */}
      <div className="overflow-x-auto rounded-xl  shadow-purple">
        {/* <Card> */}
        <Table className="text-text-primary">
          <TableHeader className="glass">
            <TableRow className="hover:bg-black/10">
              <TableHead className="text-text-primary font-bold text-lg">
                Member
              </TableHead>
              <TableHead className="text-text-primary font-bold text-lg">
                Role
              </TableHead>
              <TableHead className="text-text-primary font-bold text-lg">
                Department
              </TableHead>
              <TableHead className="text-text-primary font-bold text-lg">
                Status
              </TableHead>
              <TableHead className="text-text-primary font-bold text-lg">
                Joined At
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
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
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
                      <DropdownMenuItem className="hover:bg-gradient-dark">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gradient-dark">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </Card> */}
      </div>
    </section>
  );
}

export default Developers;
