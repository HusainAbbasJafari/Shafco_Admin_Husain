import { setupInterceptors } from "@/services/api";
import NextTopLoader from "nextjs-toploader";
import { createContext, useContext, useEffect, useState } from "react";
import NProgress from "nprogress";


const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setupInterceptors(setLoading);
    }, []);


    useEffect(() => {
        if (loading) {
            NProgress.start(); // Start loader
        } else {
            NProgress.done(); // Stop loader
        }
    }, [loading]);


    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            <NextTopLoader color="#ff6c2f" showSpinner={false} showAtTop={loading} />
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
