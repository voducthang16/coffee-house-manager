import BottomNavigator from '~/layouts/components/BottomNavigator';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <>
            {/* <Sidebar /> */}
            <main className="bg-[#f3f3f9]">
                {/* <Header /> */}
                <Children />
            </main>
            <BottomNavigator />
        </>
    );
}

export default DefaultLayout;
