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
    getTableId,
    getOrderType,
    insert_temp,
    getProductsTemp,
} from '~/features/order/orderSlice';
import { SearchIcon } from '~/components/Icons';
import './Order.scss';
import { fetchTableAvailableAsync } from '~/features/table/tableSlice';
import Payment from '~/layouts/components/Payment';

function Order() {
    const dispatch = useAppDispatch();
    // all products
    const products = useAppSelector(getProducts);
    // all category
    const category = useAppSelector(getCategory);

    // list product order at table
    const productsTemp = useAppSelector(getProductsTemp);

    // id table for order | order at table
    const tableId = useAppSelector(getTableId);

    // list product order at cashier
    const productsOrder = useAppSelector(getProductsOrder);

    // 0 - cashier | 1 - table
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
                    <Payment listProducts={orderType === 0 ? productsOrder : productsTemp} />
                </div>
            </div>
        </div>
    );
}

export default Order;
