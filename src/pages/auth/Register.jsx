import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    companyName: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="min-h-screen text-text-primary flex">
      {/* background glow */}
      <div className="absolute inset-0 bg-glow-bottom pointer-events-none" />
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />
      {/* left side */}
      <div className="p-4 w-full lg:w-1/2 flex items-center justify-center md:p-6">
        <div className="p-4 w-full max-w-lg glass-strong rounded-3xl md:p-8 shadow-purple">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <h2 className="text-3xl font-bold">Create your account</h2>
                <FieldDescription className="text-base text-gray-400">
                  Get started with your free PRO CRM account.
                </FieldDescription>

                <FieldGroup className="mt-8 space-y-3">
                  <div>
                    <FieldLabel className="mb-2 block text-lg">
                      Full Name
                    </FieldLabel>
                    <Input
                      name="fullName"
                      type="text"
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <FieldLabel className="mb-2 block text-lg">
                      User name
                    </FieldLabel>
                    <Input
                      name="userName"
                      type="text"
                      onChange={handleChange}
                      placeholder="User name"
                      className="h-12 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <FieldLabel className="mb-2 block text-lg">
                      Email
                    </FieldLabel>
                    <Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-12 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <FieldLabel className="mb-2 block text-lg">
                      Password
                    </FieldLabel>
                    <Input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="h-12 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <FieldLabel className="mb-2 block text-lg">
                      Company Name
                    </FieldLabel>
                    <Input
                      name="companyName"
                      type="text"
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      className="h-12 bg-white/5 border-white/10"
                    />
                  </div>

                  <Button
                    disabled={isPending}
                    variant="default"
                    className="w-full h-12 btn-primary rounded-xl text-lg cursor-pointer"
                  >
                    {isPending ? "Creating Account" : "Create Account"}
                  </Button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-sm">
                      or continue with
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <p className="text-text-secondary text-center text-base pb-2">
                    Already have an account?{" "}
                    <span
                      className="text-gradient cursor-pointer"
                      onClick={() => navigate("/auth/login")}
                    >
                      {" "}
                      Sign in
                    </span>
                  </p>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-white/10">
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* logo */}
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="Logo" />
            <h1 className="text-2xl font-bold">PRO CRM</h1>
          </div>
          {/* content */}
          <div className="max-w-xl">
            <span className="px-4 py-2 !rounded-full glass text-violet-300 text-sm">
              All-in-one CRM Solution
            </span>
            <h2 className="text-6xl font-bold leading-tight mt-6">
              Welcome to <br />
              <span className="text-gradient">PRO CRM</span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 leading-8">
              Manage your clients, projects and team in one place. Grow your
              business with smart CRM tools.
            </p>
            {/* mock dashboard */}
            <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-text-danger" />
                  <div className="w-3 h-3 rounded-full bg-text-warning" />
                  <div className="w-3 h-3 rounded-full bg-text-success" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-black/30 rounded-2xl p-4">
                  <p className="text-sm text-gray-400">Total Clients</p>
                  <h4 className="text-3xl font-bold mt-2">1,250</h4>
                </div>
                <div className="bg-black/30 rounded-2xl p-4">
                  <p className="text-sm text-gray-400">Revenue</p>
                  <h4 className="text-3xl font-bold mt-2">$24,560</h4>
                </div>
              </div>
              <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-white/10 flex items-end p-4">
                <div className="w-full h-24 border-t border-l border-violet-400/30 rounded-tl-3xl" />
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/40?img=1"
                className="w-10 h-10 rounded-full border-2 border-[#070B14]"
              />
              <img
                src="https://i.pravatar.cc/40?img=2"
                className="w-10 h-10 rounded-full border-2 border-[#070B14]"
              />
              <img
                src="https://i.pravatar.cc/40?img=3"
                className="w-10 h-10 rounded-full border-2 border-[#070B14]"
              />
            </div>
            <p className="text-gray-400">
              Trusted by <span className="text-white">10,000+</span> teams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
