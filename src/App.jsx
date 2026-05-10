import Header from "./components/layout/Header/Header";
import AppRouter from "./routes/AppRouter";
import Sidebar from "./components/layout/Sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="relative flex min-h-screen bg-bg overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-glow-bottom pointer-events-none" />
        <div className="absolute inset-0 bg-glow-top pointer-events-none" />
        <Sidebar />
        <main className="flex-1 p-6 px-7 relative z-10">
          <Header />
          <AppRouter />
        </main>
      </div>
    </>
  );
}

export default App;
