import {useState, createContext, useEffect} from 'react';


export const GridContext = createContext();

export const GridProvider = ({children, x, y}) => {
    const [gridData, setGridData] = useState(Array.from({length: x},()=> Array.from({length: y}, ()=>0)));

    const [dimensions, setDimensions] = useState({
        x: parseInt(x),
        y: parseInt(y),
    });

    const [Running, setRunning] = useState(false);
    
    useEffect(() => {
        setGridData(Array.from({length: x},()=> Array.from({length: y}, () => 0)));
        let newObj = {
            x: parseInt(x),
            y: parseInt(y),
        };
        setDimensions(newObj);
    }, [x,y])
    
    

    return (
        <GridContext.Provider value={{gridData, setGridData, dimensions, setDimensions, Running, setRunning}}>
            {children}
        </GridContext.Provider>
    )
}
