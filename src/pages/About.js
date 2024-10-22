import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FiMessageSquare } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const About = () => {
  const [customers, setCustomers] = useState([]);
  const [puppies, setPuppies] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  // Fetch customers data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://monitor-backend-rust.vercel.app/api/customers"
        );
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch puppies data
  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const response = await fetch(
          "https://monitor-backend-rust.vercel.app/api/pets"
        );
        const data = await response.json();
        setPuppies(data);
      } catch (error) {
        console.error("Error fetching puppies:", error);
      }
    };
    fetchPuppies();
  }, []);

  // Fetch pets data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "https://monitor-backend-rust.vercel.app/api/pets"
        );
        const data = await response.json();
        setPets(data);
        setSelectedPet(data[0]);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleThumbnailClick = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <div className="container mx-auto extra-padding">
      {/* Custom CSS for Swiper pagination */}
      <style>{`
        .swiper-pagination-bullet {
          background: #003459; /* Default color for inactive bullets */
        }
        .swiper-pagination-bullet-active {
          background: #00577e; /* Color for the active bullet */
        }
      `}</style>

      {/* 1st Section: Pet Details with Slider */}
      <div className="mb-12 border border-gray-300 rounded-lg p-5 flex flex-col md:flex-row">
        {" "}
        {/* Flex container */}
        <div className="md:w-1/2">
          <div className="mb-4">
            {selectedPet && (
              <img
                src={selectedPet.image}
                alt={selectedPet.breed}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>

          {/* Swiper for thumbnails */}
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {pets.map((pet) => (
              <SwiperSlide key={pet.id}>
                <img
                  src={pet.image}
                  alt={pet.breed}
                  className="w-100 h-auto object-cover rounded-lg cursor-pointer"
                  onClick={() => handleThumbnailClick(pet)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Alert Section */}
          <div className="mt-4 p-2 rounded-lg bg-[#fceed5] font-extrabold text-sm text-center">
            <span role="img" aria-label="Health Guarantee" className="mr-1">
              🐾
            </span>
            <span>100% health guarantee for pets</span>
            <span role="img" aria-label="Health Guarantee" className="mx-1">
              🐾
            </span>
            <span>100% guarantee of pet identification</span>
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center">
            <FaShareAlt className="text-xl mr-2 text-[#103559]" />
            <span className="text-md font-semibold text-[#103559] font-extrabold text-center">
              Share:
            </span>
            <div className="flex ml-4 space-x-4">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-gray-600 text-md hover:text-gray-300" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-gray-600 text-md hover:text-gray-300" />
              </a>
              <a
                href={`https://instagram.com/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-600 text-md hover:text-gray-300" />
              </a>
              <a
                href={`https://youtube.com/share?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-gray-600 text-md hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>
        {/* Right Hand Side: Details */}
        <div className="md:w-1/2 pl-0 md:pl-5 md:ml-10 pt-10 md:pt-0">
          {" "}
          {/* Set width for RHS */}
          {/* Breadcrumb Navigation */}
          <div className="text-gray-500 mb-2 text-xs flex items-center">
            <span className="text-xs">Home</span>
            <FaChevronRight className="mx-4 text-xs" />
            <span className="text-xs">Dog</span>
            <FaChevronRight className="mx-4 text-xs" />
            <span className="text-xs">Large Dog</span>
            <FaChevronRight className="mx-4 text-xs" />
            <span className="text-xs">{selectedPet?.breed}</span>
          </div>
          <span className="text-xs text-gray-500">{selectedPet?.id}</span>
          {selectedPet && (
            <div>
              <h1 className="text-2xl md:text-3xl text-black mb-2 font-extrabold">
                {selectedPet.breed}
              </h1>
              <h2 className="text-lg md:text-xl mb-4 font-extrabold text-[#103559]">
                {selectedPet.price}
              </h2>

              {/* Buttons */}
              <div className="flex gap-2 mb-6">
                <button className="bg-[#103559] font-extrabold text-white py-2 px-4 rounded-full">
                  Contact
                </button>
                <button className="text-[#103559] py-2 px-4 rounded-full flex items-center gap-2 border border-[#103559] font-extrabold">
                  <FiMessageSquare className="text-[#103559] font-extrabold" />{" "}
                  Chat with Monito
                </button>
              </div>

              {/* Table for pet details */}
              <table className="w-full text-sm text-gray-500">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">SKU</td>
                    <td className="py-1 font-bold">: {selectedPet.id}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Gender</td>
                    <td className="py-1 font-bold">: {selectedPet.gender}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Size</td>
                    <td className="py-1 font-bold">: Medium</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Color</td>
                    <td className="py-1 font-bold">: Various</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Vaccinated</td>
                    <td className="py-1 font-bold">: Yes</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Dewormed</td>
                    <td className="py-1 font-bold">: Yes</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Cost</td>
                    <td className="py-1 font-bold">: TBD</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Microchip</td>
                    <td className="py-1 font-bold">: Yes</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Location</td>
                    <td className="py-1 font-bold">: TBD</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">Published Date</td>
                    <td className="py-1 font-bold">: TBD</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 pr-2 font-normal">
                      Additional Information
                    </td>
                    <td className="py-1 font-bold">: TBD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 2nd Section: Our Lovely Customers */}
      <section className="mb-12">
        <h2 className="text-xl font-extrabold mb-4">Our Lovely Customers</h2>
        <Swiper
          spaceBetween={10}
          slidesPerView={2} // Show 2 slides per row for mobile view
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // Autoplay settings (if needed)
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4.5,
            },
            1024: {
              slidesPerView: 4.5,
            },
          }}
        >
          <br />
          <br />
          {customers.map((customer, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white text-center rounded-b-lg">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p>{customer.pet}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 3rd Section: See More Puppies */}
      <section className="mb-12">
        <h6 className="font-extrabold">What's new?</h6>
        <h2 className="text-xl font-extrabold mb-4 text-[#103559]">
          See More Puppies
        </h2>

        <div className="block md:hidden">
          {" "}
          {/* Mobile view */}
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {puppies.map((puppy) => (
              <div
                key={puppy.id}
                className="bg-[#f7f9fc] rounded-lg shadow-md overflow-hidden p-2"
              >
                <img
                  src={puppy.image}
                  alt={puppy.breed}
                  className="w-full h-48 object-cover rounded-lg "
                  style={{ aspectRatio: "1 / 1" }}
                />
                <h4 className="font-extrabold text-md">
                  {puppy.id} - {puppy.breed}
                </h4>
                <p className="text-gray-500 text-xs">
                  <span className="font-normal">Gender:</span>{" "}
                  <span className="font-bold">{puppy.gender}</span> •
                  <span className="font-normal"> Age:</span>{" "}
                  <span className="font-bold">{puppy.age}</span>
                </p>
                <p className="font-extrabold text-sm">{puppy.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          {" "}
          {/* Desktop view */}
          <Swiper
            spaceBetween={30}
            slidesPerView={4} // Set initial slides per view for desktop
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }} // Autoplay settings (if needed)
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            <br />
            <br />
            {puppies.map((puppy) => (
              <SwiperSlide key={puppy.id}>
                <div className="bg-[#f7f9fc] rounded-lg p-2 shadow-md">
                  <img
                    src={puppy.image}
                    alt={puppy.breed}
                    className="w-full h-48 object-cover"
                    style={{ borderRadius: "5px", aspectRatio: "1 / 1" }}
                  />
                  <h4 className="font-extrabold text-md">
                    {puppy.id} - {puppy.breed}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    <span className="font-normal">Gender:</span>{" "}
                    <span className="font-bold">{puppy.gender}</span> •
                    <span className="font-normal"> Age:</span>{" "}
                    <span className="font-bold">{puppy.age}</span>
                  </p>
                  <p className="font-extrabold text-sm">{puppy.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default About;
