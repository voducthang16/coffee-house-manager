import { CartIcon } from '~/components/Icons';
import { payment_mobile, getProductsOrder } from '~/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
function BottomNavigator() {
    const dispatch = useAppDispatch();
    const productsOrder = useAppSelector(getProductsOrder);
    return (
        <div className="md:hidden fixed z-50 left-0 right-0 bottom-0 bg-white border-t border-slate-200 shadow">
            <div className="container">
                <div className="h-20 flex items-center justify-between">
                    <div>HOME</div>
                    <div onClick={() => dispatch(payment_mobile())} className="p-4 cursor-pointer relative">
                        <CartIcon width={24} height={24} />
                        <span
                            className="absolute top-0 right-0 
                        bg-red-300 w-5 h-5 text-center text-sm leading-5 rounded-full"
                        >
                            {productsOrder ? productsOrder.length : 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomNavigator;
