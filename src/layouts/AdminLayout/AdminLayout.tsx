import BottomNavigator from '~/layouts/components/BottomNavigator';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
interface AdminLayoutProps {
    Children: React.ComponentType;
}

function AdminLayout({ Children }: AdminLayoutProps) {
    return (
        <>
            <Sidebar />
            <main className={'ml-64 bg-[#f3f3f9]'}>
                <Header />
                <Children />
            </main>
            <BottomNavigator />
        </>
    );
}

export default AdminLayout;
