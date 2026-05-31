import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import useAuthStore from "@/stores/authStore";
import { Building2 } from "lucide-react";
import { useMemo } from "react";
import AvatarUpload from "@/components/common/settings/AvatarUpload";

function ProfileSetting() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const initialForm = {
    fullName: "",
    email: "",
    userName: "",
    phone: "",
    bio: "",
    address: "",
    avatar: "",
    department: "",
    position: "",
    role: "",
    company: "",
    status: "",
    socials: {},
  };
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        userName: user.userName || "",
        phone: user.phone || "",
        bio: user.bio || "",
        address: user.address || "",
        avatar: user.avatar || "",
        department: user.department || "",
        position: user.position || "",
        role: user.role || "",
        company: user.company || "",
        status: user.status || "",
        socials: user.socials || {},
      });
    }
  }, [user]);
  const original = useMemo(
    () => ({
      fullName: user?.fullName || "",
      email: user?.email || "",
      userName: user?.userName || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      address: user?.address || "",
      avatar: user?.avatar || "",
      department: user?.department || "",
      position: user?.position || "",
      role: user?.role || "",
      company: user?.company || "",
      status: user?.status || "",
      socials: user?.socials || {},
    }),
    [user],
  );
  const isChanged = useMemo(() => {
    return JSON.stringify(form) !== JSON.stringify(original);
  }, [form, original]);
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form, {
      onSuccess: (res) => {
        setUser(res.user || form);
      },
    });
  };
  const handleAvatarSuccess = (res) => {
    const avatar = res?.avatar || res?.data?.avatar;
    setForm((prev) => ({
      ...prev,
      avatar,
    }));
  };
  return (
    <section>
      <div className="grid grid-cols-2 gap-5 mt-5">
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
          <CardContent>
            <div>
              <CardDescription>Avatar</CardDescription>
              <AvatarUpload user={user} onSuccess={handleAvatarSuccess} />
              <form onSubmit={handleSubmit}>
                <button disabled={isPending || !isChanged}>
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
        <Card></Card>
      </div>
    </section>
  );
}

export default ProfileSetting;
