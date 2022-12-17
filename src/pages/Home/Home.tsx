import { CashierIcon, DashboardIcon, InvoiceIcon, RestaurantIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { setOrderType } from '~/features/order/orderSlice';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';
function Home() {
    const dispatch = useAppDispatch();
    return (
        <Fragment>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="px-8 bg-white">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <Link
                            to={'/'}
                            className="p-4 rounded-lg flex flex-col items-center justify-center bg-[#eeedef]"
                        >
                            <div className="p-5 rounded-full bg-[#6175e6]">
                                <InvoiceIcon width={48} height={48} className={'fill-white'} />
                            </div>
                            <h6 className="mt-2 text-2xl font-normal">Đơn Online</h6>
                        </Link>
                    </div>
                    <div className="col-span-3">
                        <Link
                            to={'/order'}
                            onClick={() => {
                                dispatch(setOrderType(0));
                                // dispatch(setTableId(0));
                            }}
                            className="p-4 rounded-lg flex flex-col items-center justify-center bg-[#eeedef]"
                        >
                            <div className="p-5 rounded-full bg-[#078646]">
                                <CashierIcon width={48} height={48} className={'fill-white'} />
                            </div>
                            <h6 className="mt-2 text-2xl font-normal">Tại Quầy</h6>
                        </Link>
                    </div>
                    <div className="col-span-3">
                        <Link
                            to={'/table'}
                            className="p-4 rounded-lg flex flex-col items-center justify-center bg-[#eeedef]"
                        >
                            <div className="p-5 rounded-full bg-[#f85961]">
                                <RestaurantIcon width={48} height={48} className={'fill-white'} />
                            </div>
                            <h6 className="mt-2 text-2xl font-normal">Tại Bàn</h6>
                        </Link>
                    </div>
                    <div className="col-span-3">
                        <Link
                            to={'/'}
                            className="p-4 rounded-lg flex flex-col items-center justify-center bg-[#eeedef]"
                        >
                            <div className="p-5 rounded-full bg-[#ff8106]">
                                <DashboardIcon width={48} height={48} className={'fill-white'} />
                            </div>
                            <h6 className="mt-2 text-2xl font-normal">Báo Cáo</h6>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
