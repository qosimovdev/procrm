import { useState } from "react";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { FieldLabel } from "../../ui/field";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Edit, LockKeyhole, Save, X } from "lucide-react";

function SecurityCard({ labelStyle }) {
  const { mutate: changePassword, isPending } = useChangePassword();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    changePassword(passwordForm, {
      onSuccess: () => {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsEditing(false);
      },
    });
  };
  return (
    <section>
      <Card>
        <CardHeader className="flex gap-4 items-start text-text-primary">
          <LockKeyhole className="text-primary-light" />
          <div>
            <CardTitle className="text-xl font-bold">Change Password</CardTitle>
            <CardDescription className="text-sm">
              Update your password regularly to keep your account secure
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8">
          <div>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <FieldLabel className={labelStyle}>
                      Current Password
                    </FieldLabel>
                    <Input
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <FieldLabel className={labelStyle}>New Password</FieldLabel>
                    <Input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <FieldLabel className={labelStyle}>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-end gap-3 mt-5">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn-primary p-4 text-sm cursor-pointer"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Change Password
                  </Button>
                ) : (
                  <>
                    <Button
                      className="p-4 text-text-primary text-sm cursor-pointer"
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPasswordForm({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setIsEditing(false);
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={isPending}
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
    </section>
  );
}

export default SecurityCard;
