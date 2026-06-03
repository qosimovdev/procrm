import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import useAuthStore from "@/stores/authStore";
import { useMemo } from "react";
import ProfileCard from "@/components/common/settings/ProfileCard";
import WorkCard from "@/components/common/settings/WorkCard";
import SocialCard from "@/components/common/settings/SocialCard";
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
    lastLogin: "",
    createdAt: "",
    socials: {
      github: "",
      linkedin: "",
      telegram: "",
    },
    teamMember: 0,
  };
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        lastLogin: user.lastLogin || "",
        createdAt: user.createdAt || "",
        socials: {
          github: user.socials?.github || "",
          linkedin: user.socials?.linkedin || "",
          telegram: user.socials?.telegram || "",
        },
        teamMember: user.teamMember || 0,
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
      lastLogin: user?.lastLogin || "",
      createdAt: user?.createdAt || "",
      socials: {
        github: user?.socials?.github || "",
        linkedin: user?.socials?.linkedin || "",
        telegram: user?.socials?.telegram || "",
      },
      teamMember: user?.teamMember || 0,
    }),
    [user],
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socials.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [key]: value,
        },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleChange = (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  const labelStyle = "text-lg text-text-primary font-bold block mb-2";

  return (
    <section>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
        <ProfileCard
          form={form}
          setForm={setForm}
          user={user}
          handleChange={handleChange}
          original={original}
          updateProfile={updateProfile}
          isPending={isPending}
          setUser={setUser}
          labelStyle={labelStyle}
        />
        <WorkCard
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          original={original}
          updateProfile={updateProfile}
          isPending={isPending}
          setUser={setUser}
          labelStyle={labelStyle}
        />
        <SocialCard
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          original={original}
          updateProfile={updateProfile}
          isPending={isPending}
          setUser={setUser}
          labelStyle={labelStyle}
        />
      </div>
    </section>
  );
}

export default ProfileSetting;
