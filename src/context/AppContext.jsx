import { createContext } from "react";


export const Appcontext = createContext();

const AppcontextProvider = ({children}) => {

    const montharray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    
      const formatdate = (date) => {
        const datearray = date.split("_");
    
        const year = datearray[0];
        const month = montharray[datearray[1]];
        const day = datearray[2];
    
        const actualformat = day + " " + month + " " + year;
    
        return actualformat;
      };

    const value = {
        formatdate
    };

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    )
}

export default AppcontextProvider