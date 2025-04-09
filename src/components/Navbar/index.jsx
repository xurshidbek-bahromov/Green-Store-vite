import { Search, ShoppingCart, Heart, User, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from 'antd';
import { Link, NavLink, useNavigate} from "react-router-dom";
import Auth from "../Auth";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";



export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true); setIsLoginOpen(true); setIsRegisterOpen(false);
  };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    setUser(user);
    if (user) {
      setIsLogged(true);
    }
  }, [isLogged])
  return (
    <nav className="top-0 sticky w-full z-50 bg-white">
      <div className="flex justify-between items-center max-w-[1240px] mx-auto py-5">
        <Link href="/" className="logo">
          <img src="/images/logo.svg" alt="logo" width={150} height={35} priority />
        </Link>
        <ul className="flex gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={({ isActive }) => `py-[29px] border-b-2 transition hover:text-[#46A358] ${isActive ? "border-[#46A358] text-[#46A358]" : "border-transparent "}`}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <SearchBar />
          <button className="relative cursor-pointer mx-6 hover:text-[#46A358] transition-all">
            <ShoppingCart size={24} />
            {cartItems > 0 && (
              <div className="absolute -top-3 -right-3 text-xs grid place-items-center text-white rounded-full border-2 border-white bg-[#46A358] w-[25px] h-[25px]">
                {cartItems}
              </div>
            )}
          </button>
          {isLogged ? (
            <div className="flex items-center gap-3">
              <button onClick={() => router("/profile/account")} className="bg-[#46A358] logo  px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                <User size={16} /> {user?.user?.name || "User"}
              </button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={showModal} className="bg-[#46A358] font-semibold hover:bg-[#46A358]/70 px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                <LogOutIcon size={16} className="font-semibold" /> Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1280px] m-auto h-[2px] ">
        <hr className="bg-[#46a3597f] border-none w-full h-[2px]"></hr>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Auth isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsLogged={setIsLogged} />
      </Modal>
    </nav>
  );
}
