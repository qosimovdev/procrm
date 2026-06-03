import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Link, Save, X } from "lucide-react";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import github from "../../../assets/icons/github.svg";
import linkedIn from "../../../assets/icons/linkedIn.svg";
import telegram from "../../../assets/icons/telegram.svg";

function SocialCard({
  form,
  setForm,
  handleChange,
  original,
  updateProfile,
  isPending,
  setUser,
  labelStyle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const isChanged = useMemo(() => {
    return (
      JSON.stringify(form.socials || {}) !==
      JSON.stringify(original.socials || {})
    );
  }, [form.socials, original.socials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(form.socials.github)) {
      toast.error("GitHub URL is invalid");
      return;
    }
    if (!validateUrl(form.socials.linkedin)) {
      toast.error("LinkedIn URL is invalid");
      return;
    }
    if (!validateUrl(form.socials.telegram)) {
      toast.error("Telegram URL is invalid");
      return;
    }
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
        <Link className="text-primary-light" />
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
                    <div className="flex items-start gap-2 mb-2">
                      <img
                        src={github}
                        alt="GitHub Icon"
                        className="w-8 h-8 "
                      />
                      <FieldLabel className={labelStyle}>GitHub</FieldLabel>
                    </div>
                    <Input
                      name="socials.github"
                      type="url"
                      placeholder="https://github.com/username"
                      onChange={handleChange}
                      value={form.socials?.github || ""}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                      <img
                        src={linkedIn}
                        alt="LinkedIn Icon"
                        className="w-8 h-8"
                      />
                      <FieldLabel className={labelStyle}>LinkedIn</FieldLabel>
                    </div>
                    <Input
                      name="socials.linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      onChange={handleChange}
                      value={form.socials?.linkedin || ""}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                      <img
                        src={telegram}
                        alt="Telegram Icon"
                        className="w-8 h-8"
                      />
                      <FieldLabel className={labelStyle}>Telegram</FieldLabel>
                    </div>
                    <Input
                      name="socials.telegram"
                      type="url"
                      placeholder="https://t.me/username"
                      onChange={handleChange}
                      value={form.socials?.telegram || ""}
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
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Social
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
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialCard;
