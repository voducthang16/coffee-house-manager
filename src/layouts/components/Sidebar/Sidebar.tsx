import Image from '~/components/Image';
import images from '~/assets/images';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { CashierIcon, CoffeeIcon, DashboardIcon, HomeIcon, RestaurantIcon } from '~/components/Icons';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
function Sidebar() {
    const dispatch = useAppDispatch();

    const scrollbar = () => {
        // config here
        const asideHeaderHeight = 96;
        const heightWindow = window.innerHeight;
        const asideScroll = document.querySelector('.aside-scroll') as HTMLElement | null;
        const asideFooter = document.querySelector('.aside-footer') as HTMLElement | null;
        // 32 is margin y of aside scroll
        let height = heightWindow - asideHeaderHeight - asideFooter!.offsetHeight - 32;
        asideScroll!.style.height = `${height}px`;
        window.addEventListener('resize', function () {
            height = window.innerHeight - asideHeaderHeight - asideFooter!.offsetHeight - 32;
            asideScroll!.style.height = `${height}px`;
        });
    };
    useEffect(() => {
        scrollbar();
    }, []);
    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 flex flex-col bg-sidebar">
            {/* ===== Start Logo ===== */}
            <div className="flex-none aside-header flex items-center justify-center border-b border-[#00352b]">
                <Image className="h-24 object-contain" src={images.logo} alt="Logo" />
            </div>
            {/* ===== End Logo ===== */}
            <div className="flex-auto flex-shrink-0 aside-body">
                <div className="aside-scroll px-4 my-4 mr-2 overflow-hidden">
                    <NavLink
                        to={'/dashboard'}
                        className="nav-link flex items-center rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-200"
                    >
                        <DashboardIcon className="mr-4" width={20} height={20} />
                        <span className="text-xl text-[#00352b]">Tổng quan</span>
                    </NavLink>
                    <NavLink
                        to={'/product'}
                        className="nav-link flex items-center rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-200"
                    >
                        <CoffeeIcon className="mr-4" width={20} height={20} />
                        <span className="text-xl text-[#00352b]">Sản phẩm</span>
                    </NavLink>
                    {/* <Accordion allowToggle>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((index) => (
                            <AccordionItem key={index} className="border-none">
                                <h2>
                                    <AccordionButton
                                        className="flex items-center rounded-lg"
                                        _expanded={{ bg: '#f3f3f9', color: 'black' }}
                                    >
                                        <DashboardIcon className="mr-4" width={24} height={24} />
                                        <span className="text-xl">Title {index}</span>
                                        <AccordionIcon className="ml-auto" />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion> */}
                </div>
            </div>

            {/* ===== Start Aside Footer ===== */}
            <div className="flex-none aside-footer text-center text-base py-4 mx-4">
                <Link
                    className="flex justify-center items-center w-full py-3 text-white font-medium bg-info rounded-lg cursor-pointer"
                    to={'/'}
                >
                    <HomeIcon className="mr-2 fill-white" width={18} height={18} /> Trở Về Trang Chủ
                </Link>
            </div>
            {/* ===== End Aside Footer ===== */}
        </aside>
    );
}

export default Sidebar;
