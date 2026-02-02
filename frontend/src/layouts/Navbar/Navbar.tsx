import MainNav from "./MainNav";
import MobileMainNav from "./MobileMainNav";


function Navbar() {
  return (
    <header>
      <div className="hidden lg:block">
        <MainNav />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileMainNav/>
      </div>
    </header>
  );
}

export default Navbar;
