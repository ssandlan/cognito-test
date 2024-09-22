import Header from "../Header";

/**
 * ErrorPage component for the application.
 *
 * This component renders an error page, which includes a header and a main section with an error message.
 * The error message indicates that the requested page could not be found.
 *
 * @returns {JSX.Element} - The rendered error page component.
 */
const ErrorPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Error</h1>
        <p>Could not find this page.</p>
      </main>
    </>
  );
};

export default ErrorPage;
