/** LIBRARIES */
import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500): T => {
    const [ debouncedValue, setDebouncedValue ] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timerId);
    }, [delay, value]);
    return debouncedValue;
}

export default useDebounce;
