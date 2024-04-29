import "./Create.css";
import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef(null);
    const { postData, data, error } = useFetch(
        "http://localhost:3000/recipes",
        "POST"
    );

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(title, method, cookingTime, ingredients);
        postData({
            title,
            ingredients,
            method,
            cookingTime: cookingTime + " minutes",
        });
    };

    // redirect the user when we get data response
    useEffect(() => {
        // component 가 Load 되었을 때 자동으로 fire 됨.
        if (data) {
            navigate("/");
        }
    }, [data]);

    const handleAdd = e => {
        e.preventDefault();

        const ing = newIngredient.trim(); // remove any space

        // ing: ingredients we try to add
        // ingredients: already added ingredients
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing]);
        }
        setNewIngredient("");
        ingredientInput.current.focus();
    };

    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                {/* ingredients go here */}
                <label>
                    <span>Recipe ingredients</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={e => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button onClick={handleAdd} className="btn">
                            add
                        </button>
                    </div>
                </label>
                <p>
                    Current ingredients:{" "}
                    {ingredients.map(i => (
                        <em key={i}>{i}, </em>
                    ))}
                </p>

                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={e => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type="number"
                        onChange={e => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className="btn">submit</button>
            </form>
        </div>
    );
}
