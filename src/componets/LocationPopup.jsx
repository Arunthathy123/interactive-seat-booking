"use client"; 

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const LocationPopup = ({ onSelectLocation, selectedLocation, openPopup }) => {
    const [selectedCity, setSelectedCity] = useState(selectedLocation);

    // Function to handle location click
    const handleLocationClick = (city) => {
        setSelectedCity(city);
        Swal.close(); // Close the popup immediately after selecting a location
    };

    useEffect(() => {
        if (!openPopup) return; // Don't show popup if it's not open

        Swal.fire({
            title: 'Choose Your Location',
            html: `
                <div style="display: flex; justify-content: space-between; gap: 20px; " class="location">
                    <div id="delhi" style="text-align: center; margin-left:20px; ${selectedCity === 'Delhi' ? 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); padding:10px 20px' : ''}" class="place">
                        <img src="/images/delhi.jpg" alt="Delhi" style="width: 100px; height: 100px; object-fit: cover;">
                        <p style="margin-top:30px">Delhi</p>
                    </div>
                    <div id="mumbai" style="text-align: center; margin-left:20px; ${selectedCity === 'Mumbai' ? 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); padding:10px 20px' : ''}" class="place">
                        <img src="/images/mumbai.jpg" alt="Mumbai" style="width: 100px; height: 100px; object-fit: cover;">
                        <p style="margin-top:30px">Mumbai</p>
                    </div>
                    <div id="kolkata" style="text-align: center; margin-left:20px; ${selectedCity === 'Kolkata' ? 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); padding:10px 20px' : ''}" class="place">
                        <img src="/images/kolkata.jpg" alt="Kolkata" style="width: 100px; height: 100px; object-fit: cover;">
                        <p style="margin-top:30px">Kolkata</p>
                    </div>
                    <div id="chennai" style="text-align: center; margin-left:20px; ${selectedCity === 'Chennai' ? 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); padding:10px 20px' : ''}" class="place">
                        <img src="/images/chennai.jpg" alt="Chennai" style="width: 100px; height: 100px; object-fit: cover;">
                        <p style="margin-top:30px">Chennai</p>
                    </div>
                    <div id="kochi" style="text-align: center; margin-left:20px; ${selectedCity === 'Kochi' ? 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); padding:10px 20px' : ''}" class="place">
                        <img src="/images/kochi.jpg" alt="Kochi" style="width: 100px; height: 100px; object-fit: cover;">
                        <p style="margin-top:30px">Kochi</p>
                    </div>
                </div>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Select',
            preConfirm: () => {
                if (!selectedCity) {
                    Swal.showValidationMessage('You must select a location');
                    return false;
                }
                return selectedCity;
            },
            customClass: {
                popup: 'custom-popup', // Add a custom class for styling
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onSelectLocation(result.value); // Pass the selected location to the parent
            }
        });

        // Attach event listeners after the popup is rendered
        const locationElements = [
            { id: 'delhi', city: 'Delhi' },
            { id: 'mumbai', city: 'Mumbai' },
            { id: 'kolkata', city: 'Kolkata' },
            { id: 'chennai', city: 'Chennai' },
            { id: 'kochi', city: 'Kochi' },
        ];

        locationElements.forEach(({ id, city }) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', () => handleLocationClick(city));
            }
        });

        // Clean up event listeners when the popup is closed
        return () => {
            locationElements.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    element.removeEventListener('click', handleLocationClick);
                }
            });
        };
    }, [selectedCity, onSelectLocation, openPopup]);

    return null; // No UI render as popup triggers SweetAlert
};

export default LocationPopup;
