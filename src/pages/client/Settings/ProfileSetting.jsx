import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import useAuthStore from "@/stores/authStore";
import { useMemo } from "react";
import ProfileCard from "@/components/common/settings/ProfileCard";
import WorkCard from "@/components/common/settings/WorkCard";
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
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
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
        {/* <Card>
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
              <form onSubmit={handleProfileSubmit}>
                <FieldGroup>
                  <FieldSet>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel className={labelStyle}>
                          Full Name
                        </FieldLabel>
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
                        <FieldLabel className={labelStyle}>
                          User Name
                        </FieldLabel>
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
        </Card> */}
        {/* <Card>
          <CardHeader className="flex gap-4 items-start text-text-primary">
            <BriefcaseBusiness className="text-primary-light" />
            <div>
              <CardTitle className="text-xl font-bold">
                Work Information
              </CardTitle>
              <CardDescription className="text-sm">
                Update your work related information
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWorkSubmit}>
              <FieldGroup>
                <FieldSet className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    <FieldLabel className={labelStyle}>Department</FieldLabel>
                    <CustomSelect
                      value={form.department}
                      disabled={!isEditingWork}
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
                      disabled={!isEditingWork}
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
                </FieldSet>
              </FieldGroup>
              <div className="flex justify-end gap-3 mt-5">
                {!isEditingWork ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditingWork(true)}
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
                        setIsEditingWork(false);
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
          </CardContent>
        </Card> */}
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
      </div>
    </section>
  );
}

export default ProfileSetting;
