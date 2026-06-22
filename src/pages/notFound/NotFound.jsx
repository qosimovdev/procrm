import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-muted">
            <Frown className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>

        <h2 className="text-xl text-text-primary font-semibold mb-3">
          Page not found
        </h2>

        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            Go Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
