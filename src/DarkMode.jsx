import React, { useEffect, useState } from 'react'

function DarkMode() {

       const[ theme, setTheme] = useState(" light");
       useEffect(() => {
        if(theme=== "dark"){
          document.documentElement.classList.add("dark");
        }else{
          document.documentElement.classList.remove("dark");

        }
       },[theme]);
       const handleThemeSwitch = () =>{
        setTheme(theme === "dark" ? "light":"dark");
       }


  return (
    <div className=' h-screen bg-white dark:bg-black flex justify-center items-center'>
        <button 
        onClick={handleThemeSwitch}
        className=' h-10 w-28 py-2 text-white bg-black rounded-lg'>
           DarkMode</button>
    </div>
  )
}

export default DarkMode