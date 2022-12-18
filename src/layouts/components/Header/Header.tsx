import { useState, useEffect } from 'react';
function Header() {
    const [hour, setHour] = useState(0);
    useEffect(() => {
        const d = new Date();
        setHour(d.getHours());
    }, []);
    const welcome = (hour: number) => {
        if (hour >= 5 && hour < 12) {
            return 'Good Morning';
        } else if (hour >= 12 && hour <= 18) {
            return 'Good Afternoon';
        } else if (hour > 18 && hour <= 22) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    };
    return (
        <header className="border-b bg-white border-slate-200">
            <div className="h-24 px-8">
                <div className="h-full flex items-center">
                    <div>
                        <h3 className="text-[#495057] text-base font-medium">
                            {hour} - {welcome(hour)}, nohii!
                        </h3>
                        <p className="text-sm">Have A Nice Day!</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
