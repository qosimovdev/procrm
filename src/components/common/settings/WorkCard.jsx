import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { CustomSelect } from "../projects/ProjectSelect";
import { BriefcaseBusiness, Edit, Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

function WorkCard({
  form,
  setForm,
  //   handleChange,
  original,
  updateProfile,
  isPending,
  setUser,
  labelStyle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const isChanged = useMemo(() => {
    return JSON.stringify(form) !== JSON.stringify(original);
  }, [form, original]);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form, {
      onSuccess: (res) => {
        setUser(res.user || form);
        setIsEditing(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex gap-4 items-start text-text-primary">
        <BriefcaseBusiness className="text-primary-light" />
        <div>
          <CardTitle className="text-xl font-bold">Work Information</CardTitle>
          <CardDescription className="text-sm">
            Update your work related information
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet className="grid grid-cols-1 lg:grid-cols-2">
              <div>
                <FieldLabel className={labelStyle}>Department</FieldLabel>
                <CustomSelect
                  value={form.department}
                  defaultValue={form.department}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, department: value }))
                  }
                  placeholder="Select department"
                  options={[
                    { label: "Engineering", value: "Engineering" },
                    { label: "Design", value: "Design" },
                    { label: "Product", value: "Product" },
                    { label: "HR", value: "HR" },
                    { label: "Finance", value: "Finance" },
                    { label: "QA", value: "QA" },
                  ]}
                />
              </div>

              <div>
                <FieldLabel className={labelStyle}>Position</FieldLabel>
                <CustomSelect
                  placeholder="Select your position"
                  value={form.position}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, position: value }))
                  }
                  options={[
                    {
                      label: "Frontend Developer",
                      value: "Frontend Developer",
                    },
                    {
                      label: "Backend Developer",
                      value: "Backend Developer",
                    },
                    { label: "UI/UX Designer", value: "UI/UX Designer" },
                    {
                      label: "Full-Stack Developer",
                      value: "Full-Stack Developer",
                    },
                    { label: "DevOps Engineer", value: "DevOps Engineer" },
                    { label: "Project Manager", value: "Project Manager" },
                    { label: "HR Manager", value: "HR Manager" },
                    {
                      label: "Financial Analyst",
                      value: "Financial Analyst",
                    },
                    {
                      label: "Marketing Specialist",
                      value: "Marketing Specialist",
                    },
                    { label: "QA Engineer", value: "QA Engineer" },
                  ]}
                />
              </div>

              <div>
                <FieldLabel className={labelStyle}>Role</FieldLabel>
                <CustomSelect
                  placeholder="Select your role"
                  value={form.role}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, role: value }))
                  }
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Developer", value: "Developer" },
                  ]}
                />
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Only admin can change role
                </p>
              </div>

              <div>
                <FieldLabel className={labelStyle}>Status</FieldLabel>
                <CustomSelect
                  placeholder="Select your status"
                  value={form.status}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, status: value }))
                  }
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                    { label: "Blocked", value: "Blocked" },
                  ]}
                />
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Only admin can change status
                </p>
              </div>

              <div>
                <FieldLabel className={labelStyle}>Company</FieldLabel>
                <Input value={form.company?.name || ""} disabled />
              </div>

              <div>
                <FieldLabel className={labelStyle}>Member Since</FieldLabel>
                <Input
                  value={
                    form?.createdAt
                      ? new Date(form.createdAt).toLocaleString("uz-UZ")
                      : ""
                  }
                  disabled
                />
              </div>
            </FieldSet>
          </FieldGroup>

          <div className="flex justify-end gap-3 mt-5">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn-primary p-4 text-sm cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  className="p-4 text-text-primary text-sm cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm(original);
                    setIsEditing(false);
                  }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isPending || !isChanged}
                  className="btn-primary p-4 text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default WorkCard;
