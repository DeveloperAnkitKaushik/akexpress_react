import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./index.module.css";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { GiCrossedBones } from "react-icons/gi";
import { auth } from '../../firebaseConfig';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);
    const isAdmin = user?.email === 'ankitkaushik6270@gmail.com';
    return (
        <>
            <header className={styles.container}>
                <div className={`${styles.innercontainer} maincontainer`}>
                    <Link to="/" className={styles.imagecontainer}>
                        <img src="/logo.png" alt="" className={styles.logo} />
                    </Link>
                    {isMenuOpen ? (
                        <GiCrossedBones
                            size={30}
                            className={`${styles.cross} `}
                            onClick={toggleMenu}
                        />
                    ) : (
                        <MdOutlineStackedLineChart
                            size={30}
                            className={styles.hamburger}
                            onClick={toggleMenu}
                        />
                    )}
                    <nav
                        className={`${styles.links} ${isMenuOpen ? `${styles.menuOpen} ${styles.animationOpen}` : ""
                            }`}
                    >
                        <Link to="/new-shipment" className={styles.link}>New Shipment</Link>
                        <Link to="/shipments" className={styles.link}>Shipments</Link>
                        {isAdmin && <Link to="/admin" className={styles.link}>Admin Panel</Link>}
                        {user ? (
                            <Link onClick={() => auth.signOut()} className={styles.link}>Logout</Link>
                        ) : (
                            <Link to="/login" className={styles.link}>Login</Link>
                        )}
                    </nav>
                </div>
            </header>
            <div className={styles.spacesupport}></div>
        </>
    );
};

export default Navbar;