import React from 'react';

import classes from './PizzaImage.css';
// import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = (props) => (
    <div className={classes.PizzaImage}>
        <p>hellllloooo</p>
        <img src={"/static/pizza2.jpg"} className={classes.PizzaImg} />
        {/* <img src={PizzaImage} className={classes.PizzaImg} /> */}
    </div>
);

export default pizzaImage;