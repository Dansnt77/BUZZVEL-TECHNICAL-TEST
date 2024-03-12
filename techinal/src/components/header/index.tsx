import Image from "next/image";
import React from "react"
import Logo from "../../assets/Title.svg"

interface HeaderProps {
    children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
   return(
    <header className="flex items-center justify-center h-32 bg-red-600" >
        <Image src={Logo} alt="logo"></Image>
    </header>
   )
    
  };