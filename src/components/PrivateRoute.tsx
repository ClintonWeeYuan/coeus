import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/components/hooks/useUser';
import LoadingScreen from '@/components/common/LoadingScreen';

interface Props {
    privateRoutes: string[];
    children: ReactNode;
}
const PrivateRoute = ({ privateRoutes, children }: Props) => {
    const router = useRouter();

    const { user, isLoading, isFetching } = useUser();

    const isPrivateRoute = privateRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        const isWaiting = isLoading || isFetching;
        const unauthenticatedUser = !user || !user.isLoggedIn;

        if (!isWaiting && unauthenticatedUser && isPrivateRoute) {
            router.push('/login');
        }
    }, [user, isLoading, isFetching, isPrivateRoute, router]);

    if ((isLoading || isFetching) && !user?.isLoggedIn && isPrivateRoute) {
        return <LoadingScreen />;
    } else {
        return <>{children}</>;
    }
};

export default PrivateRoute;
