import Image from '~/components/Image';
import images from '~/assets/images';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
function Sidebar() {
    const scrollbar = () => {
        // config here
        const asideHeaderHeight = 96;
        const heightWindow = window.innerHeight;
        const asideScroll = document.querySelector('.aside-scroll') as HTMLElement | null;
        const asideFooter = document.querySelector('.aside-footer') as HTMLElement | null;
        // 32 is margin y of aside scroll
        const height = heightWindow - asideHeaderHeight - asideFooter!.offsetHeight - 32;
        asideScroll!.style.height = `${height}px`;
    };
    useEffect(() => {
        scrollbar();
    }, []);
    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 flex flex-col bg-sidebar">
            {/* ===== Start Logo ===== */}
            <div className="flex-none aside-header flex items-center justify-center border-b border-black">
                <Image className="h-24 object-contain" src={images.logo} alt="Logo" />
            </div>
            {/* ===== End Logo ===== */}
            <div className="flex-auto flex-shrink-0 aside-body">
                <div className="aside-scroll px-4 my-4 mr-2 overflow-hidden">
                    <Accordion allowToggle>
                        {/* <AccordionItem className="border-none">
                            <h2>
                                <AccordionButton
                                    className="flex justify-between rounded-lg"
                                    _expanded={{ bg: '#f3f3f9', color: 'black' }}
                                >
                                    <span className="text-xl">Title 1</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem className="border-none">
                            <h2>
                                <AccordionButton
                                    className="flex justify-between rounded-lg"
                                    _expanded={{ bg: '#f3f3f9', color: 'black' }}
                                >
                                    <span className="text-xl">Title 2</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </AccordionItem> */}

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((index) => (
                            <AccordionItem key={index} className="border-none">
                                <h2>
                                    <AccordionButton
                                        className="flex justify-between rounded-lg"
                                        _expanded={{ bg: '#f3f3f9', color: 'black' }}
                                    >
                                        <span className="text-xl">Title {index}</span>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            {/* ===== Start Aside Footer ===== */}
            <div className="flex-none aside-footer p-4 bg-slate-200 border-t border-black">Footer</div>
            {/* ===== End Aside Footer ===== */}
        </aside>
    );
}

export default Sidebar;
