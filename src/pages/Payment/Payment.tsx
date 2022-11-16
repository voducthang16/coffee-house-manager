import { useAppSelector } from '~/app/hooks';
import { getProductsOrder } from '~/features/order/orderSlice';

function Payment() {
    const productsOrder = useAppSelector(getProductsOrder);

    return (
        <div className="overflow-hidden">
            <div className="bg-[#e8eaf2] py-20">
                <div className="container h-screen">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <div className="flex justify-between text-base">
                                <span>Tạm tính</span>
                                <span>
                                    {productsOrder
                                        .reduce((a, b) => a + b.price, 0)
                                        .toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                </span>
                            </div>
                        </div>
                        <div className="col-span-6">tra khach</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
