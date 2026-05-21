import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";

function AddMemberModal({ open, onOpenChange }) {
  const { mutate: createUser, isPending } = useCreateUser();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "developer",
    department: "frontend",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(form);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Project</DialogTitle>
          <DialogDescription className="text-text-secondary">
            Create and manage your new project workflow.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      <form onSubmit={handleSubmit}></form>
    </Dialog>
  );
}

export default AddMemberModal;
