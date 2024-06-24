import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonPage from "./pages/PokemonPage.tsx";

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

  return <RouterProvider router={router} />;
}

export default App;
