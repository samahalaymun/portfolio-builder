import ThemeToggle from '@/layouts/Navbar/ThemeToggle';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function AuthContainer() {
  return (
    <main className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "14px",
            zIndex: 9999,
          },
        }}
      />
      <Outlet />
      <footer>
        <div className="px-4 lg:px-10 py-6 border-t border-border bg-background/60">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Portfol.io. All rights reserved.
            </p>

            {/* Right: Theme toggle + status */}
            <div className="flex items-center gap-6">
              {/* Status indicator */}
              <p
                className="flex items-center gap-2 text-sm text-muted-foreground 
                           hover:text-foreground transition-colors group"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full 
                                   bg-green-400 opacity-75"
                  ></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="group-hover:text-primary transition-colors">
                  All systems operational
                </span>
              </p>

              {/* Theme toggle */}
              <ThemeToggle className="text-muted-foreground hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default AuthContainer
