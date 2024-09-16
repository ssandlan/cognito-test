import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProductsList from "./components/ProductsList";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <ProductsList />
    </QueryClientProvider>
  );
}

export default App;
