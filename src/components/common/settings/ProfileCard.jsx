import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building2, Edit, Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import AvatarUpload from "./AvatarUpload";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Textarea } from "@/components/ui/textarea";
function ProfileCard({
  form,
  setForm,
  handleChange,
  user,
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
  const handleAvatarSuccess = (res) => {
    const avatar = res?.avatar || res?.data?.avatar;
    setForm((prev) => ({
      ...prev,
      avatar: avatar,
    }));
  };

  return (
    <Card>
      <CardHeader className="flex gap-4 items-start text-text-primary">
        <Building2 className="text-primary-light" />
        <div>
          <CardTitle className="text-xl font-bold">
            Profile Information
          </CardTitle>
          <CardDescription className="text-sm">
            Update your personal information and profile details
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CardDescription className={labelStyle}>Avatar</CardDescription>
          <div className="w-full max-w-56">
            <AvatarUpload user={user} onSuccess={handleAvatarSuccess} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel className={labelStyle}>Full Name</FieldLabel>
                    <Input
                      name="fullName"
                      type="text"
                      onChange={handleChange}
                      value={form.fullName}
                      className="h-12 bg-white/5 border-white/10"
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <FieldLabel className={labelStyle}>Email</FieldLabel>
                    <Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={form.email}
                      className="h-12 bg-white/5 border-white/10"
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <FieldLabel className={labelStyle}>User Name</FieldLabel>
                    <Input
                      name="userName"
                      type="text"
                      onChange={handleChange}
                      value={form.userName}
                      className="h-12 bg-white/5 border-white/10"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel className={labelStyle}>Phone</FieldLabel>
                    <div className="input flex items-center">
                      <PhoneInput
                        international
                        defaultCountry="UZ"
                        value={form.phone}
                        disabled={!isEditing}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            phone: value || "",
                          }))
                        }
                        className="w-full"
                        numberInputProps={{
                          className:
                            "flex w-full rounded-lg bg-transparent text-sm outline-none",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <FieldLabel className={labelStyle}>Bio</FieldLabel>
                    <Textarea
                      name="bio"
                      value={form.bio ?? ""}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      className="min-h-32 input resize-none border-white/10 bg-white/5"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-span-2">
                    <FieldLabel className={labelStyle}>Address</FieldLabel>
                    <Input
                      name="address"
                      type="text"
                      onChange={handleChange}
                      value={form.address ?? ""}
                      placeholder="Enter your address"
                      className="h-12 bg-white/5 border-white/10"
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
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
