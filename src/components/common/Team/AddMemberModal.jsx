import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AddMemberModal({ open, onOpenChange }) {
  const { mutate: createUser, isPending } = useCreateUser();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    role: "Developer",
    department: "",
    password: "",
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
      <DialogContent className="w-full max-w-2xl glass-strong text-text-primary shadow-purple max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Member</DialogTitle>
          <DialogDescription className="text-text-secondary">
            Create and manage your new project workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <Label className="text-base">Full Name</Label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter member full name"
                className="glass-strong"
              />
            </Field>
            <Field>
              <Label className="text-base">User Name</Label>
              <Input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter member name"
                className="glass-strong"
              />
            </Field>
            <Field>
              <Label className="text-base">Email</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter member email"
                className="glass-strong"
              />
            </Field>
            <Field>
              <Label className="text-base">Department</Label>
              <Input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Enter member department"
                className="glass-strong"
              />
            </Field>
            <Field>
              <Label className="text-base">Password</Label>
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter member new password"
                className="glass-strong"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="pt-0">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              disabled={isPending}
              className="btn-primary p-6 rounded-xl text-base"
            >
              {isPending ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <form onSubmit={handleSubmit}></form>
    </Dialog>
  );
}

export default AddMemberModal;
