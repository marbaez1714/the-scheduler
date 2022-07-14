import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col flex-grow h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h1 className="text-2xl">Dad, how did you get here?</h1>
      <p>I didn't think it was possible to get here but it looks like you're here now.</p>
      <p>Just click the link below to go back to the safety of the app.</p>
      <Link to="/" className="underline text-blue-500">
        Back to Safety
      </Link>
    </div>
  );
};
