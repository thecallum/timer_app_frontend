import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="bg-slate-700 w-40 p-2 flex-shrink-0 text-white flex flex-col justify-between items-start">
      <div className="w-full">
        <h2 className="text-slate-400 text-xs mb-1">Track</h2>
        <hr className="w-full border-slate-400 mb-2" />

        <ul>
          <li>
            <Link href="/calendar">Calendar</Link>
          </li>
          <li className="line-through">Analytics</li>
        </ul>

        <h2 className="text-slate-400 text-xs mt-4 mb-1">Manage</h2>
        <hr className="w-full border-slate-400 mb-2" />
        <ul>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-slate-400 text-xs mb-1">Profile</h2>
        <hr className="w-full border-slate-400 mb-2" />

        <ul>
          <li className="line-through">Account</li>
          <li className="line-through">Sign out</li>
        </ul>
      </div>
    </nav>
  );
};
