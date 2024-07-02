import styled, { keyframes } from 'styled-components';

const Span = styled.span`
  width: 5px;
  height: 3px;
  border-radius: 3px;
  position: relative;
  background-color: #fff;
  left: 37px;
  top: 12px;
  transition: all 150ms ease-in;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 3px;
    border-radius: 3px;
    background-color: #fff;
    transition: all 150ms ease-in;
  }

  &::before {
    top: -5px;
    left: -5px;
  }

  &::after {
    top: 5px;
    left: -2px;
  }
`;

const Switch = keyframes`
0% {
  left: 2px;
}
60% {
  left: 2px;
  width: 30px;
}
100% {
  left: 36px;
  width: 18px;
}
`;

const Input = styled.input`
  display: none;

  &:checked + label {
    background-color: #6b7abb;
    border-color: #5d6baa;

    & > span {
      left: 15px;
      width: 3px;

      &::before {
        width: 3px;
        height: 3px;
        top: -5px;
      }

      &::after {
        width: 3px;
        height: 3px;
        left: -8px;
        top: 7px;
      }
    }

    &::before {
      background-color: #fff;
      border-color: #e8e8e8;
      animation: ${Switch} 350ms forwards;
    }

    &::after {
      transition-delay: 350ms;
      opacity: 1;
    }
  }
`;

const Reverset = keyframes`
0% {
  left: 32px;
  width: 18px;
}
60% {
  left: 2px;
  width: 30px;
}
100% {
  left: 2px;
}
`;

const Label = styled.label`
  width: 60px;
  height: 30px;
  background-color: #96dcee;
  border-radius: 100px;
  border: 2px solid #72cce3;
  display: flex;
  position: relative;
  transition: all 350ms ease-in;
  cursor: pointer;

  &::before {
    animation: ${Reverset} 350ms forwards;
    transition: all 350ms ease-in;
    content: '';
    width: 18px;
    height: 18px;
    border: 2px solid #f5eb71;
    top: 4px;
    left: 0px;
    position: absolute;
    border-radius: 82px;
    background-color: #fffaa8;
  }
`;

export const ToggleButton = () => {
  return (
    <span>
      <Input type="checkbox" id="toggle" />
      <Label htmlFor="toggle">
        <Span />
      </Label>
    </span>
  );
};
