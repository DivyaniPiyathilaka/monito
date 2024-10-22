import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch pets data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://monitor-backend-rust.vercel.app/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          "https://monitor-backend-rust.vercel.app/api/pets"
        );
        setPets(response.data); // Store data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching pet data");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProducts();
    fetchPets(); // Call the function
  }, []);

  if (loading) {
    return <p>Loading pets...</p>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there's an issue
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="extra-padding p-4">
      {/* Banner 1 */}

      <section
        className="bg-[#FCEED5] relative overflow-hidden rounded-3xl min-h-[600px]"
        style={{
          backgroundImage: `url(${require("../assets/images/Home/HeroBanner.png")})`, // Ensure the image path is correct
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-4">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 mt-20">
            <h1 className="text-5xl text-[#003459] font-gilroy font-bold leading-snug">
              One More Friend <br />
            </h1>
            <span className="text-4xl text-[#003459] font-gilroy font-semibold">
              Thousands More Fun!
            </span>
            <p className="mt-4 text-lg text-gray-700 font-gilroy">
              Having a pet means you have more joy, a new friend, a happy person
              who will always be with you to have fun. We have 200+ different
              pets that can meet your needs!
            </p>
            <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-x-4">
              <button className="bg-transparent border border-[#003459] text-[#003459] rounded-full px-2 py-1 flex items-center">
                View Intro
                <span className="ml-1 flex items-center justify-center w-6 h-6 border border-[#003459] rounded-full">
                  <span className="text-[#003459] text-xs">▶</span>
                </span>
              </button>
              <button className="bg-[#003459] text-white py-2 px-6 rounded-full hover:text-[#003459] hover:bg-[#F7DBA7]">
                Explore Now
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 md:mt-0 mt-8"></div>
        </div>
      </section>

      <div className="mt-8 flex justify-between items-center pl-20">
        <p className="font-semibold">What's New?</p>
        <div className="hidden md:flex mt-8 justify-between items-center pl-20">
          <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
            View More
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-[#003459] pl-20 font-gilroy text-xl font-semibold">
        Take a look at some of our pets
      </p>

      {/* Pet Cards Section */}
      <div className="p-4">
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-20">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={pet.image}
                alt={pet.breed}
                className="w-full h-50 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{pet.breed}</h3>
              <p className="text-gray-500">
                Gender: {pet.gender} · Age: {pet.age}
              </p>
              <p className="text-lg font-bold text-[#003459]">{pet.price}</p>
            </div>
          ))}
        </div>

        {/* View More Button for Mobile */}
        <div className="mt-8 flex md:hidden justify-center">
          <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
            View More
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Banner 1 */}
      <div
        className="mt-12 bg-[#003459] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-end relative overflow-hidden min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${require("../assets/images/Home/Banner1.png")})`,
        }}
      >
        <div className="md:w-1/2 text-right z-10 relative">
          <h2 className="text-4xl font-bold text-black">One More Friend</h2>
          <p className="text-2xl font-semibold text-black mb-4">
            Thousands More Fun!
          </p>
          <p className="text-lg text-black mb-6">
            Having a pet means you have more joy, a new friend, a happy person{" "}
            <br />
            who will always be with you to have fun. We have 200+ different pets{" "}
            <br />
            that can meet your needs!
          </p>
          <div className="flex justify-end space-x-4">
            <button className="bg-transparent border border-white text-white rounded-full px-2 py-1 flex items-center md:border-[#003459] md:text-[#003459]">
              View Intro
              <span className="ml-1 flex items-center justify-center w-6 h-6 border rounded-full border-white md:border-[#003459]">
                <span className="text-xs text-white md:text-[#003459]">▶</span>
              </span>
            </button>
            <button className="bg-[#002a39] text-white py-2 px-6 rounded-full hover:text-[#002a39] hover:bg-[#F7DBA7] transition duration-300 md:bg-[#003459] md:hover:text-[#003459] md:hover:bg-[#F7DBA7]">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center pl-4 sm:pl-20">
        <p className="font-semibold text-center sm:text-left">
          Hard to choose the right products for your pets?
        </p>
        <div className="mt-4 sm:mt-8 flex justify-center sm:justify-between items-center">
          <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
            View More
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-[#003459] pl-4 sm:pl-20 font-gilroy text-xl font-semibold text-center sm:text-left">
        Our Products
      </p>

      {/* Product Cards */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-50 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg font-bold text-[#003459]">
              {product.price} VND
            </p>
          </div>
        ))}
      </div>

      {/* View More Button - Mobile Below Cards */}
      <div className="mt-6 flex justify-center sm:hidden">
        <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
          View More
          <FaChevronRight className="ml-2" />
        </button>
      </div>

      {/* Pet Sellers Section (Hidden on Mobile) */}
      <div className="mt-12 pl-20 flex justify-between items-center hidden sm:flex">
        <p className="text-lg">
          Proud to be part of{" "}
          <span className="text-[#003459] font-gilroy font-bold">
            Pet Sellers
          </span>
        </p>
        <button className="bg-white text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy hover:bg-blue-700">
          View all our sellers
        </button>
      </div>

      {/* Logos Section (Hidden on Mobile) */}
      <div className="mt-6 grid grid-cols-7 gap-3 pl-20 hidden sm:grid">
        {[...Array(7)].map((_, index) => (
          <img
            key={index}
            src={require(`../assets/images/Home/logo${index + 1}.png`)}
            alt={`logo ${index + 1}`}
            className="w-20 h-auto object-contain"
          />
        ))}
      </div>

      {/* Banner 2*/}

      <div
        className="mt-12 bg-[#003459] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${require("../assets/images/Home/Banner.png")})`,
        }} // Set the background image
      >
        {/* Left Side: Text and Buttons */}
        <div className="md:w-1/2 text-left z-10 relative">
          <h2 className="text-4xl font-bold text-[#003459]">
            Adoption{" "}
            <span role="img" aria-label="paw">
              🐾
            </span>
          </h2>
          <p className="text-2xl font-semibold text-[#003459] mb-4">
            We Need Help. So Do They.
          </p>
          <p className="text-lg text-[#003459] mb-6">
            Adopt a pet and give it a home, <br />
            it will love you back unconditionally.
          </p>

          <div className="flex justify-start space-x-4">
            <button className="bg-[#003459] text-white py-2 px-6 rounded-full hover:text-[#003459] hover:bg-[#F7DBA7] transition duration-300">
              Explore Now
            </button>
            <button className="bg-transparent border border-[#003459] text-[#003459] rounded-full px-2 py-1 flex items-center">
              View Intro
              <span className="ml-1 flex items-center justify-center w-6 h-6 border border-[#003459] rounded-full">
                <span className="text-[#003459] text-xs">▶</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pet Knowledge Section */}

      <div className="mt-8 flex justify-between items-center pl-4 sm:pl-20">
        <p className="font-semibold">You already know?</p>

        <div className="hidden sm:flex">
          <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
            View More
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* "Useful Pet Knowledge" heading */}
      <p className="mt-2 text-[#003459] pl-4 sm:pl-20 font-gilroy text-xl font-semibold">
        Useful Pet Knowledge
      </p>

      {/* Usefull pet knowledge cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-left">
          <img
            src={require("../assets/images/Home/card1.png")}
            alt="Card Image 1"
            className="w-full h-auto rounded-lg mb-4"
            style={{ height: "300px", width: "auto" }}
          />
          <button className="bg-blue-500 text-white py-2 px-2 rounded-full hover:bg-blue-700 transition duration-300 mb-4 self-start">
            Pet Knowledge
          </button>
          <h3 className="text-xl font-bold mb-2">
            What is a Pomeranian? How to identify Pomeranian dogs?
          </h3>
          <p className="text-gray-600 text-left">
            The Pomeranian, also known as the Pomeranian (Pom dog), is always in
            the top of the cutest pets. Not only that, the small, lovely, smart,
            friendly, and skillful circus dog breed.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-left">
          <img
            src={require("../assets/images/Home/card2.png")}
            alt="Card Image 2"
            className="w-full h-auto rounded-lg mb-4"
            style={{ height: "300px", width: "auto" }}
          />
          <button className="bg-blue-500 text-white py-2 px-2 rounded-full hover:bg-blue-700 transition duration-300 mb-4 self-start">
            Pet Knowledge
          </button>
          <h3 className="text-xl font-bold mb-2">Dog diet you need to know</h3>
          <p className="text-gray-600 text-left">
            Dividing a dog's diet may seem simple at first, but there are some
            rules you should know so that your dog can easily absorb the
            nutrients in the diet. For those who are just starting to raise
            dogs, especially newborn puppies with relatively weak resistance.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-left">
          <img
            src={require("../assets/images/Home/card3.png")}
            alt="Card Image 3"
            className="w-full h-auto rounded-lg mb-4"
            style={{ height: "300px", width: "auto" }}
          />
          <button className="bg-blue-500 text-white py-2 px-2 rounded-full hover:bg-blue-700 transition duration-300 mb-4 self-start">
            Pet Knowledge
          </button>
          <h3 className="text-xl font-bold mb-2">
            Why Dogs Bite and Destroy Furniture and How to Prevent It
            Effectively
          </h3>
          <p className="text-gray-600 text-left">
            Dog bites are common during development. However, no one wants to
            see their furniture or important items being bitten by a dog.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-4 sm:hidden">
        <button className="bg-white hover:bg-[#002a39] text-[#003459] px-4 py-2 rounded-full border border-[#003459] font-gilroy flex items-center">
          View More
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Home;
