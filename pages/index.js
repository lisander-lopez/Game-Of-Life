import {useState} from 'react';
import Head from 'next/head';

import Grid from '../components/grid/Grid';

import {GridProvider} from '../hooks/GridContext';

export default function Home() {
  const [GridDimensions, setGridDimensions] = useState({x: 20, y: 20})
  const handleChange = (e,dimension) =>{
    e.persist();
    e.preventDefault();
    let copy = {...GridDimensions};
    if(dimension == 'x'){
      copy.x = e.target.value;
    }

    if(dimension == 'y'){
      copy.y = e.target.value;
    }
    setGridDimensions(copy);
  }

  return (
    <>
      <Head>
        <title>Conways Game Of Life</title>
      </Head>
        <h1>Game Of Life</h1>
        <GridProvider x={GridDimensions.x} y={GridDimensions.y}>
          <Grid/>
        </GridProvider>
        <br/>

        <label htmlFor="X-Dimension">X</label>
        <input type="number" name="X-Dimension" id="XDim" min="1" max="90" value={GridDimensions.x} onChange={(e)=>{handleChange(e,'x')}}/>

        <label htmlFor="Y-Dimension">Y</label>
        <input type="number" name="Y-Dimension" id="YDim" min="1" max="90" value={GridDimensions.y} onChange={(e)=>{handleChange(e,'y')}}/>
        
    </>
  )
}
