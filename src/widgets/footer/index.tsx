export default function Footer() {
  return (
    <footer className="mt-auto bg-linear-to-r from-slate-50 to-gray-100 z-(--z-footer) h-(--footer-height)">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <span>Local Weather. Developed by</span>{" "}
            <span className="font-semibold text-gray-800">Devinix</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
