import React, { createContext, useContext, useEffect, useState } from 'react';
import useProcessData from './data';

const helper = (data) => {
  if (data.length === 0) {
    return data;
  }

  let keys = ["PlayerName", "league", "BookName", "PlayerID", "Market", "ExpectedValue", 
              "OverImpliedProb", "UnderImpliedProb", "OverAdjustedProb",
              "UnderAdjustedProb", "OverAdjustedOdds", "UnderAdjustedOdds"];
  if (data[0].length !== keys.length) {
    console.log("wrong data to be reformatted")
    return null
  } 

  
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

const helper2 = (data) => {
  if (data.length === 0) {
    return data;
  }

  let agg = data.reduce((acc, entry) => {
    const key = `${entry.PlayerName}-${entry.Market}`;
    // console.log(key)
    const groups = acc.find((g) => {
      // console.log(`${g.PlayerName}-${g.Market}`)
      return `${g.PlayerName}-${g.Market}` === key;
    });
    
    if (groups) {
      groups["ExpectedValue"] += entry.ExpectedValue;
      groups["list"].push({...entry, ExpectedValue: entry.ExpectedValue})
    } else {
      let {BookName, ...buf} = entry;
      buf["list"] = [{...entry}];
      acc.push(buf);
    }

    return acc;
  }, [])

  agg.forEach(e => {
    e["ExpectedValue"] = e.ExpectedValue / e.list.length;
    return e;
  });

  return agg;
}

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const { betData, loading } = useProcessData(""); 

    useEffect(() => {
      if (!loading) {
        // console.log(helper2(helper(betData)));
        setData(helper2(helper(betData)));
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
