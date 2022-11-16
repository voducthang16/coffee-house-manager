interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <div>
            <main>
                <Children />
            </main>
        </div>
    );
}

export default DefaultLayout;
