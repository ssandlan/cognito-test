import React from "react";
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

/**
 * Styled button component.
 *
 * This component applies the button styles to a button element.
 */
const StyledButton = styled.button`${buttonStyles}`;

/**
 * Styled link component.
 *
 * This component applies the button styles to a Link element.
 */
const StyledButtonLink = styled(Link)`${buttonStyles}`;

/**
   * Renders a styled button or a styled link based on the provided props.
   *
   * If the `link` prop is true and the `to` prop is provided, it renders a styled link.
   * Otherwise, it renders a styled button. The button can be disabled and display a tooltip
   * when disabled.
   *
   * @param {ButtonProps} props - The component props.
   * @param {boolean} props.link - Determines if the component should render a link.
   * @param {string} [props.to] - The URL to navigate to if the component renders a link.
   * @param {boolean} [props.small] - Determines if the button should be rendered in a small size.
   * @param {string} props.buttonType - The type of the button, used for styling.
   * @param {React.ReactNode} props.children - The content to be displayed inside the button.
   * @param {() => void} [props.onClick] - The click handler for the button.
   * @param {boolean} [props.disabled] - Determines if the button should be disabled.
   * @param {string} [props.tooltipText] - The tooltip text to display when the button is disabled.
   * @returns {JSX.Element} - The rendered button or link component.
   */
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
