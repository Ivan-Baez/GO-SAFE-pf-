export default function Footer() {
  return (
    <footer className="w-full bg-[#e9e7e4] px-6 py-12 md:px-10 lg:px-20">
      
      <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-5">

        <div>
          <h2 className="text-2xl font-semibold">GoSafe</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Conecta con la aventura
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Help / FAQ</li>
            <li>Affiliates</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">More</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Low fare tips</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow us</h4>

          <div className="flex gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
              f
            </div>

            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
              ig
            </div>

            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
              tw
            </div>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        All rights gosafe@gmail.com
      </div>

    </footer>
  );
}