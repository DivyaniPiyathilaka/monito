import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronRight,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import petImage from "../assets/images/banner/pets.png";

const Category = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [puppyCount, setPuppyCount] = useState(0);
  const [filters, setFilters] = useState({
    gender: [],
    color: [],
    price: { min: "", max: "" },
    breed: [],
    sortBy: "popular", // Default sorting
  });
  const [sortedPets, setSortedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 6;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "https://monitor-backend-rust.vercel.app/api/pets"
        );
        const data = await response.json();
        setPets(data);
        setPuppyCount(data.length);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let filteredPets = [...pets];

    if (filters.gender.length) {
      filteredPets = filteredPets.filter((pet) =>
        filters.gender.includes(pet.gender)
      );
    }

    if (filters.color.length) {
      filteredPets = filteredPets.filter((pet) =>
        filters.color.includes(pet.color)
      );
    }

    if (filters.price.min !== "" || filters.price.max !== "") {
      const minPrice = parseInt(filters.price.min.replace(/\D/g, "")) || 0;
      const maxPrice =
        parseInt(filters.price.max.replace(/\D/g, "")) || Infinity;
      filteredPets = filteredPets.filter((pet) => {
        const petPrice = parseInt(pet.price.replace(/\D/g, ""));
        return petPrice >= minPrice && petPrice <= maxPrice;
      });
    }

    if (filters.sortBy === "price") {
      filteredPets.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ""));
        const priceB = parseInt(b.price.replace(/\D/g, ""));
        return priceA - priceB;
      });
    }

    setSortedPets(filteredPets);
    setPuppyCount(filteredPets.length);
  }, [filters, pets]);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      if (type === "gender" || type === "color" || type === "breed") {
        const newValues = prevFilters[type].includes(value)
          ? prevFilters[type].filter((v) => v !== value)
          : [...prevFilters[type], value];
        return { ...prevFilters, [type]: newValues };
      } else if (type === "price") {
        return { ...prevFilters, price: { ...prevFilters.price, ...value } };
      }
      return prevFilters;
    });
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = sortedPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(sortedPets.length / petsPerPage);

  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="extra-padding">
      <div className="text-gray-500 mb-4 text-xs flex items-center">
        <span className="text-xs">Home</span>
        <FaChevronRight className="mx-4 text-xs" />{" "}
        <span className="text-xs">Dog</span>
        <FaChevronRight className="mx-4 text-xs" />
        <span className="text-xs">Small</span>
      </div>

      {/* Banner Section */}
      {/* Desktop Banner - Hidden on Mobile */}
      <div className="relative bg-gradient-to-r from-[#FCEED5] to-[#FFE7BA] rounded-xl px-12 py-6 flex justify-end items-center mb-6 overflow-hidden hidden md:flex">
        <div
          className="absolute bg-[#103559]"
          style={{
            width: "800px",
            height: "800px",
            transform: "translate(-10%, -25%) rotate(-20deg)",
            left: "50%",
            top: "50%",
            zIndex: 1,
            borderRadius: "10%",
          }}
        ></div>

        <div className="w-3/5 flex justify-center relative z-10">
          <img src={petImage} alt="Pets" className="rounded-lg -mb-6" />
        </div>
        <div className="text-right w-2/5 relative z-10">
          <h2 className="text-5xl text-white font-extrabold">
            One More Friend
          </h2>
          <p className="text-4xl text-white font-extrabold">
            Thousands More Fun!
          </p>
          <p className="text-xs text-white mt-2 leading-relaxed text-right">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>
          <div className="flex justify-center mt-6">
            <button className="bg-transparent border border-white text-white rounded-full px-2 py-1 flex items-center">
              View Intro
              <span className="ml-1 flex items-center justify-center w-6 h-6 border border-white rounded-full">
                <span className="text-white text-xs">▶</span>
              </span>
            </button>
            <button className="bg-white text-[#003459] rounded-full px-4 py-2 ml-2">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Banner - Hidden in Desktop */}
      <div className="relative bg-gradient-to-r from-[#FCEED5] to-[#FFE7BA] rounded-xl px-4 py-6 flex flex-col justify-between mb-6 overflow-hidden md:hidden">
        {/* Large blue square for Mobile */}
        <div
          className="absolute bg-[#103559]"
          style={{
            width: "300px",
            height: "300px",
            transform: "translate(-50%, -50%) rotate(-20deg)",
            left: "50%",
            top: "20%",
            zIndex: 1,
            borderRadius: "10%",
          }}
        ></div>

        {/* Text and Buttons Section */}
        <div className="text-left w-full relative z-10">
          <h2 className="text-3xl text-white font-extrabold">
            One More Friend
          </h2>
          <p className="text-xl text-white font-extrabold">
            Thousands More Fun!
          </p>
          <p className="text-xs text-white mt-2 leading-relaxed">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-transparent border border-white text-white rounded-full px-3 py-1 flex items-center">
              View Intro
              <span className="ml-1 flex items-center justify-center w-6 h-6 border border-white rounded-full">
                <span className="text-white text-xs">▶</span>
              </span>
            </button>
            <button className="bg-white text-[#003459] rounded-full px-4 py-2 ml-2">
              Explore Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full mt-4 relative z-10">
          <img
            src={petImage}
            alt="Pets"
            className="rounded-lg w-full h-auto object-cover -mb-6"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="hidden md:flex">
        {" "}
        {/* Filter Section (1/3) */}
        <div className="w-1/3 pr-4">
          <h3 className="text-[#003459] font-extrabold text-2xl mb-2">
            Filter
          </h3>
          <div className="mb-4">
            <h4 className="text-black font-extrabold text-lg">Gender:</h4>
            <label className="block">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("gender", "Male")}
              />
              <span className="text-black text-base ml-1">Male</span>
            </label>
            <label className="block">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("gender", "Female")}
              />
              <span className="text-black text-base ml-1">Female</span>
            </label>
          </div>
          <div className="mb-4">
            <h4 className="text-black font-extrabold text-lg">Color:</h4>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Red")}
              />
              <span className="w-4 h-4 rounded-full border bg-red-500 mr-2"></span>
              <span className="text-black text-base">Red</span>
            </label>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Apricot")}
              />
              <span className="w-4 h-4 rounded-full border bg-orange-500 mr-2"></span>
              <span className="text-black text-base">Apricot</span>
            </label>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Black")}
              />
              <span className="w-4 h-4 rounded-full border bg-black mr-2"></span>
              <span className="text-black text-base">Black</span>
            </label>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Black and White")}
              />
              <span
                className="w-4 h-4 rounded-full border mr-2"
                style={{
                  background: "linear-gradient(to right, black 50%, white 50%)",
                }}
              ></span>
              <span className="text-black text-base">Black and White</span>
            </label>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Silver")}
              />
              <span className="w-4 h-4 rounded-full border bg-gray-400 mr-2"></span>
              <span className="text-black text-base">Silver</span>
            </label>
            <label className="block flex items-center">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("color", "Tan")}
              />
              <span className="w-4 h-4 rounded-full border bg-brown-500 mr-2"></span>
              <span className="text-black text-base">Tan</span>
            </label>
          </div>
          <div className="mb-4">
            <h4 className="text-black font-extrabold text-lg">Price:</h4>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="border rounded-md p-1 w-1/2"
                onChange={(e) =>
                  handleFilterChange("price", { min: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="border rounded-md p-1 w-1/2"
                onChange={(e) =>
                  handleFilterChange("price", { max: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-black font-extrabold text-lg">Breed:</h4>
            <label className="block">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("breed", "Small")}
              />
              <span className="text-black text-base ml-1">Small</span>
            </label>
            <label className="block">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("breed", "Medium")}
              />
              <span className="text-black text-base ml-1">Medium</span>
            </label>
            <label className="block">
              <input
                type="checkbox"
                className="border border-light-gray rounded-md"
                onChange={() => handleFilterChange("breed", "Large")}
              />
              <span className="text-black text-base ml-1">Large</span>
            </label>
          </div>
        </div>
        {/* Pets Section  */}
        <div className="w-2/3">
          <div className="flex items-center mb-4">
            <h3 className="text-[#003459] font-extrabold text-2xl mr-2">
              Small Dog
            </h3>
            <span className="text-gray-500 text-sm">{puppyCount} puppies</span>
            <div className="ml-auto flex items-center border border-light-gray rounded-full">
              <div className="flex items-center px-3 py-1">
                <span className="text-gray-500 text-sm mr-4">Sort by:</span>
                <select
                  className="bg-transparent text-gray-500 focus:outline-none"
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="popular">Popular</option>
                  <option value="price">Price</option>
                  <option value="age">Age</option>
                </select>
              </div>
            </div>
          </div>

          {/* Display Pets */}
          <div className="grid grid-cols-3 gap-4">
            {!loading ? (
              currentPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-[#f7f9fc] rounded-lg p-2 shadow-md"
                >
                  <img
                    src={pet.image}
                    alt={pet.breed}
                    className="w-full h-48 object-cover"
                    style={{ borderRadius: "5px", aspectRatio: "1 / 1" }}
                  />
                  <h4 className="font-extrabold text-md">
                    {pet.id} - {pet.breed}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    <span className="font-normal">Gender:</span>
                    <span className="font-bold">{pet.gender}</span> •
                    <span className="font-normal"> Age:</span>
                    <span className="font-bold">{pet.age}</span>
                  </p>
                  <p className="font-extrabold text-sm">{pet.price}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="mx-1 px-2 py-1 text-[#003459]"
            >
              <FaArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#003459] text-white"
                    : "text-[#003459] bg-transparent"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="mx-1 px-2 py-1 text-[#003459]"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {" "}
        {/* Mobile view hidden on larger screens */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center border border-light-gray rounded-full p-1">
            <span className="text-gray-500 text-sm mr-2">Sort by:</span>
            <select
              className="bg-transparent text-gray-500 focus:outline-none"
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="price">Price</option>
              <option value="age">Age</option>
            </select>
          </div>
          <button
            className="flex items-center text-[#003459]"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="mr-1" />
            <span>Filters</span>
          </button>
        </div>
        {/* Section Name and Puppy Count */}
        <div className="flex items-center mb-4">
          <h3 className="text-[#003459] font-extrabold text-xl mr-2">
            Small Dog
          </h3>
          <span className="text-gray-500 text-sm">{puppyCount} puppies</span>
        </div>
        {/* Display Pets */}
        <div className="grid grid-cols-2 gap-4">
          {!loading ? (
            currentPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-[#f7f9fc] rounded-lg p-2 shadow-md"
              >
                <img
                  src={pet.image}
                  alt={pet.breed}
                  className="w-full h-48 object-cover"
                  style={{ borderRadius: "5px", aspectRatio: "1 / 1" }}
                />
                <h4 className="font-extrabold text-md">
                  {pet.id} - {pet.breed}
                </h4>
                <p className="text-gray-500 text-xs">
                  <span className="font-normal">Gender:</span>
                  <span className="font-bold">{pet.gender}</span> •
                  <span className="font-normal"> Age:</span>
                  <span className="font-bold">{pet.age}</span>
                </p>
                <p className="font-extrabold text-sm">{pet.price}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mx-1 px-2 py-1 text-[#003459]"
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#003459] text-white"
                  : "text-[#003459] bg-transparent"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="mx-1 px-2 py-1 text-[#003459]"
          >
            <FaArrowRight />
          </button>
        </div>
        {/* Modal for Filters */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-11/12 relative">
              {/* Close button */}
              <button
                className="absolute top-2 right-2"
                onClick={() => setShowFilterModal(false)}
              >
                <FaTimes />
              </button>

              {/* Filter content */}
              <div className="mb-4">
                <h3 className="text-[#003459] font-extrabold text-2xl mb-2">
                  Filter
                </h3>

                {/* Gender Filter */}
                <div className="mb-4">
                  <h4 className="text-black font-extrabold text-lg">Gender:</h4>
                  <label className="block">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("gender", "Male")}
                      checked={filters.gender?.includes("Male") || false}
                    />
                    <span className="text-black text-base ml-1">Male</span>
                  </label>
                  <label className="block">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("gender", "Female")}
                      checked={filters.gender?.includes("Female") || false}
                    />
                    <span className="text-black text-base ml-1">Female</span>
                  </label>
                </div>

                {/* Color Filter */}
                <div className="mb-4">
                  <h4 className="text-black font-extrabold text-lg">Color:</h4>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("color", "Red")}
                      checked={filters.color?.includes("Red") || false}
                    />
                    <span className="w-4 h-4 rounded-full border bg-red-500 mr-2"></span>
                    <span className="text-black text-base">Red</span>
                  </label>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("color", "Apricot")}
                      checked={filters.color?.includes("Apricot") || false}
                    />
                    <span className="w-4 h-4 rounded-full border bg-orange-500 mr-2"></span>
                    <span className="text-black text-base">Apricot</span>
                  </label>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("color", "Black")}
                      checked={filters.color?.includes("Black") || false}
                    />
                    <span className="w-4 h-4 rounded-full border bg-black mr-2"></span>
                    <span className="text-black text-base">Black</span>
                  </label>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() =>
                        handleFilterChange("color", "Black and White")
                      }
                      checked={
                        filters.color?.includes("Black and White") || false
                      }
                    />
                    <span
                      className="w-4 h-4 rounded-full border mr-2"
                      style={{
                        background:
                          "linear-gradient(to right, black 50%, white 50%)",
                      }}
                    ></span>
                    <span className="text-black text-base">
                      Black and White
                    </span>
                  </label>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("color", "Silver")}
                      checked={filters.color?.includes("Silver") || false}
                    />
                    <span className="w-4 h-4 rounded-full border bg-gray-400 mr-2"></span>
                    <span className="text-black text-base">Silver</span>
                  </label>
                  <label className="block flex items-center">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("color", "Tan")}
                      checked={filters.color?.includes("Tan") || false}
                    />
                    <span className="w-4 h-4 rounded-full border bg-brown-500 mr-2"></span>
                    <span className="text-black text-base">Tan</span>
                  </label>
                </div>

                {/* Price Filter */}
                <div className="mb-4">
                  <h4 className="text-black font-extrabold text-lg">Price:</h4>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="border rounded-md p-1 w-1/2"
                      onChange={(e) =>
                        handleFilterChange("price", { min: e.target.value })
                      }
                      value={filters.price?.min || ""}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="border rounded-md p-1 w-1/2"
                      onChange={(e) =>
                        handleFilterChange("price", { max: e.target.value })
                      }
                      value={filters.price?.max || ""}
                    />
                  </div>
                </div>

                {/* Breed Filter */}
                <div className="mb-4">
                  <h4 className="text-black font-extrabold text-lg">Breed:</h4>
                  <label className="block">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("breed", "Small")}
                      checked={filters.breed?.includes("Small") || false}
                    />
                    <span className="text-black text-base ml-1">Small</span>
                  </label>
                  <label className="block">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("breed", "Medium")}
                      checked={filters.breed?.includes("Medium") || false}
                    />
                    <span className="text-black text-base ml-1">Medium</span>
                  </label>
                  <label className="block">
                    <input
                      type="checkbox"
                      className="border border-light-gray rounded-md"
                      onChange={() => handleFilterChange("breed", "Large")}
                      checked={filters.breed?.includes("Large") || false}
                    />
                    <span className="text-black text-base ml-1">Large</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
