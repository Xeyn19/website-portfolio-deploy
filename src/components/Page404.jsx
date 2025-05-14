import { useNavigate } from "react-router-dom";
import errorimage from '/computer.png'
export default function ErrorPage() {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-5 max-xl:text-center">
      <img src={errorimage} alt="404" className="w-40" />
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-600">Sorry, we couldn’t find the page you were looking for. Let’s get you back to where you need to be.</p>
      <button onClick={() => navigate('/')} className=" px-4 py-2 cursor-pointer bg-yellow-600 text-white rounded">Go to Home</button>
    </div>
  );
}
