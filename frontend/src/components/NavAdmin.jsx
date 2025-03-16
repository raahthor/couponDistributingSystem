export default function NavAdmin({ updateIsAdmin }) {
  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm w-full z-50">
      <div className="flex justify-between h-16 p-4">
        <div className="flex items-center">
          <p className="text-xl font-bold ">Admin Page</p>
        </div>
        <button
          onClick={() => updateIsAdmin(false)}
          className="bg-blue-500 rounded-md px-2 text-white hover:bg-blue-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
