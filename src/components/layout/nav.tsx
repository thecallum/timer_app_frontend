export const Nav = () => {
  return (
    <nav className="bg-slate-700 w-32 p-2 flex-shrink-0 text-white flex flex-col justify-between items-start">
      <div className="w-full">
        <h2 className="text-slate-400 text-xs mb-1">Track</h2>
        <hr className="w-full border-slate-400 mb-2" />

        <ul>
          <li>Timer</li>
          <li>Calendar</li>
          <li>Analytics</li>
        </ul>

        <h2 className="text-slate-400 text-xs mt-4 mb-1">Manage</h2>
        <hr className="w-full border-slate-400 mb-2" />
        <ul>
          <li>Projects</li>
        </ul>
      </div>

      <div>
        <h2 className="text-slate-400 text-xs mb-1">Profile</h2>
        <hr className="w-full border-slate-400 mb-2" />

        <ul>
          <li>Account</li>
          <li>Sign out</li>
        </ul>
      </div>
    </nav>
  );
};
