import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PlusIcon, RightArrowIcon } from '~/components/Icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import { getCategory, fetchCategoryAsync } from '~/features/category/categorySlice';
import { getProducts, fetchProductAsync } from '~/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useEffect } from 'react';
import Image from '~/components/Image';
function Product() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const category = useAppSelector(getCategory);
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductAsync());
        }
    }, [dispatch]);
    useEffect(() => {
        if (category.length === 0) {
            dispatch(fetchCategoryAsync());
        }
    }, [dispatch]);
    return (
        <Fragment>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>
            <div className="bg-white px-6 py-2 flex justify-between shadow-box">
                <h6 className="font-semibold">Sản phẩm</h6>
                <p className="flex items-center space-x-2 text-sm">
                    <Link to={'/dashboard'}>Quản trị</Link>
                    <RightArrowIcon width={12} height={12} />
                    <Link to={'/product'}>Sản phẩm</Link>
                </p>
            </div>
            <div className="p-6 lg:space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3 p-4 bg-white rounded-lg shadow-box">
                        <h6 className="text-lg font-medium text-gray-600">Danh mục</h6>
                        <div>
                            {category?.length > 0 && (
                                <Fragment>
                                    {category?.map((item: any, index: number) => (
                                        <h6 className="cursor-pointer text-gray-500 py-2 hover:opacity-90">
                                            {item.name}
                                        </h6>
                                    ))}
                                </Fragment>
                            )}
                        </div>
                    </div>
                    <div className="col-span-9 p-4 bg-white rounded-lg shadow-box">
                        <button
                            onClick={onOpen}
                            className="flex items-center space-x-2 px-3 py-2 
                            rounded-md text-white bg-[#0ab39c] hover:bg-[#099885] transition-all"
                        >
                            <PlusIcon width={10} height={10} className="fill-white" />
                            <span>Thêm sản phẩm</span>
                        </button>
                        <div className="mt-3 min-w-full">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-[#f5f7fa]">
                                        <tr className="text-left">
                                            <th
                                                scope="col"
                                                className="w-[5%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[30%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                Sản phẩm
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                Số lượng
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                Giá
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                Đặt mua
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.length > 0 ? (
                                            <Fragment>
                                                {products?.map((item: any, index: number) => (
                                                    <tr className="text-left bg-white border-b">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2">
                                                                    <Image
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-16 h-16"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h6>{item?.name}</h6>
                                                                    <h6>category: name</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            50
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            59.000
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            60
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        ) : (
                                            <div>Chưa có sản phẩm</div>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form action="">
                        <ModalHeader>Thêm Sản Phẩm</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody className="space-y-4">
                            <div>
                                <input
                                    className="input-form"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Tên Sản Phẩm"
                                />
                            </div>
                            <div>
                                <textarea
                                    className="input-form"
                                    name="description"
                                    id="description"
                                    placeholder="Mô Tả Sản Phẩm"
                                    cols={5}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="image" className="inline-block mb-4">
                                    Ảnh Sản Phẩm
                                </label>
                                <input className="block" type="file" name="image" id="image" />
                            </div>
                            <div>
                                <h6 className="mb-4">Trạng Thái Sản Phẩm</h6>
                                <div className="flex space-x-4">
                                    <div className="flex">
                                        <label htmlFor="active" className="inline-block mr-1">
                                            Active
                                        </label>
                                        <input className="block" type="radio" name="status" id="active" />
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="inactive" className="inline-block mr-1">
                                            Inactive
                                        </label>
                                        <input className="block" type="radio" name="status" id="inactive" />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Đóng
                            </Button>
                            <Button colorScheme="blue">Thêm</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}

export default Product;