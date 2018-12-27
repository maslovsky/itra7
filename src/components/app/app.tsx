import React from 'react';

import Stepper from '../stepper/stepper';
import data from '../../data/data.json';

export default function App () {
    return (
        <>
            <h1>Hello :)</h1>

            <Stepper data={data}/>
        </>
    )
}
