import { useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
    const { data: user, isLoading, isFetching } = trpc.session.user.useQuery();
    const router = useRouter();

    useEffect(() => {
        const isWaiting = isLoading || isFetching;

        if (isWaiting) {
            return;
        }

        if (!user || !user.isLoggedIn) {
            return;
        }

        if (user && user.isLoggedIn && redirectIfFound) {
            console.log('User is logged in, being redirected to dashboard...');
            router.push(redirectTo);
        }
    }, [user, isLoading, redirectTo, redirectIfFound, router, isFetching]);

    return { user, isLoading, isFetching };
};

export default useUser;
