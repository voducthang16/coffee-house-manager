import BottomNavigator from '~/layouts/components/BottomNavigator';
interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <>
            <main className="bg-[#f3f3f9] mb-20 md:mb-0 min-h-screen">
                <Children />
            </main>
            <BottomNavigator />
        </>
    );
}

export default DefaultLayout;
