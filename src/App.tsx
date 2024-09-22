import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/routes/Home";
import ProductsPage from "./components/routes/Products";
import RootLayout from "./components/routes/Root";
import ErrorPage from "./components/routes/Error";
import ProductPage from "./components/routes/product/[id]";
import { BasketContextProvider } from "./store/basket-context";
import BasketPage from "./components/routes/Basket";

/**
 * Initializes a new QueryClient instance for React Query.
 */
const queryClient = new QueryClient();

/**
 * Configures the routes for the application using react-router-dom.
 *
 * The router includes the following routes:
 * - "/" (RootLayout): The root layout of the application.
 *   - "/products" (ProductsPage): The products page.
 *   - "/product/:id" (ProductPage): The product details page.
 *   - "/basket" (BasketPage): The basket page.
 * - ErrorPage: The error page to display for any route errors.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/basket", element: <BasketPage /> },
    ],
  },
]);

/**
 * App component for the application.
 *
 * This component sets up the QueryClientProvider for React Query and the RouterProvider for react-router-dom.
 * It also wraps the application in the BasketContextProvider to manage the state of the basket.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BasketContextProvider>
        <RouterProvider router={router} />
      </BasketContextProvider>
    </QueryClientProvider>
  );
}

export default App;
