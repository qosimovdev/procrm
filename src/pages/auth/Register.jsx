export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl grid grid-cols-2 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-10 text-white flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Create your CRM</h1>
          <p className="mt-3 text-sm opacity-80">
            Manage teams, projects and tasks in one place
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold mb-6">Register</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 border rounded-lg"
            />

            <button className="w-full bg-violet-600 text-white p-3 rounded-lg hover:bg-violet-700">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
