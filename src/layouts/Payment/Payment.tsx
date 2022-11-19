import { Button } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { getProductsOrder, discount, getDiscount } from '~/features/order/orderSlice';
import { useState } from 'react';
import './Payment.scss';

function Payment() {
    const productsOrder = useAppSelector(getProductsOrder);
    const discount = useAppSelector(getDiscount);
    const [pay, setPay] = useState(false);
    return (
        <div className="space-y-4 text-base">
            <div className="flex justify-between">
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
            {/* discount */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <label htmlFor="discount">Giảm giá</label>
                        <input
                            className="border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                            type="number"
                            name="discount"
                            id="discount"
                        />
                        <span>%</span>
                    </div>
                    <span>6000VND</span>
                </div>
                <div>
                    <textarea
                        className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                        rows={2}
                        name="reason"
                        id="reason"
                        placeholder="Lý do giảm giá"
                    ></textarea>
                </div>
            </div>
            {/* surcharge */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <label htmlFor="surcharge">Phụ thu</label>
                        <input
                            className="border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                            type="number"
                            name="surcharge"
                            id="surcharge"
                        />
                        <span>%</span>
                    </div>
                    <span>6000VND</span>
                </div>
                <div>
                    <textarea
                        className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                        rows={2}
                        name="reason"
                        id="reason"
                        placeholder="Lý do phụ thu"
                    ></textarea>
                </div>
            </div>
            {/* tax */}
            <div className="flex justify-between items-center">
                <div>
                    <label htmlFor="tax">Thuế</label>
                    <input
                        className="border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                        type="number"
                        name="tax"
                        id="tax"
                    />
                    <span>%</span>
                </div>
                <span>6000VND</span>
            </div>
            {/* note */}
            <div>
                <textarea
                    className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                    rows={2}
                    name="note"
                    id="note"
                    placeholder="Ghi chú hóa đơn"
                ></textarea>
            </div>
            {/* voucher */}
            <div className="flex justify-between items-center">
                <div className="flex-1 flex justify-between items-center">
                    <label className="min-w-[88px]" htmlFor="voucher">
                        Mã giảm giá
                    </label>
                    <input
                        className="w-full border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                        type="text"
                        name="voucher"
                        id="voucher"
                    />
                    <span>6000VND</span>
                </div>
                <Button colorScheme="linkedin" className="ml-4">
                    Áp dụng
                </Button>
            </div>
            <div className="flex justify-between items-center pb-5 border-b border-slate-200">
                <span>Tổng</span>
                <span className="font-bold">200.000VND</span>
            </div>
            <div className="pt-5 flex justify-between items-center">
                <span>Phương thức thanh toán</span>
                <div className="flex space-x-2">
                    <div className="group">
                        <input className="hidden" type="radio" name="payment_type" id="cash" />
                        <label
                            onClick={() => setPay(true)}
                            htmlFor="cash"
                            className="flex items-center p-2 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                            border border-slate-300 rounded-lg text-base space-x-2 transition-all"
                        >
                            <span className="relative block min-w-[20px] min-h-[20px] rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                <span
                                    className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                ></span>
                            </span>
                            <span>Tiền mặt</span>
                        </label>
                    </div>
                    <div className="group">
                        <input className="hidden" type="radio" name="payment_type" id="momo" />
                        <label
                            onClick={() => setPay(false)}
                            htmlFor="momo"
                            className="flex items-center p-2 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                            border border-slate-300 rounded-lg text-base space-x-2 transition-all"
                        >
                            <span className="relative block min-w-[20px] min-h-[20px] rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                <span
                                    className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                ></span>
                            </span>
                            <span>Momo</span>
                        </label>
                    </div>
                </div>
            </div>
            {pay ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 flex justify-between items-center">
                            <label className="min-w-[120px]" htmlFor="client_money">
                                Tiền khách đưa
                            </label>
                            <input
                                className="w-full border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                                type="text"
                                name="client_money"
                                id="client_money"
                            />
                            <span>VND</span>
                        </div>
                        <Button colorScheme="linkedin" className="ml-4">
                            Áp dụng
                        </Button>
                    </div>
                    <div>
                        <span>Tiền trả khách</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Payment;
