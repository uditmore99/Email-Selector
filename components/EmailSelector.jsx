"use client";

import React, { useState, useRef } from "react";
import data from "@/public/emailData.json"; // Import your dummy data

const EmailSelector = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [clickedTextBox, setClickedTextBox] = useState(false);
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
      //   setSearchTerm(`${lastSelected.name} <${lastSelected.email}>`);
      setSearchTerm("");
    }
  };

  const togDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  //   return (
  //     <>
  //       <button
  //         onClick={togDarkMode}
  //         className={`absolute top-0 right-0 m-4 p-2 ${
  //           darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
  //         } rounded`}
  //       >
  //         {darkMode ? "Light Mode" : "Dark Mode"}
  //       </button>
  //       <div
  //         className={`flex items-center justify-center h-screen ${
  //           darkMode ? "bg-gray-800" : "bg-gray-100"
  //         }`}
  //       >
  //         <h1
  //           className={`text-3xl font-bold mb-4 ${
  //             darkMode ? "text-white" : "text-gray-800"
  //           }`}
  //         >
  //           Email Setter
  //         </h1>
  //         <div className="flex flex-wrap">
  //           {selectedEmails.map((email) => (
  //             <div
  //               key={email.email}
  //               className="bg-blue-500 text-white px-2 py-1 m-1 rounded-full"
  //             >
  //               {email.name}{" "}
  //               <span
  //                 className="cursor-pointer"
  //                 onClick={() => handleRemoveEmail(email)}
  //               >
  //                 &#10006;
  //               </span>
  //             </div>
  //           ))}
  //           <input
  //             type="text"
  //             placeholder="Type to add recipients"
  //             className="border p-2"
  //             onClick={() => setShowDropdown(true) && setClickedTextBox(true)}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             onKeyDown={handleKeyDown}
  //             value={searchTerm}
  //             ref={inputRef}
  //             onBlur={handleBlur}
  //           />
  //         </div>
  //         {showDropdown && (
  //           <div
  //             className={`sticky ${
  //               darkMode ? "bg-gray-400" : "bg-white"
  //             } mt-2 w-64 rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
  //           >
  //             {filteredEmails.length > 4 && (
  //               <div className="overflow-y-auto max-h-32">
  //                 {filteredEmails.map((email) => (
  //                   <div
  //                     key={email.email}
  //                     className="p-2 cursor-pointer hover:bg-gray-200"
  //                     onClick={() => handleSelectEmail(email)}
  //                   >
  //                     {email.name}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     </>
  //   );
  // };

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
          className={`text-3xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Email Setter
        </h1>
        <div className="flex flex-col items-center">
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
            onClick={() => setShowDropdown(true) && setClickedTextBox(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchTerm}
            ref={inputRef}
            onBlur={handleBlur}
          />
          {showDropdown && (
            <div
              className={`sticky ${
                darkMode ? "bg-gray-400" : "bg-white"
              } mt-2 w-64 rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
            >
              {filteredEmails.length > 4 && (
                <div className="overflow-y-auto max-h-32">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.email}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectEmail(email)}
                    >
                      {email.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailSelector;
