import BottomNavigator from '~/layouts/components/BottomNavigator';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <>
            <Sidebar />
            <main className={'ml-64'}>
                <Children />
            </main>
            <BottomNavigator />
        </>
    );
}

export default DefaultLayout;
