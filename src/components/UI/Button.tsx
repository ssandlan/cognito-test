import { ButtonProps } from "../../types";
import { Link } from "react-router-dom";

const Button = ({ link, to, onClick, buttonType, children }: ButtonProps) => {
  if (link && to) {
    return <Link to={to}>{children}</Link>;
  } else {
    return <button onClick={onClick}>{children}</button>;
  }
};

export default Button;
