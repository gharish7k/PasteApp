import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-[#1f2937]">
      
      <div className="mx-auto flex max-w-[1126px] items-center justify-center gap-8 px-6 py-3">

        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#3b82f6" : "#ffffff",
            transition: "color 0.3s ease",
          })}
          className="text-lg font-semibold hover:text-blue-400"
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          style={({ isActive }) => ({
            color: isActive ? "#3b82f6" : "#ffffff",
            transition: "color 0.3s ease",
          })}
          className="text-lg font-semibold hover:text-blue-400"
        >
          Pastes
        </NavLink>

      </div>

    </nav>
  )
}

export default Navbar