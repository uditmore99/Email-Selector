"use client";

import React, { useState, useRef } from "react";
import data from "@/public/emailData.json"; // Import your dummy data

const EmailSelector = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const inputRef = useRef(null);

  const filteredEmails = data.filter(
    (email) =>
      !selectedEmails.find((selected) => selected.email === email.email) &&
      (email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectEmail = (email) => {
    setSelectedEmails([...selectedEmails, email]);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleRemoveEmail = (email) => {
    setSelectedEmails(selectedEmails.filter((selected) => selected !== email));
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedEmails.length > 0
    ) {
      // Deselect the last selected email on backspace
      const lastSelected = selectedEmails[selectedEmails.length - 1];
      setSelectedEmails(selectedEmails.slice(0, -1));
      // setSearchTerm(`${lastSelected.name} <${lastSelected.email}>`);
      setSearchTerm("");
    }
  };

  const togDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // const handleBlur = () => {
  //   if (searchTerm != "") {
  //     setShowDropdown(true);
  //   } else setShowDropdown(false);
  // };

  const handleBlur = () => {
    if (searchTerm != "") {
      setShowDropdown(true);
    } else
      setTimeout(() => {
        setShowDropdown(false);
      }, 150);
  };

  return (
    <>
      <button
        onClick={togDarkMode}
        className={`absolute top-0 right-0 m-4 p-2 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        } rounded`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div
        className={`flex flex-col items-center justify-center h-screen ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-5xl font-bold m-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Email Setter
        </h1>

        <div
          className={`flex flex-row items-center rounded-3xl ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {selectedEmails.map((email) => (
            <div
              key={email.email}
              className={` p-1 rounded-full  ${
                darkMode ? "text-white " : "text-black"
              }`}
            >
              {email.name}{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleRemoveEmail(email)}
              >
                &#10006;
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center relative">
            <input
              type="text"
              placeholder="Type to add recipients"
              className="border text-black"
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => setSearchTerm(e.target.value) && handleBlur}
              onKeyDown={handleKeyDown}
              value={searchTerm}
              ref={inputRef}
              onBlur={handleBlur}
            />
            {showDropdown && filteredEmails.length > 0 && (
              <div
                className={`fixed  ${
                  darkMode ? "bg-gray-900 text-white " : "bg-white text-black"
                } mt-12 w-64 rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
              >
                <div className="overflow-y-scroll w-fit max-h-48">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.email}
                      className="p-2 cursor-pointer hover:bg-gray-600"
                      onClick={() => handleSelectEmail(email)}
                    >
                      {email.name} - {email.email}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSelector;
