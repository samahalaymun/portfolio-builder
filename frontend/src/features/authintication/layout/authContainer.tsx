import { Outlet } from 'react-router-dom';

function AuthContainer() {
  return (
    <main className="min-h-screen px-4 lg:px-10 flex md:items-center">
      <Outlet />
    </main>
  );
}

export default AuthContainer
