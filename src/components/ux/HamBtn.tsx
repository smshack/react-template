import { Link } from "react-router-dom";
import React, { useState } from "react";


export default function HamBtn({ menuList }: { menuList: { label: string; to: string; }[] } ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div
        className={`xl:hidden relative w-12 h-11 cursor-pointer my-6
					${isMenuOpen ? "z-[70]" : ""}
				`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span
          className={`left-1/2 -translate-x-1/2 absolute w-4/5 bg-black h-[3px]  duration-500
					${isMenuOpen ? "rotate-45 top-1/2 right-0" : "top-1/4"}
				`}></span>
        <span
          className={`left-1/2 -translate-x-1/2 absolute w-4/5 bg-black h-[3px] top-[47%]  duration-500
					${isMenuOpen ? "w-0" : ""}
				`}></span>
        <span
          className={`left-1/2 -translate-x-1/2 absolute w-4/5 bg-black h-[3px]  duration-500
					${isMenuOpen ? "-rotate-45 top-1/2 right-0" : "bottom-1/4"}
				`}></span>
      </div>
      {isMenuOpen && (
        <div className="flex items-center justify-center absolute w-full h-screen top-0 left-0 bg-white z-[60]">
          <nav className="flex flex-col items-center">
						{menuList.map((list, index) => (
							<Link
								key={index}
								to={list.to}
								className={`py-10 text-3xl `}
								onClick={() => setIsMenuOpen(false)}>
								{list.label}
							</Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

/*
    width: 4px;
    height: 100%;
    display: block;
    height: 100%;
    background: red;
    position: absolute;
    left: -1px;
    top: 0;
*/