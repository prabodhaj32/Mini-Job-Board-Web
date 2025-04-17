import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🧑‍💼 Job Board</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
            <Link href="/dashboard" className="hover:underline">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
        <p className="text-lg text-gray-600 mb-6">
          Browse opportunities or post a job — it's quick and easy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Register
          </Link>
          <Link href="/login" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Login
          </Link>
          <Link href="/dashboard" className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
            Admin Dashboard
          </Link>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500 border-t">
        Built with <span className="font-semibold">Next.js</span> & TailwindCSS — © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

