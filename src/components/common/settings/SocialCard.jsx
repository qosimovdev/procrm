import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { updateProfile } from "@/api/user.api";

function SocialCard({
  form,
  setForm,
  handleChange,
  original,
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
        <Building2 className="text-primary-light" />
        <div>
          <CardTitle className="text-xl font-bold">Social Links</CardTitle>
          <CardDescription className="text-sm">
            Add your social media profiles
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FieldLabel className={labelStyle}>GitHub</FieldLabel>
                    <Input
                      name="socials.github"
                      type="text"
                      onChange={handleChange}
                      value={form.socials.github || ""}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-span-2">
                    <FieldLabel className={labelStyle}>LinkedIn</FieldLabel>
                    <Input
                      name="socials.linkedin"
                      type="text"
                      onChange={handleChange}
                      value={form.socials.linkedin || ""}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-span-2">
                    <FieldLabel className={labelStyle}>Telegram</FieldLabel>
                    <Input
                      name="socials.telegram"
                      type="text"
                      onChange={handleChange}
                      value={form.socials.telegram || ""}
                      disabled={!isEditing}
                    />
                  </div>
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
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending || !isChanged}
                    className="btn-primary p-4 text-sm cursor-pointer"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialCard;
