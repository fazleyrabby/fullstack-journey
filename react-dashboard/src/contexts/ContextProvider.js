import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notificaion: false,
}


export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
    const [currentColor, setCurrentColor] = useState(localStorage.getItem('colorMode') ?? '#03C9D7')
    const [currentMode, setCurrentMode] = useState(localStorage.getItem('themeMode') ?? '')
    const [themeSettings, setThemeSettings] = useState(false)

    const setMode = (e) => {
        setCurrentMode(e)
        localStorage.setItem('themeMode', e)
        setThemeSettings(false)
    }

    const setColor = (e) => {
        setCurrentColor(e)
        localStorage.setItem('colorMode', e)
        setThemeSettings(false)
    }


    
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                handleClick,
                isClicked,
                setIsClicked,
                screenSize, 
                setScreenSize,
                currentColor,
                currentMode,
                setColor,
                setMode,
                themeSettings,
                setThemeSettings
            }}
        >
            {children}
        </StateContext.Provider>

    )
}

export const useStateContext = () => useContext(StateContext)