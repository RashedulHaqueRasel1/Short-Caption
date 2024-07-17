import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="">
            <footer className="footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p> <Link to={'http://rashedul-haque-rasel.vercel.app/'} className="text-blue-300">Rashedul Haque Rasel</Link> © All Rights Reserved.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
