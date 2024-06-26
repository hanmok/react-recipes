import { BrowserRouter, Route, Routes } from "react-router-dom";
// styles
import "./App.css";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Create from "./pages/create/Create";
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
    const { mode } = useTheme();

    return (
        <div className={`App ${mode}`}>
            <BrowserRouter>
                <Navbar />
                <ThemeSelector />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/recipes/:id" element={<Recipe />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
