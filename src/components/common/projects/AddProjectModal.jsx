import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/api/projects.service";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { format } from "date-fns";
import { CustomSelect } from "./ProjectSelect";
import { toast } from "sonner";

export function AddProjectModal({ open, onOpenChange }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      onOpenChange(false);
      setFormData(initialState);
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });
  const initialState = {
    projectName: "",
    client: "",
    description: "",
    budget: "",
    currency: "USD",
    startDate: undefined,
    deadline: undefined,
    status: "Planning",
    priority: "Medium",
    category: "CRM",
    githubUrl: "",
    liveUrl: "",
    tags: "",
    teamMembers: "",
    thumbnail: "",
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
    if (!formData.projectName) {
      toast.error("Project name is required");
      return;
    }
    if (!formData.client) {
      toast.error("Client name is required");
      return;
    }
    const newProject = {
      id: Date.now(),
      ...formData,
      startDate: formData.startDate
        ? format(formData.startDate, "yyyy-MM-dd")
        : "",
      deadline: formData.deadline
        ? format(formData.deadline, "yyyy-MM-dd")
        : "",
      tags: formData.tags.split(",").map((t) => t.trim()),
      teamMembers: formData.teamMembers.split(",").map((t) => t.trim()),
      progress: 0,
      spent: 0,
      totalTasks: 0,
      tasksCompleted: 0,
      tasks: [],
      activity: [],
      createdAt: format(new Date(), "yyyy-MM-dd"),
    };
    mutate(newProject);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl glass-strong text-text-primary shadow-purple max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Project</DialogTitle>
          <DialogDescription className="text-text-secondary">
            Create and manage your new project workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <Label className="text-base">Project Name</Label>
                <Input
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className="glass-strong"
                />
              </Field>
              <Field>
                <Label className="text-base">Client Name</Label>
                <Input
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  className="glass-strong"
                />
              </Field>
            </FieldGroup>
            <Field>
              <Label className="text-base">Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write project description..."
                className="glass-strong "
              />
            </Field>
          </div>

          {/* TIMELINE */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Timeline</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <Label className="text-base">Start Date</Label>
                <DatePicker
                  value={formData.startDate}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      startDate: date,
                    })
                  }
                  placeholder="Select start date"
                />
              </Field>
              <Field>
                <Label className="text-base">Deadline</Label>
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
              </Field>
            </FieldGroup>
          </div>

          {/* BUDGET */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Budget</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <Label className="text-base">Budget</Label>
                <Input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="$ 50,000"
                  className="glass-strong"
                />
              </Field>
              <Field>
                <Label className="text-base">Currency</Label>
                <CustomSelect
                  label="Currencies"
                  placeholder="Select currency"
                  value={formData.currency}
                  onChange={(value) => handleSelectChange("currency", value)}
                  options={[
                    { label: "USD", value: "USD" },
                    { label: "EUR", value: "EUR" },
                    { label: "UZS", value: "UZS" },
                  ]}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* PROJECT SETTINGS */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Project Settings</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field>
                <Label className="text-base">Status</Label>
                <CustomSelect
                  label="Status"
                  placeholder="Select status"
                  value={formData.status}
                  onChange={(value) => handleSelectChange("status", value)}
                  options={[
                    { label: "Planning", value: "Planning" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Completed", value: "Completed" },
                    { label: "On Hold", value: "On Hold" },
                  ]}
                />
              </Field>

              <Field>
                <Label className="text-base">Priority</Label>
                <CustomSelect
                  label="Priority"
                  placeholder="Select priority"
                  value={formData.priority}
                  onChange={(value) => handleSelectChange("priority", value)}
                  options={[
                    { label: "Low", value: "Low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                />
              </Field>

              <Field>
                <Label className="text-base">Category</Label>
                <CustomSelect
                  label="Category"
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(value) => handleSelectChange("category", value)}
                  options={[
                    { label: "CRM", value: "CRM" },
                    { label: "Web App", value: "Web App" },
                    { label: "SaaS", value: "SaaS" },
                    { label: "Mobile App", value: "Mobile App" },
                  ]}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* LINKS */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Project Links</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <Label className="text-base">GitHub URL</Label>
                <Input
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/project"
                  className="glass-strong"
                />
              </Field>
              <Field>
                <Label className="text-base">Live URL</Label>
                <Input
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://project.com"
                  className="glass-strong"
                />
              </Field>
            </FieldGroup>
          </div>

          {/* TEAM */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Team & Tags</h3>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <Label className="text-base">Team Members</Label>
                <Input
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleChange}
                  placeholder="John, Alex, Emma"
                  className="glass-strong"
                />
              </Field>
              <Field>
                <Label className="text-base">Tags</Label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="glass-strong"
                />
              </Field>
            </FieldGroup>
          </div>

          {/* THUMBNAIL */}

          <div className="space-y-5">
            <h3 className="text-lg font-semibold">Media</h3>
            <Field>
              <Label className="text-base">Thumbnail URL</Label>
              <Input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://image-url.com"
                className="glass-strong"
              />
            </Field>
          </div>
          <DialogFooter className="pt-0">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              disabled={isPending}
              className="btn-primary p-6 rounded-xl text-base"
            >
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
