import Image from '~/components/Image';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { getProducts, fetchProductAsync } from '~/features/product/productSlice';
import { getProductsOrder, OrderProps, insert, update, insertProductAsync } from '~/features/order/orderSlice';
import { DeleteIcon, ToDoListIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
function Order() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const productsOrder = useAppSelector(getProductsOrder);
    useEffect(() => {
        dispatch(fetchProductAsync());
    }, [dispatch]);
    const addProductToOrder = (productId: string) => {
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
            dispatch(insert(product));
        }
    };
    const insertProductToOrder = (productId: string) => {
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
            // dispatch(insert(product));
            dispatch(
                insertProductAsync({
                    cashier: 'Vo Duc Thang',
                    productId: productId,
                    quantity: 1,
                }),
            );
        }
    };
    return (
        <div className="bg-[#e8eaf2]">
            <div className="container h-screen flex items-center">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2">
                        <div>
                            <ul className="text-lg font-normal text-center space-y-4">
                                <li
                                    className="bg-[#ff9d00] text-white py-2 rounded-lg 
                                    cursor-pointer hover:opacity-80 transition-all"
                                >
                                    Cà phê
                                </li>
                                <li
                                    className="bg-white py-2 rounded-lg 
                                    cursor-pointer hover:opacity-80 transition-all"
                                >
                                    Trà
                                </li>
                                <li
                                    className="bg-white py-2 rounded-lg 
                                    cursor-pointer hover:opacity-80 transition-all"
                                >
                                    Bánh & Snack
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-6 bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-base text-center">
                            {products?.map((item, index) => (
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
                    <div className="col-span-4 bg-white rounded-lg p-4">
                        <div className="flex flex-col justify-between h-full">
                            <div className="space-y-4">
                                <h6 className="text-2xl font-normal">Thanh toán</h6>
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
                                                <span className="ml-2">
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
                                        {productsOrder.length !== 0
                                            ? productsOrder
                                                  .reduce((a, b) => a + b.price, 0)
                                                  .toLocaleString('it-IT', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  })
                                            : null}
                                    </span>
                                </div>
                                <div className="flex justify-end">
                                    <Link to={'/payment'} className="p-2 rounded-lg bg-blue-600 text-white text-base">
                                        Thanh toán
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
