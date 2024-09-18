import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/routes/Home";
import ProductsPage from "./components/routes/Products";
import RootLayout from "./components/routes/Root";
import ErrorPage from "./components/routes/Error";
import ProductPage from "./components/routes/product/[id]";
import { BasketContextProvider } from "./store/basket-context";
import BasketPage from "./components/routes/Basket";

const queryClient = new QueryClient();

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
