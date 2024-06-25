import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonPage from "./pages/PokemonPage.tsx";
import { PokemonProvider } from "./Data/PokemonContext.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      errorElement: <div> 404 Not Found</div>,
    },
    {
      path: "/pokemon",
      element: <PokemonPage></PokemonPage>,
    },
    {
      path: "/pokemon/:pokemonId",
      element: <PokemonPage></PokemonPage>,
    },
  ]);

  return (
    <PokemonProvider>
      <RouterProvider router={router} />;
    </PokemonProvider>);
}

export default App;
