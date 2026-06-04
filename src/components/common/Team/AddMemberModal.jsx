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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddMemberModal({ open, onOpenChange }) {
  const { mutate: createUser, isPending } = useCreateUser();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    role: "",
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
    createUser(form, {
      onSuccess: () => {
        setForm({
          fullName: "",
          userName: "",
          email: "",
          role: "",
          department: "",
          password: "",
        });
        onOpenChange(false);
      },
    });
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
              <Label className="text-base">Role</Label>
              <Select
                value={form.role}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    role: value,
                  })
                }
              >
                <SelectTrigger className="w-full glass-strong py-5 text-lg ">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="glass-strong ">
                  <SelectGroup className="text-lg ">
                    <SelectLabel className="text-lg font-bold text-text-primary">
                      Roles
                    </SelectLabel>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="DEVELOPER"
                    >
                      Developer
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="MANAGER"
                    >
                      Manager
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label className="text-base">Department</Label>
              <Select
                value={form.department}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    department: value,
                  })
                }
              >
                <SelectTrigger className="w-full glass-strong py-5 text-lg ">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectGroup className="text-lg">
                    <SelectLabel className="text-lg font-bold text-text-primary">
                      Department
                    </SelectLabel>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="Engineering"
                    >
                      Engineering
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="Design"
                    >
                      Design
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="Product"
                    >
                      Product
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="QA"
                    >
                      QA
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="HR"
                    >
                      HR
                    </SelectItem>
                    <SelectItem
                      className="text-lg text-text-secondary"
                      value="Finance"
                    >
                      Finance
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label className="text-base">Password</Label>
              <Input
                name="password"
                type="password"
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
    </Dialog>
  );
}

export default AddMemberModal;
