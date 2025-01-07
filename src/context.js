import React, { useContext, useEffect, useState } from "react";
// Context API includes:
//1) context(warehouse)
//2) Provider 
//3) Consumer -> To make this easy, UseContext Hooks are used 

const AppContext = React.createContext();

// Will use .env file to protect api key 
export const API_URL=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// Create a provider function 

const AppProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false",msg :" "});
    const [query,setQuery] = useState("Transformers");


    const getMovies = async(url) =>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response==="True"){
                setIsLoading(false);
                setMovie(data.Search);
            }
            else{
                setIsError({
                    show:true,
                    msg:data.error,
                });
            }
        } catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        let timerOut = setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },700);

        return () => clearTimeout(timerOut);
    },[query])

    return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>{children}</AppContext.Provider>;
}

//Global Custom Hook

const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext};
