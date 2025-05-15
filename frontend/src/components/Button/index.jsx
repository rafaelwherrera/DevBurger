import { ContainerButton } from "./styles";
import PropTypes from "prop-types";
import React from 'react';

export function Button ({children, ...props}){
    return <ContainerButton {...props}>{children}</ContainerButton>
}

Button.propTypes = {
    children: PropTypes.string,
}