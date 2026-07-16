// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// export const useAuthTokensFromUrl = () => {
//     const [searchParams, setSearchParams] = useSearchParams();

//     useEffect(() => {
//         const accessToken = searchParams.get('accessToken');
//         const refreshToken = searchParams.get('refreshToken');

//         if (accessToken && refreshToken) {
//             localStorage.setItem('accesstoken', accessToken);
//             localStorage.setItem('refreshtoken', refreshToken);
//             setSearchParams({});
//         }
//     }, [searchParams, setSearchParams]);
// };








import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useAuthTokensFromUrl = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;

        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const user = searchParams.get('user');

        if (accessToken && refreshToken) {
            processed.current = true;

            console.log('🔑 Tokens found in URL, storing now...');

            // Immediate storage
            localStorage.setItem('accesstoken', accessToken);
            localStorage.setItem('refreshtoken', refreshToken);

            // if (user) {
            //     try {
            //         localStorage.setItem('user', user);
            //     } catch (e) {
            //         console.error('Failed to store user data', e);
            //     }
            // }

            // Small delay before clearing URL to ensure storage is done
            setTimeout(() => {
                setSearchParams({});
            }, 1000000000);

            // Force a storage event for other tabs/components if needed
            window.dispatchEvent(new Event('storage'));
        }
    }, [searchParams, setSearchParams]);
};