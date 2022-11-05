import images from '~/assets/images';
import Image from '~/components/Image';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { getProducts, fetchProductAsync } from '~/features/product/productSlice';
function Order() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    useEffect(() => {
        dispatch(fetchProductAsync());
    }, []);
    return (
        <div className="bg-[#e8eaf2] py-20">
            <div className="container ">
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
                    <div className="col-span-7 bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4 text-base text-center">
                            {products.map((item, index) => (
                                <div key={index} className="col-span-1">
                                    <div className="space-y-4 cursor-pointer">
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
                    <div className="col-span-3 bg-white rounded-lg p-4">
                        <div>
                            <h6 className="text-lg font-normal">Thanh toán</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
