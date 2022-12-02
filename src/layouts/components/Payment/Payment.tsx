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
    setTableId,
} from '~/features/order/orderSlice';
import { getTablesAvailable } from '~/features/table/tableSlice';
import PaymentModal from './PaymentModal';
interface PaymentProps {
    listProducts: Array<OrderProps>;
}

function Payment({ listProducts }: PaymentProps) {
    const dispatch = useAppDispatch();
    const listProductsById: Array<OrderProps> = [];

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

    // table available
    const tableAvailable = useAppSelector(getTablesAvailable);

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
                        <div className="space-y-4">
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
                        <div className={`flex ${orderType === 1 ? 'justify-between' : 'justify-end'}`}>
                            {orderType === 1 && (
                                <select
                                    value={tableId ? tableId : 0}
                                    onChange={(e) => {
                                        dispatch(setTableId(+e.target.value));
                                    }}
                                    className="p-2 rounded-lg bg-[#ff8106] text-white outline-none"
                                >
                                    <option value={0} hidden>
                                        Chọn Bàn
                                    </option>
                                    {tableAvailable.map((tab, index) => (
                                        <option key={index} value={tab.id}>
                                            Bàn {tab.id}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <PaymentModal
                                listProducts={listProducts}
                                orderType={orderType}
                                payment_mobile_status={payment_mobile_status}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Payment;
