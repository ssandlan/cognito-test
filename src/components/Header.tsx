import { Navigation } from "./Navigation/Navigation";

const Header = () => {
  return (
    <header>
      <h1><img src="logo.svg" alt="logo" /></h1>
      <Navigation />
    </header>
  );
}

export default Header;