import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

// theme 상태를 변경하는 데 사용. 현재 state 와 action 을 받아서 새로운 상태를 반환.
const themeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_COLOR":
            return { ...state, color: action.payload };
        case "CHANGE_MODE":
            return { ...state, mode: action.payload };
        default:
            return state;
    }
};

// Theme 관련 state 관리, 해당 state 를 children 에 제공하는 Provider 정의.
export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: "#58249c",
        mode: "dark",
    });

    // 상태 변경을 위한 함수 정의
    // 각각은 dispatch 함수를 호출하여 특정 action 을 발생시킴.
    const changeColor = color => {
        dispatch({ type: "CHANGE_COLOR", payload: color });
    };
    const changeMode = mode => {
        dispatch({ type: "CHANGE_MODE", payload: mode });
    };

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
