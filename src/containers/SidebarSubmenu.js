import React, { useState } from 'react'; // Import useState
import { Link, useLocation } from 'react-router-dom';

function SidebarSubmenu({ submenu, name, icon, initialExpanded, onToggle }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(initialExpanded); // Use useState to manage isExpanded

  return (
    <div className="flex-col">
      {/* Route header */}
      <div className="w-full cursor-pointer flex justify-between items-center">
        <div className="flex gap-3 items-center">
          {icon} {name}
        </div>
        <svg
        
          className={`h-5 w-5 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => {
            setIsExpanded(!isExpanded); 
            onToggle(!isExpanded); 
          }}
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

 
      <div className={`w-full ${isExpanded ? '' : 'hidden'}`}>
        <ul className="menu menu-compact">
          {submenu.map((m, k) => (
            <li key={k}>
              <Link to={m.path}>
                {m.icon} {m.name}
                {location.pathname === m.path && (
                  <span
                    className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                    aria-hidden="true"
                  ></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarSubmenu;
