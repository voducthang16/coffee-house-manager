import BottomNavigator from '~/layouts/components/BottomNavigator';

interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <>
            <main>
                <Children />
            </main>
            <BottomNavigator />
        </>
    );
}

export default DefaultLayout;
