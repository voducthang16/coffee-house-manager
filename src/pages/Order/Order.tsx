import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { getCategory, fetchCategoryAsync, CategoryProps } from '~/features/category/categorySlice';
import {
    getProducts,
    fetchProductAsync,
    fetchProductByCategoryAsync,
    ProductProps,
} from '~/features/product/productSlice';
import {
    getProductsOrder,
    OrderProps,
    insert,
    update,
    remove,
    empty,
    createOrderAsync,
    createOrderDetailAsync,
    getPaymentMobile,
    payment_mobile,
    setTableId,
    getTableId,
    getOrderType,
    insert_temp,
    getProductsTemp,
} from '~/features/order/orderSlice';
import { CloseIcon, DeleteIcon, SearchIcon, ToDoListIcon } from '~/components/Icons';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
} from '@chakra-ui/react';
import './Order.scss';
import { useForm } from 'react-hook-form';
import { fetchTableAvailableAsync, getTablesAvailable, removeTable } from '~/features/table/tableSlice';

function Order() {
    const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const productsTemp = useAppSelector(getProductsTemp);
    const tableId = useAppSelector(getTableId);
    const category = useAppSelector(getCategory);
    const tableAvailable = useAppSelector(getTablesAvailable);
    const productsOrder = useAppSelector(getProductsOrder);
    const orderType = useAppSelector(getOrderType);
    useEffect(() => {
        dispatch(fetchProductAsync());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchCategoryAsync());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchTableAvailableAsync());
    }, [dispatch]);
    useEffect(() => {
        dispatch(empty());
    }, [dispatch]);
    const toast = useToast();

    const addProductToOrder = (productId: number) => {
        const findProduct = products.find((item: OrderProps) => item.id === productId) as OrderProps;
        const product = { quantity: 1, ...findProduct };
        const existProduct = productsOrder.find((item: OrderProps) => item.id === productId);
        if (existProduct) {
            const originalPrice = existProduct.price / existProduct.quantity!;
            const updateQuantity = {
                ...existProduct,
                quantity: existProduct.quantity! + 1,
                price: originalPrice * (existProduct.quantity! + 1),
            };
            dispatch(update(updateQuantity));
        } else {
            if (orderType === 1) {
                const productTemp = {
                    tableId: tableId,
                    ...product,
                };
                dispatch(insert_temp(productTemp));
            } else {
                dispatch(insert(product));
            }
        }
    };

    const deleteProductInOrder = (productId: number) => {
        dispatch(remove(productId));
    };

    // Payment
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

    if (productsOrder.length > 0) {
        tempTotal = +productsOrder.reduce((a, b) => a + b.price, 0);
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

    // category
    const [tab, setTab] = useState(0);
    const [selectValue, setSelectValue] = useState(0);

    const handleChangeSelect = (e: any) => {
        setSelectValue(e.target.value);
        if (+e.target.value === 0) {
            dispatch(fetchProductAsync());
        } else {
            dispatch(fetchProductByCategoryAsync(e.target.value));
        }
    };

    const payment_mobile_status = useAppSelector(getPaymentMobile);

    return (
        <div className="bg-[#e8eaf2]">
            <div className="container py-20">
                <div className="grid grid-cols-12 gap-4">
                    <div className="hidden lg:block col-span-2">
                        <ul className="text-lg font-normal text-center space-y-4">
                            <li
                                onClick={() => {
                                    setTab(0);
                                    dispatch(fetchProductAsync());
                                }}
                                className={`${
                                    tab === 0 ? '!bg-[#ff9d00] !text-white' : null
                                } bg-white text-black py-2 rounded-lg 
                                        cursor-pointer hover:opacity-80 transition-all duration-300`}
                            >
                                Tất cả
                            </li>
                            {category?.map((item: CategoryProps, index) => (
                                <li
                                    onClick={() => {
                                        setTab(index + 1);
                                        dispatch(fetchProductByCategoryAsync(index + 1));
                                    }}
                                    key={index}
                                    className={`${
                                        tab === index + 1 ? '!bg-[#ff9d00] !text-white' : null
                                    } bg-white text-black py-2 rounded-lg 
                                        cursor-pointer hover:opacity-80 transition-all duration-300`}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-7 lg:col-span-6 bg-white p-4 rounded-lg">
                        <div className="flex space-x-4 lg:space-x-0 items-center mb-4">
                            <div className="lg:hidden">
                                <select
                                    value={selectValue}
                                    onChange={handleChangeSelect}
                                    className="outline-none bg-slate-100 py-3 px-4 rounded-lg"
                                >
                                    <option value={0}>Tất cả</option>
                                    {category?.map((item: CategoryProps, index) => (
                                        <option key={index} value={index + 1}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <form className="relative flex-1">
                                <input
                                    className="input-search input-form"
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm"
                                />
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-slate-100 hover:transition-all hover:rounded-full hover:cursor-pointer">
                                    <SearchIcon width={16} height={16} className="fill-black" />
                                </div>
                            </form>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-base text-center">
                            {products?.map((item: ProductProps, index) => (
                                <div key={index} className="col-span-1">
                                    <div
                                        onClick={() => addProductToOrder(item.id)}
                                        className="space-y-4 cursor-pointer"
                                    >
                                        <Image
                                            src={item.image}
                                            className="w-full object-contain rounded-md"
                                            alt={item.name}
                                        />
                                        <h6>{item.name}</h6>
                                        <span className="text-[#ff9d00]">{item.price} VND</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={`${
                            payment_mobile_status ? 'payment-mobile' : ''
                        } hidden md:block md:col-span-5 lg:col-span-4 bg-white rounded-lg p-4`}
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="space-y-4">
                                <h6 className="text-2xl font-normal relative">
                                    Thanh toán
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
                                {productsOrder.length !== 0 ? (
                                    <div className="space-y-4">
                                        {productsOrder.map((item, index) => (
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
                                        {productsOrder.length !== 0 ? (
                                            productsOrder
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
                                {productsOrder.length !== 0 ? (
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

                                        <button
                                            onClick={() => {
                                                onPaymentOpen();
                                            }}
                                            className="p-2 rounded-lg bg-blue-600 text-white text-base"
                                        >
                                            Thanh toán
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Modal
                size={`${payment_mobile_status ? 'full' : 'lg'}`}
                isOpen={isPaymentOpen}
                onClose={onPaymentClose}
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <form
                    onSubmit={handleSubmit((data) => {
                        if (orderType === 0) {
                            const result = dispatch(
                                createOrderAsync({
                                    user_id: 1,
                                    client: 'Nhi',
                                    total: tempTotal! - discountValue! + surchargeValue! + taxValue!,
                                    ...data,
                                }),
                            );
                            result
                                .then((res) => {
                                    const id = res.payload.id;
                                    if (res.payload.success) {
                                        productsOrder.forEach((product: ProductProps, index: number) => {
                                            dispatch(
                                                createOrderDetailAsync({
                                                    order_id: id,
                                                    product_id: product.id,
                                                    quantity: product.quantity,
                                                    total: product.price,
                                                }),
                                            );
                                            if (index === productsOrder.length - 1) {
                                                dispatch(empty());
                                                toast({
                                                    title: 'success',
                                                    description: 'Thanh toán đơn hàng thành công',
                                                    status: 'success',
                                                    position: 'top-right',
                                                    duration: 3000,
                                                    isClosable: true,
                                                });
                                                onPaymentClose();
                                            }
                                        });
                                    }
                                })
                                .catch((err) => console.log(err));
                        } else {
                            alert('Luu tam vao DB');
                        }
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
        </div>
    );
}

export default Order;
