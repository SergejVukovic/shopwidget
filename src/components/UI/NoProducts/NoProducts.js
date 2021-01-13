import React from 'react';
import Paper from "../Paper";

import "./NoProducts.style.css";

const NoProducts = () => {
    return (
        <div className={"NoProducts"}>
            <Paper style={{padding: '32px'}}>
                <h2> Trenutno nije pronadjen nijedan proizvod koji odgovara Vašoj pretrazi. </h2>
                <h3> Molimo dodjite kasnije ili promjenite parametre filtriranja. </h3>
            </Paper>
        </div>

    )
}

export default NoProducts;
