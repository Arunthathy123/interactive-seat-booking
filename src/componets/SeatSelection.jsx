"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "animate.css";
import Image from "next/image";
import Swal from "sweetalert2";
import Button from "@/componets/Button";

const SeatSelection = () => {
  const rows = 6;
  const seatsPerRow = 10;
  const pricingTiers = {
    Silver: 100,
    Gold: 150,
    Platinum: 200,
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [showSeatPopup, setShowSeatPopup] = useState(false);

  const searchParams = useSearchParams();
  const seatCountFromParams = parseInt(searchParams.get("seats")) || 1;

  useEffect(() => {
    setSeatCount(seatCountFromParams);
  }, [seatCountFromParams]);

  const handleSeatClick = (seat) => {
    const allSeats = generateSeatIds();
    const seatIndex = allSeats.indexOf(seat);

    if (seatIndex === -1) return;

    const newSelectedSeats = allSeats.slice(seatIndex, seatIndex + seatCount);
    setSelectedSeats(newSelectedSeats);
  };

  const generateSeatIds = () => {
    const seatIds = [];
    for (let row = 0; row < rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seatIds.push(`${String.fromCharCode(65 + row)}${seat}`);
      }
    }
    return seatIds;
  };

  const getTotalCost = () => {
    return selectedSeats.reduce((total, seat) => {
      if (seat.startsWith("A") || seat.startsWith("B")) {
        return total + pricingTiers.Silver;
      } else if (seat.startsWith("C") || seat.startsWith("D")) {
        return total + pricingTiers.Gold;
      } else {
        return total + pricingTiers.Platinum;
      }
    }, 0);
  };

  const renderSeatGrid = () => {
    const grid = [];
    const tierLabels = {
      0: { name: "Silver", price: pricingTiers.Silver },
      2: { name: "Gold", price: pricingTiers.Gold },
      4: { name: "Platinum", price: pricingTiers.Platinum },
    };
  
    for (let row = 0; row < rows; row++) {
      if (tierLabels[row]) {
        const { name, price } = tierLabels[row];
        grid.unshift(
          <div
            key={`label-${row}`}
            className="text-center font-normal my-2 text-gray-300"
          >
            {name} Section - ₹{price}
          </div>
        );
      }
  
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat}`;
        const isSelected = selectedSeats.includes(seatId);
  
        let seatClass = "bg-gray-300";
        if (row >= 2 && row <= 3) seatClass = "bg-yellow-300";
        if (row >= 4) seatClass = "bg-red-300";
  
        if (isSelected) seatClass += " border-4 border-green-700";
  
        rowSeats.push(
          <Button
            key={seatId}
            className={`w-10 h-10 md:w-11 md:h-11 m-1 md:m-2 rounded ${seatClass}`}
            onClick={() => handleSeatClick(seatId)}
            text={seatId}
          />
        );
      }
      grid.unshift(
        <div key={row} className="flex flex-wrap justify-center">
          {rowSeats}
        </div>
      );
    }
  
    // Add the screen at the bottom of the grid
    grid.push(
      <div key="screen" className="flex justify-center mt-6  md:mt-14 mb-4 ">
        <div className="w-full lg:w-2/4 text-gray-200 h-10 bg-gradient-to-t from-gray-600 to-gray-900 rounded-t-full shadow-md flex items-center justify-center transform rotate-180">
          {/* <span className="text-sm font-semibold">Screen</span> */}
        </div>
      </div>
    );
  
    return grid;
  };
  

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-xl font-bold mb-6 text-gray-200">Seat Selection</h2>
        <Button
          className="px-2 py-2 md:px-4 md:py-2 bg-gray-600 text-white rounded mb-4"
          onClick={() => setShowSeatPopup(true)}
          text="Change Seat Number"
        />
          
       
      </div>
      <div className="mb-4">{renderSeatGrid()}</div>
      <div className="mt-8 p-6 border rounded bg-transparent flex flex-col items-center shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-200">Booking Summary</h2>
        <p className="text-gray-300">
          <span className="font-semibold">Selected Seats: </span>{" "}
          {selectedSeats.join(", ") || "None"}
        </p>
        <p className="text-gray-300 mt-6">
          <span className="font-semibold">Total Cost: </span> ₹{getTotalCost()}
        </p>
        <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-1/2 hover:bg-red-600"
            onClick={() => {
                if (selectedSeats.length === 0) {
                Swal.fire({
                    title: "Error!",
                    text: "Please select at least one seat before booking.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                } else {
                Swal.fire({
                    title: "Success!",
                    text: "Booking Confirmed!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = "/"; 
                });
                }
            }}
            >
            Book Now
            </button>

      </div>
      {showSeatPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4 text-center">
              Select Number of Seats
            </h3>
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
            <div className="grid grid-cols-8 gap-4 mb-4">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  onClick={() => setSeatCount(number)}
                  className={`w-10 h-10 rounded-full ${
                    seatCount === number
                      ? "bg-red-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  text={number}
                />
                  
                
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => setShowSeatPopup(false)}
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

export default SeatSelection;
