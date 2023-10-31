import styled, { keyframes } from 'styled-components'

const spinnerAnimation = keyframes`
    0% {
        transform: scale(0);
        opacity: 1; }
    100% { 
        transform: scale(1);
        opacity: 0;
    }`

export const SpinnerDiv = styled.div `   
  width: 40px;
  height: 40px;
  display: inline-block;
  position: relative;

  &:after, &:before {
    content: '';  
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #3c77ab;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${spinnerAnimation} 2s linear infinite;
  }

  &:after {
    animation-delay: 1s;
  }
`
