import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import LocationPopup from "./LocationPopup"; // Import the LocationPopup component

function Header() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [openPopup, setOpenPopup] = useState(false); // State to control popup visibility

    // Function to handle location selection
    const handleLocationSelect = (city) => {
        setSelectedLocation(city); // Update selected location state
        setOpenPopup(false); // Close the popup after selection
    };

    // Automatically open the popup on page load
    useEffect(() => {
        setOpenPopup(false);
    }, []);

    // Function to open the popup manually when clicking on the location
    const openLocationPopup = () => {
        setOpenPopup(true); // Trigger popup to open
    };

    return (
        <div className=" flex items-center justify-between p-4">
            <div>
                <a href="/booking">
                    <Image
                        src="https://i.ibb.co/ZW0SbjJ/logo-dark.png"
                        alt="Logo"
                        width={120}
                        height={100}
                        priority={true}
                        className="cursor-pointer w-40 h-auto"
                    />
                </a>
            </div>
            
            <div className="text-white flex space-x-4 items-center ">
                
                <div className="text-white ml-4">
                    {selectedLocation ? (
                        <span onClick={openLocationPopup} style={{ cursor: 'pointer' }}>
                            Location: {selectedLocation} {/* Clickable location */}
                        </span>
                    ) : (
                        <button onClick={openLocationPopup}>Select Location</button> 
                    )}
                </div>
                <div>
                <LocationPopup 
                    onSelectLocation={handleLocationSelect} 
                    selectedLocation={selectedLocation}
                    openPopup={openPopup} 
                />
                </div>
                <div>
                    <SearchInput />
                </div>
            </div> 
        </div>
    );
}

export default Header;
