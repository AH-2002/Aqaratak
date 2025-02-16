import Link from "next/link";

export default function Page() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Link href={`/site/home`}>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mr-3">
          Auth
        </button>
      </Link>
      <Link href={`auth/register`}>
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
          Not Auth
        </button>
      </Link>
    </div>
  );
}
