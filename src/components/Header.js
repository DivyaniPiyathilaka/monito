import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";

// Currency icons (PNG)
import USDIcon from "../assets/images/currency/usd.png";
import EURIcon from "../assets/images/currency/eur.png";
import GBPIcon from "../assets/images/currency/gbp.png";
import JPYIcon from "../assets/images/currency/jpy.png";
import VNDIcon from "../assets/images/currency/vnd.png";

const currencyOptions = [
  {
    code: "USD",
    label: "USD",
    icon: <img src={USDIcon} alt="USD" className="w-5 h-5" />,
  },
  {
    code: "EUR",
    label: "EUR",
    icon: <img src={EURIcon} alt="EUR" className="w-5 h-5" />,
  },
  {
    code: "GBP",
    label: "GBP",
    icon: <img src={GBPIcon} alt="GBP" className="w-5 h-5" />,
  },
  {
    code: "JPY",
    label: "JPY",
    icon: <img src={JPYIcon} alt="JPY" className="w-5 h-5" />,
  },
  {
    code: "VND",
    label: "VND",
    icon: <img src={VNDIcon} alt="VND" className="w-5 h-5" />,
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[4]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md container mx-auto">
      <nav className="flex items-center justify-between w-full ">
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <FaBars
            className="text-[#003459] text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Logo in the center for mobile, left for desktop */}
        <img src={logo} alt="Logo" className="h-10 mx-auto lg:mx-0 lg:hidden" />

        {/* Desktop Logo */}
        <img src={logo} alt="Logo" className="h-10 hidden lg:block" />

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden lg:flex space-x-10 flex-grow justify-center">
          <Link
            to="/"
            className="text-[#003459] font-extrabold hover:underline"
          >
            Home
          </Link>
          <Link
            to="/category"
            className="text-[#003459] font-extrabold hover:underline"
          >
            Category
          </Link>
          <Link
            to="/about"
            className="text-[#003459] font-extrabold hover:underline"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[#003459] font-extrabold hover:underline"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Search Icon */}
        <div className="lg:hidden">
          <FaSearch className="text-[#003459] text-2xl" />
        </div>

        {/* Search bar for Desktop */}
        <div className="relative hidden lg:flex items-center mx-4">
          <input
            type="text"
            placeholder="Search something here!"
            className="rounded-full px-4 py-2 pl-10 text-gray-500 w-80 bg-gray-100 border-none"
          />
          <FaSearch className="absolute left-3 text-gray-400" />
        </div>

        {/* Join and Currency Options for Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="bg-[#003459] text-white font-extrabold px-4 py-2 rounded-full hover:bg-[#00233D]">
            Join the community
          </button>

          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              {selectedCurrency.icon}
              <span className="text-[#003459]">{selectedCurrency.code}</span>
              <FaChevronDown className="text-[#003459] text-sm" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {currencyOptions.map((currency) => (
                  <div
                    key={currency.code}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency.icon}
                    <span className="ml-2">{currency.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[#003459] text-white z-50">
          <div className="flex justify-between items-center p-4">
            {/* Close Icon */}
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
            <img src={logo} alt="Logo" className="h-10 mx-auto" />
            <FaSearch className="text-2xl cursor-pointer" />
          </div>

          <div className="flex flex-col items-start mt-8 space-y-4 p-4">
            <Link to="/" className="text-white text-lg" onClick={toggleSidebar}>
              Home
            </Link>
            <Link
              to="/category"
              className="text-white text-lg"
              onClick={toggleSidebar}
            >
              Category
            </Link>
            <Link
              to="/about"
              className="text-white text-lg"
              onClick={toggleSidebar}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white text-lg"
              onClick={toggleSidebar}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
