import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "./Shared/Logo";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content p-10 ">
      <div className="footer sm:footer-horizontal mx-auto container">
        <aside>
          <Logo />
          <p>
            Fabrico Knitwear Limited
            <br />
            Supplying Garments since 2020
          </p>
        </aside>
        <div>
          <h3 className="footer-title">Links</h3>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link>
              <FaTwitter size={24} />
            </Link>
            <a>
              <FaYoutube size={26} />
            </a>
            <Link>
              <FaFacebook size={24} />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
