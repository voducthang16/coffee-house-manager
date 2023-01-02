import { CloseIcon, DeleteIcon, ToDoListIcon } from '~/components/Icons';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import {
    getOrderType,
    getPaymentMobile,
    getTableId,
    OrderProps,
    payment_mobile,
    remove,
    remove_temp,
    changeTableStatusAsync,
} from '~/features/order/orderSlice';
import PaymentModal from './PaymentModal';
import { useNavigate } from 'react-router-dom';
interface PaymentProps {
    listProducts: Array<OrderProps>;
}

function Payment({ listProducts }: PaymentProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // payment mobile status
    const payment_mobile_status = useAppSelector(getPaymentMobile);

    // delete product in order
    const deleteProductInOrder = (productId: number) => {
        if (orderType === 1) {
            dispatch(remove_temp(productId));
        } else {
            dispatch(remove(productId));
        }
    };

    // order type
    const orderType = useAppSelector(getOrderType);

    // table id
    const tableId = useAppSelector(getTableId);

    return (
        <div
            className={`${
                payment_mobile_status ? 'payment-mobile' : ''
            } hidden md:block md:col-span-5 lg:col-span-4 bg-white rounded-lg p-4`}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="space-y-4">
                    <h6 className="text-2xl font-normal relative">
                        Thanh toán - {orderType === 0 ? 'Tại quầy' : `Tại bàn ${tableId}`}
                        {payment_mobile_status ? (
                            <span onClick={() => dispatch(payment_mobile())} className="cursor-pointer">
                                <CloseIcon
                                    width={16}
                                    height={16}
                                    className="absolute top-1/2 -translate-y-1/2 right-2"
                                />
                            </span>
                        ) : (
                            <></>
                        )}
                    </h6>
                    {listProducts.length !== 0 ? (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            {listProducts.map((item, index) => (
                                <div key={index} className="flex text-sm">
                                    <span className="mr-2 min-w-[24px]">{item.quantity} x</span>
                                    <h6 className="break-words">{item.name}</h6>
                                    <span className="ml-auto">
                                        {item.price.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                    <span
                                        onClick={() => {
                                            deleteProductInOrder(item.id);
                                        }}
                                        className="ml-2"
                                    >
                                        <DeleteIcon
                                            width={16}
                                            height={16}
                                            className="cursor-pointer hover:opacity-60 transition-all"
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2 flex flex-col items-center">
                            <ToDoListIcon height={48} width={48} />
                            <p className="text-lg">Hiện chưa có dịch vụ</p>
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-base">
                        <span>Tổng cộng: </span>
                        <span>
                            {listProducts.length !== 0 ? (
                                listProducts
                                    .reduce((a, b) => a + b.price, 0)
                                    .toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })
                            ) : (
                                <span>0 VND</span>
                            )}
                        </span>
                    </div>
                    {listProducts.length !== 0 ? (
                        <div className={`flex justify-end`}>
                            {orderType === 0 ? (
                                <PaymentModal
                                    listProducts={listProducts}
                                    orderType={orderType}
                                    payment_mobile_status={payment_mobile_status}
                                />
                            ) : (
                                <div className="space-x-4">
                                    <button
                                        onClick={() => {
                                            dispatch(changeTableStatusAsync({ tableId: tableId, status: 1 }));
                                            navigate('/table');
                                        }}
                                        className="p-2 rounded-lg bg-green-500 text-white text-base"
                                    >
                                        Lưu
                                    </button>
                                    <PaymentModal
                                        listProducts={listProducts}
                                        orderType={orderType}
                                        payment_mobile_status={payment_mobile_status}
                                        tableId={tableId}
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Payment;
