import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content p-10 ">
      <div className="footer sm:footer-horizontal mx-auto container">
        <aside>
          <Logo />
          <p>
            FabriChain Knitwear Limited
            <br />
            Supplying Garments since 2020
          </p>
        </aside>
        <div>
          <h3 className="footer-title">Links</h3>
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
        </div>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter size={24} />
            </a>
            <a>
              <FaYoutube size={26} />
            </a>
            <a>
              <FaFacebook size={24} />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
