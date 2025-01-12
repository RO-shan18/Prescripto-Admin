import { createContext } from "react";

export const Doctorcontext = createContext();

const DoctorcontextProvider = ({children}) => {

    const value = {

    };

    return (
        <Doctorcontext.Provider value={value}>
            {children}
        </Doctorcontext.Provider>
    )
}

export default DoctorcontextProvider