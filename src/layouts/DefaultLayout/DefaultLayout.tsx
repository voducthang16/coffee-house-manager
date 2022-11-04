interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    return (
        <div>
            <p>HEADER</p>
            <main className="mt-16">
                <p>CHILDREN</p>
            </main>
        </div>
    );
}

export default DefaultLayout;
