import { ContainerButtonCart } from "./styles";
import PropTypes from "prop-types";
import React from 'react';

export function ButtonCart ({children, ...props}){
    return <ContainerButtonCart {...props}>{children}</ContainerButtonCart>
}

ButtonCart.propTypes = {
    children: PropTypes.string,
}