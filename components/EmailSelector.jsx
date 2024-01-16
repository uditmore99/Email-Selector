"use client";

import React, { useState, useRef } from "react";
import data from "@/public/emailData.json"; // Import your dummy data

const EmailSelector = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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
      //   setSearchTerm(`${lastSelected.name} <${lastSelected.email}>`);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap">
        {selectedEmails.map((email) => (
          <div
            key={email.email}
            className="bg-blue-500 text-white px-2 py-1 m-1 rounded-full"
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
        <input
          type="text"
          placeholder="Type to add recipients"
          className="border p-2"
          onClick={() => setShowDropdown(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchTerm}
          ref={inputRef}
        />
      </div>
      {showDropdown && (
        <div className="absolute z-10 bg-white border shadow-md mt-1 w-full">
          {filteredEmails.map((email) => (
            <div
              key={email.email}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectEmail(email)}
            >
              {email.name} &lt;{email.email}&gt;
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailSelector;
