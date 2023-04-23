import { useState, useEffect } from 'react';
import { throttle } from '../utils/index';

function useWindowSize(throttleTime = 300) {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        let timeoutId;
        const handleResize = throttle(() => {
            setSize([window.innerWidth, window.innerHeight]);
        }, throttleTime);

        const handleClientLoad = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            timeoutId = setTimeout(handleClientLoad, 500);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [throttleTime]);

    return size;
}

export default useWindowSize;
