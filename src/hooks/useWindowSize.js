import { useState, useEffect } from 'react';
import { throttle } from '../utils/index';

function useWindowSize(throttleTime = 300) {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleResize = throttle(() => {
            setSize([window.innerWidth, window.innerHeight]);
        }, throttleTime);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [throttleTime]);

    return size;
}

export default useWindowSize;