import { Link } from 'react-router-dom';

function FooterLogo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 group">
      <div
        className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-secondary 
                      flex items-center justify-center font-bold text-sm text-primary-foreground
                      group-hover:scale-110 transition-transform"
      >
        P
      </div>
      <span className="font-bold text-xl text-foreground">
        Porti<span className="text-primary font-bold text-xl">fy</span>
      </span>
    </Link>
  );
}

export default FooterLogo
