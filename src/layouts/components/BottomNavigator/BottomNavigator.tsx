import { CartIcon } from '~/components/Icons';
import {
    payment_mobile,
    getProductsOrder,
    getProductsTemp,
    getTableId,
    getOrderType,
} from '~/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { Link, useLocation } from 'react-router-dom';
function BottomNavigator() {
    const dispatch = useAppDispatch();
    // product order at cashier
    const productsOrder = useAppSelector(getProductsOrder);

    // product order at table
    const productOrderTable = useAppSelector(getProductsTemp);

    // get table Id
    const tableId = useAppSelector(getTableId);

    // get item of order at table
    const lengthTemp = productOrderTable.filter((item: any) => item.tableId === tableId);

    // order type
    const orderType = useAppSelector(getOrderType);

    const location = useLocation();
    return (
        <div className="md:hidden fixed z-50 left-0 right-0 bottom-0 bg-white border-t border-slate-200 shadow">
            <div className="container">
                <div className="h-20 flex items-center justify-between">
                    <Link to="/">HOME</Link>
                    <div
                        onClick={() => {
                            if (location.pathname === '/order') {
                                dispatch(payment_mobile());
                            }
                        }}
                        className="p-4 cursor-pointer relative"
                    >
                        <CartIcon width={24} height={24} />
                        <span
                            className="absolute top-0 right-0 
                        bg-red-300 w-5 h-5 text-center text-sm leading-5 rounded-full"
                        >
                            {orderType === 0 ? productsOrder.length : lengthTemp.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomNavigator;
