import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import {
    changeTableStatusAsync,
    createOrderAsync,
    createOrderDetailAsync,
    empty,
    empty_temp,
    OrderProps,
} from '~/features/order/orderSlice';
import { ProductProps } from '~/features/product/productSlice';
import { useAppDispatch } from '~/app/hooks';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentModalProps {
    listProducts: Array<OrderProps>;
    payment_mobile_status: boolean;
    orderType: number;
    tableId?: number;
}

function PaymentModal({ listProducts, payment_mobile_status, orderType, tableId }: PaymentModalProps) {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose } = useDisclosure();

    const [pay, setPay] = useState(false);

    const { register, handleSubmit, watch, reset, formState } = useForm({
        defaultValues: {
            discount: '',
            discount_reason: '',
            surcharge: '',
            surcharge_reason: '',
            tax: 10,
            note: '',
            payment_type: 0,
            voucher: '',
        },
    });
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({}, { keepDefaultValues: true });
        }
    }, [formState, reset]);

    let tempTotal: number | undefined = 0;

    if (listProducts.length > 0) {
        tempTotal = +listProducts.reduce((a, b) => a + b.price, 0);
    }

    const discount: string = watch('discount');
    let discountValue: number | undefined = 0;
    if (discount) {
        discountValue = (+discount / 100) * tempTotal;
    }

    const surcharge: string = watch('surcharge');
    let surchargeValue: number | undefined = 0;
    if (surcharge) {
        surchargeValue = (+surcharge / 100) * tempTotal;
    }

    const tax: number = watch('tax');
    let taxValue: number | undefined = 0;
    if (tax) {
        taxValue = (tax / 100) * tempTotal;
    }
    return (
        <>
            <button
                onClick={() => {
                    onPaymentOpen();
                }}
                className="p-2 rounded-lg bg-blue-600 text-white text-base"
            >
                Thanh toán
            </button>
            <Modal
                size={`${payment_mobile_status ? 'full' : 'lg'}`}
                isOpen={isPaymentOpen}
                onClose={onPaymentClose}
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <form
                    onSubmit={handleSubmit((data) => {
                        const dataSend = {
                            ...data,
                            discount: data.discount === '' ? 0 : data.discount,
                            surcharge: data.surcharge === '' ? 0 : data.surcharge,
                        };
                        const result = dispatch(
                            createOrderAsync({
                                user_id: 1,
                                client: 'Nhi',
                                total: tempTotal! - discountValue! + surchargeValue! + taxValue!,
                                ...dataSend,
                            }),
                        );
                        result
                            .then((res) => {
                                const id = res.payload.id;
                                if (res.payload.success) {
                                    listProducts.forEach((product: ProductProps, index: number) => {
                                        dispatch(
                                            createOrderDetailAsync({
                                                order_id: id,
                                                product_id: product.id,
                                                quantity: product.quantity,
                                                total: product.price,
                                            }),
                                        );
                                        if (index === listProducts.length - 1) {
                                            if (orderType === 0) {
                                                dispatch(empty());
                                            } else {
                                                dispatch(empty_temp(tableId!));
                                                dispatch(changeTableStatusAsync({ tableId: tableId!, status: 0 }));
                                            }
                                            toast({
                                                title: 'success',
                                                description: 'Thanh toán đơn hàng thành công',
                                                status: 'success',
                                                position: 'top-right',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                            setTimeout(() => {
                                                navigate('/');
                                            }, 3000);
                                            onPaymentClose();
                                        }
                                    });
                                }
                            })
                            .catch((err) => console.log(err));
                    })}
                >
                    <ModalContent>
                        <ModalHeader>Thanh toán</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className="space-y-4 text-base">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span>
                                        {tempTotal.toLocaleString('it-IT', {
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
                                                {...register('discount')}
                                                className="border border-slate-200 outline-none mx-2 px-2 py-1 rounded-md"
                                                type="number"
                                                id="discount"
                                                placeholder=""
                                            />
                                            <span>%</span>
                                        </div>
                                        <span>
                                            {discount
                                                ? discountValue!.toLocaleString('it-IT', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  })
                                                : '0 VND'}
                                        </span>
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                                            rows={2}
                                            {...register('discount_reason')}
                                            id="discount_reason"
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
                                                {...register('surcharge')}
                                                id="surcharge"
                                                placeholder=""
                                            />
                                            <span>%</span>
                                        </div>
                                        <span>
                                            {surcharge
                                                ? surchargeValue!.toLocaleString('it-IT', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  })
                                                : '0 VND'}
                                        </span>
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                                            rows={2}
                                            {...register('surcharge_reason')}
                                            id="surcharge_reason"
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
                                            {...register('tax')}
                                            id="tax"
                                        />
                                        <span>%</span>
                                    </div>
                                    <span>
                                        {tax
                                            ? taxValue!.toLocaleString('it-IT', {
                                                  style: 'currency',
                                                  currency: 'VND',
                                              })
                                            : '0 VND'}
                                    </span>
                                </div>
                                {/* note */}
                                <div>
                                    <textarea
                                        className="w-full border min-h-[64px] border-slate-200 outline-none px-2 py-1 rounded-md"
                                        rows={2}
                                        {...register('note')}
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
                                            {...register('voucher')}
                                            id="voucher"
                                        />
                                        <span>6000VND</span>
                                    </div>
                                    <Button colorScheme="linkedin" className="ml-4">
                                        Áp dụng
                                    </Button>
                                </div>
                                {/* total */}
                                <div className="flex justify-between items-center pb-5 border-b border-slate-200">
                                    <span>Tổng</span>
                                    <span className="font-bold">
                                        {(tempTotal - discountValue! + surchargeValue! + taxValue!).toLocaleString(
                                            'it-IT',
                                            {
                                                style: 'currency',
                                                currency: 'VND',
                                            },
                                        )}
                                    </span>
                                </div>
                                <div className="pt-5 flex justify-between items-center">
                                    <span>Phương thức thanh toán</span>
                                    <div className="flex space-x-2">
                                        <div className="group">
                                            <input
                                                className="hidden"
                                                type="radio"
                                                {...register('payment_type')}
                                                value={0}
                                                id="cash"
                                            />
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
                                            <input
                                                className="hidden"
                                                type="radio"
                                                {...register('payment_type')}
                                                value={1}
                                                id="momo"
                                            />
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
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onPaymentClose}>
                                Hủy
                            </Button>
                            <Button type="submit" colorScheme="blue">
                                Thanh toán
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default PaymentModal;
