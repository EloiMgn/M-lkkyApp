
import { Link } from "react-router-dom";
import CookieConscent from "../CookiesConscent/CookiesConscent";
import "./Footer.scss";

const Footer = () => (
    <footer className="footer">
        <Link to="/mentions" >Mentions Légales</Link> | <CookieConscent /> | <Link to="/bug" >Signaler un problème</Link>
    </footer>
)

export default Footer;