import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useGetUsers } from "@/hooks/useGetUser";
import { useState } from "react";
import { CustomSelect } from "../projects/ProjectSelect";
import { DatePicker } from "@/components/ui/DatePicker";

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
    console.log(formData);
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
      <DialogContent className="glass-strong text-text-primary sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Task</DialogTitle>
          <DialogDescription>
            Create a new task for this project and manage its workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              rows={4}
              className="glass-strong"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Status</Label>
              <CustomSelect
                label="Status"
                placeholder="Select status"
                value={formData.status}
                onChange={(value) => handleSelectChange("status", value)}
                options={[
                  { label: "To Do", value: "TODO" },
                  { label: "In Progress", value: "IN_PROGRESS" },
                  { label: "Done", value: "DONE" },
                ]}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Priority</Label>
              <CustomSelect
                label="Priority"
                placeholder="Select priority"
                value={formData.priority}
                onChange={(value) => handleSelectChange("priority", value)}
                options={[
                  { label: "Low", value: "LOW" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "High", value: "HIGH" },
                ]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Assigned To</Label>
            <CustomSelect
              label="Assigned To"
              placeholder="Select team member"
              value={formData.assignedTo?.toString()}
              onChange={(value) =>
                handleSelectChange("assignedTo", Number(value))
              }
              options={users.map((user) => ({
                label: user.fullName,
                value: user.id.toString(),
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <DatePicker
              value={formData.deadline}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  deadline: date,
                })
              }
              placeholder="Select deadline"
            />
            {/* <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
            /> */}
          </div>

          <Button
            type="submit"
            className="w-full btn-primary p-6 text-base rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
