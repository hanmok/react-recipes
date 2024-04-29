import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    // 전송할 데이터를 설정. POST 요청 할 때 사용됨.
    const postData = postData => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
    };

    useEffect(() => {
        const controller = new AbortController();

        // 에트워크 요청을 수행하는 함수. fetch API 를 이용하여 데이터를 가져오거나 전송.
        const fetchData = async fetchOptions => {
            setIsPending(true);

            try {
                const res = await fetch(url, {
                    ...fetchOptions,
                    signal: controller.signal,
                });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();

                setIsPending(false);
                setData(data);
                setError(null);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("the fetch was aborted");
                } else {
                    setIsPending(false);
                    setError("Could not fetch the data");
                }
            }
        };

        // invoke the function
        if (method === "GET") {
            fetchData();
        }
        if (method === "POST" && options) {
            fetchData(options);
        }
        // 언마운트 될 때 네트워크 요청 취소
        return () => {
            controller.abort();
        };
    }, [url, method, options]);

    return { data, isPending, error, postData };
};
