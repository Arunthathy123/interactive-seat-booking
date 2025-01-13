"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import "animate.css";
import Button from "@/componets/Button";

const BookTicket = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [theaterDetails, setTheaterDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatPopupVisible, setSeatPopupVisible] = useState(false);
  const [seatCount, setSeatCount] = useState(1);
  const [todayDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const response = await fetch("/datas/theaterData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch theater data, status: ${response.status}`);
        }
        const data = await response.json();
        setTheaterDetails(data);
        setSelectedDate(todayDate);
      } catch (error) {
        console.error("Error fetching theater data:", error);
      }
    };
    fetchTheaterData();
  }, [todayDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
    setSeatPopupVisible(true);
  };

  const handlePopupConfirm = () => {
    setSeatPopupVisible(false);
    router.push(`/seat-selection?showtime=${selectedShowtime}&seats=${seatCount}&`);
  };
  

  const filteredTheaterDetails = theaterDetails
    ? Object.keys(theaterDetails).map((movieId) => ({
        movieId,
        name: theaterDetails[movieId][0].movieName,
        theaters: theaterDetails[movieId].map((theater) => ({
          ...theater,
          showtimes: theater.showtimes[selectedDate] || [],
        })),
      }))
    : [];

  if (!theaterDetails) {
    return <p className="text-center mt-10">Loading theater details...</p>;
  }

  return (
    <div className="p-4 bg-gray-200">
      {title && (
        <h2 className="text-md md:text-xl font-bold mb-4 text-gray-800 text-start whitespace-nowrap ">{title} - English</h2>
      )}
      <div className="mb-6 flex items-start justify-start gap-6">
        <input
          type="date"
          value={selectedDate || todayDate}
          onChange={handleDateChange}
          min={todayDate}
          className="p-2 border bg-gray-200 border-gray-800 rounded-lg text-gray-800"
        />
      </div>
      {filteredTheaterDetails.length > 0 ? (
        <ul className="space-y-6">
          {filteredTheaterDetails.map((movie) => (
            <li key={movie.movieId}>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => handleMovieSelect(movie.movieId)}
                  className="text-blue-600 underline"
                  text={movie.name}
                />
                  
                
                {movie.theaters.map((theater, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 flex flex-col md:flex-row p-4 rounded-lg gap-3"
                  >
                    <div className="flex items-center gap-2 md:w-3/4 lg:w-1/4">
                      <span className="text-red-500">❤️</span>
                      <h5 className="font-semibold text-gray-800 ">{theater.name}</h5>
                    </div>
                    {theater.showtimes.length > 0 ? (
                      <div className="flex flex-wrap gap-4 ">
                        {theater.showtimes.map((showtime, showtimeIdx) => (
                          <Button
                            key={showtimeIdx}
                            onClick={() => handleShowtimeClick(showtime)}
                            className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg"
                            text={showtime}
                          />
                            
                          
                        ))}
                      </div>
                    ) : (
                      <p>No showtimes available for this date.</p>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No theaters found for the selected date.</p>
      )}
      {seatPopupVisible && (
        <div className="fixed inset-0 p-2 md:p-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4 text-center">Select Number of Seats</h3>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-auto">
                <Image
                  src="/images/seat.jpg"
                  alt="Image 1"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg animate__animated animate__rotateIn"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-4">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  onClick={() => setSeatCount(number)}
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border ${
                    seatCount === number
                      ? "bg-red-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-red-400 hover:text-white transition duration-200`}
                  text={number}
                />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                onClick={handlePopupConfirm}
                className="bg-red-400 text-white px-4 py-2 rounded-lg w-full max-w-sm"
                text="Select Seat"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTicket;
