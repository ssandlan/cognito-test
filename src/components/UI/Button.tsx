import { ButtonProps } from "../../types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const buttonStyles = `
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.small {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
  }

  &.primary-button {
    background-color: var(--primary);
    color: var(--background);
    &:hover {
      background-color: var(--secondary);
    }
      &.small:hover {
      background-color: var(--background);
      color: var(--primary);
    }
  }

    &.primary-button:focus{
      outline: 4px auto var(--secondary);
      background-color: var(--secondary);
    }

  &.secondary-button {
    background-color: var(--tertiary);
    color: var(--background);
  }

  &.secondary-button:hover, &.secondary-button:focus {
    background-color: var(--secondary);
  }

  &.secondary-button:focus{
    outline: 4px auto var(--primary);
    background-color: var(--primary);
  }

  &.tertiary-button {
    background-color: var(--background);
    color: var(--primary);
    border: 2px solid var(--primary);
  }

  &.tertiary-button:hover, &.tertiary-button:focus {
  border: 2px solid var(--secondary);
    background-color: var(--secondary);
    color: var(--background);
  }
  &.tertiary-button:focus{
    outline: 4px auto var(--secondary);
  }

  &:disabled, &:disabled:hover {
    background-color: var(--tertiary);
    color: var(--background);
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`${buttonStyles}`;

const StyledButtonLink = styled(Link)`${buttonStyles}`;

const Button = ({
  link,
  to,
  buttonType,
  small,
  children,
  disabled,
  tooltipText,
  onClick,
}: ButtonProps) => {
  console.log(tooltipText)
  if (link && to) {
    return (
      <StyledButtonLink
        to={to}
        className={
          small ? `small ${buttonType}-button` : `${buttonType}-button`
        }
      >
        {children}
      </StyledButtonLink>
    );
  } else {
    return (
      <StyledButton
        className={
          small ? `small ${buttonType}-button` : `${buttonType}-button`
        }
        onClick={onClick}
        disabled={disabled}
        title={disabled ? tooltipText : undefined}
      >
        {children}
      </StyledButton>
    );
  }
};

export default Button;
