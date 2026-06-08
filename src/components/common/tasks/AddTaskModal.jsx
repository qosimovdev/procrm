import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useGetUsers } from "@/hooks/useGetUser";
import { useState } from "react";

function AddTaskModal({ open, onOpenChange, projectId }) {
  const { mutate: createTask, isPending } = useCreateTask();
  const { data } = useGetUsers();
  const users = data?.users ?? [];
  const initialState = {
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    deadline: "",
    createdBy: null,
    assignedTo: null,
    projectId: null,
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      deadline: formData.deadline,
      assignedTo: formData.assignedTo,
    };
    console.log("projectId:", projectId);
    console.log("task:", newTask);
    createTask(
      {
        projectId,
        data: newTask,
      },
      {
        onSuccess: () => {
          setFormData(initialState);
          onOpenChange(false);
        },
      },
    );
    console.log(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
      </DialogHeader>
      <DialogContent className="glass-strong text-text-primary">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                name="status"
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
                className="col-span-3"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">TODO</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                  <SelectItem value="DONE">DONE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority">Priority</Label>
              <Select
                id="priority"
                name="priority"
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
                className="col-span-3"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Assigned To</Label>

              <Select
                value={formData.assignedTo?.toString()}
                onValueChange={(value) =>
                  handleSelectChange("assignedTo", Number(value))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>

                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
        </form>
        <div>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
