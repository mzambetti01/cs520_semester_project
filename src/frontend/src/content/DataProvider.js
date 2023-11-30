import React, { createContext, useContext, useEffect, useState } from 'react';
import useProcessData from './data';

const helper = (data) => {
    if (data.length === 0) {
      return data;
    }
  
    if (data[0].length != 11) {
      console.log("wrong data to be reformatted")
      return null
    } 
  
    let keys = ["PlayerName", "league", "PlayerID", "Market", "ExpectedValue", 
                "OverImpliedProb", "UnderImpliedProb", "OverAdjustedProb",
                "UnderAdjustedProb", "OverAdjustedOdds", "UnderAdjustedOdds"];
    let id = 0;
    return data.map(d => {
      let o =  keys.reduce((acc, k, i) => {
        acc[k] = d[i];
        return acc;
      }, {}); 
      o["ID"] = id;
      id += 1;
      return o;
    })
  }

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const { betData, loading } = useProcessData("");
  
    useEffect(() => {
      if (!loading) {
        setData(helper(betData));
      }
    }, [betData, loading]);
  
    return (
      <DataContext.Provider value={{ data, loading }}>
        {children}
      </DataContext.Provider>
    );
  };

export const useData = () => {
  return useContext(DataContext);
};
