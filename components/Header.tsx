import { useState, useEffect, useCallback } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

function Header() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  //Sets isScrolled state for displaying navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <header className={`${isScrolled && "bg-neutral-950/80"}`}>
      <div className="flex items-center space-x-4 md:space-x-10">
        <img src="/logo.png" alt="logo" className="h-4 lg:h-7" />

        <div
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-row items-center gap-2 pl-3 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <ul className="hidden space-x-4 md:flex">
          <li
            className="cursor-pointer text-sm text-white transition duration-10 hover:text-[#ebebeb]"
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer text-sm text-white transition duration-10 hover:text-[#ebebeb]"
            onClick={() => router.push("/tv")}
          >
            TV Shows
          </li>
          <li
            className="cursor-pointer text-sm text-white transition duration-10 hover:text-[#ebebeb]"
            onClick={() => router.push("/movies")}
          >
            Movies
          </li>
          <li
            className="cursor-pointer text-sm text-white transition duration-10 hover:text-[#ebebeb]"
            onClick={() => router.push("/new")}
          >
            New & Popular
          </li>
          <li
            className="cursor-pointer text-sm text-white transition duration-10 hover:text-[#ebebeb]"
            onClick={() => router.push("/mylist")}
          >
            My List
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <MagnifyingGlassIcon className="w-6 cursor-pointer" />
        <BellIcon className="w-6 cursor-pointer" />

        <div
          onClick={toggleAccountMenu}
          className="flex flex-row items-center gap-2 cursor-pointer relative"
        >
          <div className="w-6 h-6 rounded-md overflow-hidden">
            <img src="/profile.png" alt="account menu" />
          </div>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showAccountMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <AccountMenu visible={showAccountMenu} />
        </div>
      </div>
    </header>
  );
}

export default Header;
