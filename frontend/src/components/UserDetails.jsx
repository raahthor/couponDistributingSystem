export default function UserDetails({ userStats }) {
  return (
    <section class="py-10">
      <div class="flex flex-col justify-around items-center px-10 lg:px-40">
        <h2 class="text-3xl font-bold mb-8">User Claim History</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Sr. No.
              </th>
              <th className="border border-gray-500 px-2 py-1 text-left">
                User IP
              </th>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Browser Cookie
              </th>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Coupon
              </th>
            </tr>
          </thead>
          <tbody>
            {userStats.map((item,ind) => {
              return (
                <tr key={item.id}>
                  <td className=" truncate border border-gray-500 px-2 py-1">
                    {ind+1}
                  </td>

                  <td className=" truncate border border-gray-500 px-2 py-1">
                    {item.userIP}
                  </td>
                  <td className="truncate border border-gray-500 px-2 py-1">
                    {item.userCookie}
                  </td>
                  <td className="truncate border border-gray-500 px-2 py-1">
                    {item.claimedCoupon}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
