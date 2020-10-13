import React, {useEffect, useContext, useCallback} from 'react';
import {GridContext} from '../../hooks/GridContext';
import styles from '../../styles/Grid.module.scss';
import Cell from './Cell';

const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
      if(Array.isArray(elem)){
        copy.push(deepCopy(elem))
      }else{
        if (typeof elem === 'object') {
          copy.push(deepCopyObject(elem))
      } else {
          copy.push(elem)
        }
      }
    })
    return copy;
}

export default function Grid() {
    const { gridData, setGridData, 
            dimensions, setDimensions,
            Running, setRunning } = useContext(GridContext);
    
    let handleCellClick = (x, y) => {
        let copyGridData = [...gridData];
        copyGridData[x][y] == 0 ? copyGridData[x][y] = 1 : copyGridData[x][y] = 0;
        setGridData(copyGridData);

    }

    let renderCells = () => {
        let allCells = [];
        for(let i = 0; i < dimensions.x; i++){
            for(let j = 0; j < dimensions.y; j++){
                allCells.push(<Cell status={gridData[i][j]} clickHandler={()=>{handleCellClick(i,j)}} />);
            }
        }
        return (allCells);
    }
    useEffect(() => {
        startAnimation();
    }, [Running])

    let startAnimation = () => {
        if(!Running)
            return;
        
        setTimeout(() => {
            nextGen();
        }, 1000);
    }
    
    let nextGen = () => {
        let oldGen = deepCopy(gridData); // We have to deep copy since its a 2d array!
        let newGen = deepCopy(gridData);
        for(let i = 0; i < dimensions.x; i++) {
            for(let j = 0; j < dimensions.y; j++) {
                const numAlive = calculateAlive(oldGen, i, j);
                if(numAlive < 2){ // Less than 2 alive
                    oldGen[i][j] == 1 ? newGen[i][j] = 0 : newGen[i][j] = oldGen[i][j];
                } else if (numAlive > 3){ // More than 2
                    oldGen[i][j] == 1 ? newGen[i][j] = 0 : newGen[i][j] = oldGen[i][j];
                } else { // Either 2 or 3
                    if(oldGen[i][j] == 1){
                        newGen[i][j] = 1;
                    } else {
                        oldGen[i][j] == 0 && numAlive == 3 ? newGen[i][j] = 1 : newGen[i][j] = oldGen[i][j];
                    }

                }
            }
        }
        setGridData(newGen);
    }
    // How many neighbors are alive?
    const calculateAlive = (grid, x, y) => {
        let alive = 0;
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if( x + i < dimensions.x && x + i >= 0
                    &&
                    y + j < dimensions.y && y + j >= 0){
                        grid[x + i][y + j] == 1 ? alive++ : alive ;
                }
            }
        }
        // If self is alive then delete one becuase we counted ourselves
        if(grid[x][y] == 1)
            alive--;
        return alive;
    }
    startAnimation(); // Call this on every render
    return (
        <>
            <button onClick={()=>{
                setRunning(!Running);
                
            }}> {Running ? 'Stop' : 'Start'}</button>
            <div className={styles['life-grid']}
                style={
                    {
                        display: "grid",
                        gridTemplateRows: `repeat(${dimensions.y},30px)`,
                        gridTemplateColumns: `repeat(${dimensions.x},30px)`
                    }
                }
            >
                
                {renderCells()}            
            </div>
        </>
    )
}
