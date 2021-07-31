import React from 'react';
import styled from 'styled-components';

import MinusIcon from '../../../assets/icons/react-icons/MinusIcon';
import PlusIcon from '../../../assets/icons/react-icons/PlusIcon';
import {desktopStyle} from '../../../utils';

const QuantityControlContainer = styled.div`
  @keyframes fadeInTransition {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 5px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 158, 127);
  transition: all 0.3s ease 0s;
  outline: none;
  animation: fadeInTransition linear 1s;
  justify-content: space-evenly;
  border-radius: 32px;
  ${(props) =>
    props.vertical &&
    `
        flex-direction: column;
    `}

  ${(props) =>
    props.background &&
    `
        background-color: rgb(247, 247, 247);
        color: rgb(13, 17, 54);
    `}

   ${desktopStyle(`
       max-width: 200px;
        margin: 5px;
   `)}
`;

const QuantityControlButton = styled.div`
  display: flex;
  padding: 10px 16px 10px 16px;
  font-size: 20px;
  cursor: pointer;
  ${(props) =>
    props.vertical &&
    `
          padding: 16px 10px 16px 10px;
    `}
  ${desktopStyle(`
       svg {
        margin-right: 0;
       }
     `)}
`;

const QuantityControl = ({
  quantity,
  onChange,
  min = 1,
  showLabel = true,
  vertical = false,
  secondaryBackground = false,
}) => {
  const handleAdd = () => {
    onChange(quantity + 1);
  };
  const handleDecrease = () => {
    onChange(quantity === min ? min : quantity - 1);
  };

  return (
    <QuantityControlContainer
      vertical={vertical}
      background={secondaryBackground}
    >
      {showLabel && <h4>Količina:</h4>}
      <QuantityControlButton
        onClick={handleDecrease}
        vertical={vertical}
      >
        <MinusIcon />
      </QuantityControlButton>
      <div>{quantity}</div>
      <QuantityControlButton
        onClick={handleAdd}
        vertical={vertical}
      >
        <PlusIcon />
      </QuantityControlButton>
    </QuantityControlContainer>
  );
};

export default QuantityControl;
