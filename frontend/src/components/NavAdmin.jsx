export default function NavAdmin({ updateIsAdmin }) {
  return (
    <nav class="bg-gray-800/50 backdrop-blur-sm w-full z-50">
      <div class="flex justify-between h-16 p-4">
        <div class="flex items-center">
          <p class="text-xl font-bold ">Admin Page</p>
        </div>
        <button
          onClick={() => updateIsAdmin(false)}
          class="bg-blue-500 rounded-md px-2 text-white hover:bg-blue-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
