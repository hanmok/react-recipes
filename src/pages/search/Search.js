import React, { useEffect } from "react";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

// export default function Search() {
//     const queryString = useLocation().search;
//     const queryParams = new URLSearchParams(queryString);
//     const query = queryParams.get("q");

//     const url = "http://localhost:3000/recipes?q=" + query;
//     const { error, isPending, data } = useFetch(url);

//     return (
//         <div>
//             <h2 className="page-title">Recipes including "{query}"</h2>
//             {error && <p className="error">{error}</p>}
//             {isPending && <p className="loading">Loading...</p>}
//             {data && <RecipeList recipes={data} />}
//         </div>
//     );
// }

export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get("q");

    // const url = "http://localhost:3000/recipes?q=" + query;
    const url = "http://localhost:3000/recipes";
    // q: title 로 들어감
    const { error, isPending, data } = useFetch(url);

    useEffect(() => {
        if (data) {
            console.log(data);
            console.log("filtered");
            console.log(data.filter(recipe => recipe.title.includes(query)));
        }
    }, [data]);
    // empty array is truthy

    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && (
                <RecipeList
                    recipes={data.filter(recipe => {
                        const lowerRecipe = recipe.title.toLowerCase();
                        const lowerQuery = query ? query.toLowerCase() : "";
                        return lowerRecipe.includes(lowerQuery);
                    })}
                />
            )}
        </div>
    );
}
