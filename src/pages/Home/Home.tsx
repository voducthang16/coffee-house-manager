import { CashierIcon, AdministratorIcon, InvoiceIcon, RestaurantIcon } from '~/components/Icons';
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
            <div className="h-screen flex items-center justify-center">
                <div className="container p-8">
                    <div className="w-[512px] mx-auto grid grid-cols-2 gap-x-16 gap-y-8">
                        <div className="col-span-1 w-64 h-64">
                            <Link
                                to={'/order'}
                                onClick={() => {
                                    dispatch(setOrderType(0));
                                    // dispatch(setTableId(0));
                                }}
                                className="shadow-box w-full h-full rounded-lg flex flex-col items-center justify-center bg-white"
                            >
                                <div className="p-5 rounded-full bg-[#078646]">
                                    <CashierIcon width={48} height={48} className={'fill-white'} />
                                </div>
                                <h6 className="mt-2 text-2xl font-normal">Tại Quầy</h6>
                            </Link>
                        </div>
                        <div className="col-span-1 w-64 h-64">
                            <Link
                                to={'/table'}
                                className="shadow-box w-full h-full rounded-lg flex flex-col items-center justify-center bg-white"
                            >
                                <div className="p-5 rounded-full bg-[#f85961]">
                                    <RestaurantIcon width={48} height={48} className={'fill-white'} />
                                </div>
                                <h6 className="mt-2 text-2xl font-normal">Tại Bàn</h6>
                            </Link>
                        </div>
                        <div className="col-span-1 w-64 h-64">
                            <Link
                                to={'/dashboard'}
                                className="shadow-box w-full h-full rounded-lg flex flex-col items-center justify-center bg-white"
                            >
                                <div className="p-5 rounded-full bg-[#ff8106]">
                                    <AdministratorIcon width={48} height={48} className={'fill-white'} />
                                </div>
                                <h6 className="mt-2 text-2xl font-normal">Quản Trị</h6>
                            </Link>
                        </div>
                        <div className="col-span-1 w-64 h-64">
                            <Link
                                to={'/'}
                                className="shadow-box w-full h-full rounded-lg flex flex-col items-center justify-center bg-white"
                            >
                                <div className="p-5 rounded-full bg-[#6175e6]">
                                    <InvoiceIcon width={48} height={48} className={'fill-white'} />
                                </div>
                                <h6 className="mt-2 text-2xl font-normal">Đơn Online</h6>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
