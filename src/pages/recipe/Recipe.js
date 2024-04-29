import React from "react";
import "./Recipe.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
// Loading, title, ... id 필요.

export default function Recipe() {
    const { id } = useParams();
    const url = `http://localhost:3000/recipes/${id}`;
    const { data: recipe, isPending, error } = useFetch(url);
    const { mode } = useTheme();

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map(ingredient => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
                </>
            )}
        </div>
    );
}
