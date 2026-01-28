import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col p-4 space-y-4">
        <div className="text-xl font-bold text-blue-500 mb-6">TechnoKids</div>
        <nav className="flex-1 space-y-2">
          <Link to="/dashboard" className="block p-2 hover:bg-zinc-900 rounded">Dashboard</Link>
          <Link to="/dashboard/exams" className="block p-2 hover:bg-zinc-900 rounded">Exams</Link>
        </nav>
        <button onClick={logout} className="text-left p-2 hover:text-red-400">Logout</button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}