import { useState, useCallback } from 'react';

const useReincarnation = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = useCallback((transactionHash, receiverAddress) => {
        if (!transactionHash) return;
        if (!receiverAddress) return;
        setLoading(true);
        // TODO: set env file for endpoint
        const fetchUrl = 'http:///notif';
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: JSON.stringify({
                transactionHash,
                receiverAddress,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(String(error));
                setLoading(false);
            });
    }, []);

    return [{ data, error, isLoading }, fetchData];
};

export default useReincarnation;
