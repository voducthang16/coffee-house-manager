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
    useToast,
} from '@chakra-ui/react';
import { getCategory, fetchCategoryAsync } from '~/features/category/categorySlice';
import { getProducts, fetchProductAsync, fetchProductByCategoryAsync } from '~/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '~/components/Image';
import BreadCrumb from '~/layouts/Breadcrumb/Breadcrumb';
import Config from '~/config';
function Product() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const category = useAppSelector(getCategory);
    const [image, setImage] = useState('');
    const [selectValue, setSelectValue] = useState(1);
    const toast = useToast();
    useEffect(() => {
        dispatch(fetchProductAsync());
    }, [dispatch]);
    useEffect(() => {
        if (category.length === 0) {
            dispatch(fetchCategoryAsync());
        }
    }, [dispatch, category.length]);

    const onAddSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        axios
            .post(Config.apiUrl + 'api/image', formData)
            .then((res) => {
                if (res.data.code === 200) {
                    const name = document.querySelector('#name') as HTMLInputElement;
                    const price = document.querySelector('#price') as HTMLInputElement;
                    const description = document.querySelector('#description') as HTMLTextAreaElement;
                    const status = document.querySelector('input[name="status"]:checked') as HTMLInputElement;
                    const data = {
                        name: name?.value,
                        category_id: +selectValue,
                        price: +price?.value,
                        description: description?.value,
                        image: res.data.img,
                        status: +status?.value,
                    };
                    axios
                        .post(Config.apiUrl + 'products', data)
                        .then((res) => {
                            if (res.data) {
                                toast({
                                    title: 'success',
                                    description: 'T???o s???n ph???m th??nh c??ng',
                                    status: 'success',
                                    position: 'top-right',
                                    duration: 3000,
                                    isClosable: true,
                                });
                                onClose();
                                dispatch(fetchProductAsync());
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    };
    const [tab, setTab] = useState(0);
    return (
        <Fragment>
            <Helmet>
                <title>S???n ph???m</title>
            </Helmet>
            <BreadCrumb page="S???n ph???m" />
            <div className="p-6 lg:space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3 p-4 bg-white rounded-lg shadow-box">
                        <h6 className="text-lg font-medium text-gray-600">Danh m???c</h6>
                        <div>
                            <h6
                                onClick={() => {
                                    setTab(0);
                                    dispatch(fetchProductAsync());
                                }}
                                className={`${
                                    tab === 0 && 'font-semibold'
                                } cursor-pointer text-gray-500 py-2 hover:opacity-90`}
                            >
                                T???t c???
                            </h6>
                            {category?.length > 0 && (
                                <Fragment>
                                    {category?.map((item: any, index: number) => (
                                        <h6
                                            onClick={() => {
                                                setTab(index + 1);
                                                dispatch(fetchProductByCategoryAsync(index + 1));
                                            }}
                                            className={`${
                                                tab === index + 1 && 'font-semibold'
                                            } cursor-pointer text-gray-500 py-2 hover:opacity-90`}
                                        >
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
                            <span>Th??m s???n ph???m</span>
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
                                                S???n ph???m
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                S??? l?????ng
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                Gi??
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3"
                                            >
                                                ?????t mua
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.length > 0 ? (
                                            <Fragment>
                                                {products?.map((item: any, index: number) => (
                                                    <tr key={index} className="text-left bg-white border-b">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2">
                                                                    <Image
                                                                        src={`${Config.apiUrl}uploads/${item?.image}`}
                                                                        alt={item?.name}
                                                                        className="w-16 h-16"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <h6>{item?.name}</h6>
                                                                    <h6>Danh m???c: {item?.category_name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {item?.quantity}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {item?.price}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {item?.sold}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        ) : (
                                            <div>Ch??a c?? s???n ph???m</div>
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
                    <form onSubmit={onAddSubmit}>
                        <ModalHeader>Th??m S???n Ph???m</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody className="space-y-4">
                            <div>
                                <input
                                    className="input-form"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="T??n S???n Ph???m"
                                />
                            </div>
                            <div>
                                <select
                                    value={selectValue}
                                    onChange={(e: any) => setSelectValue(e.target.value)}
                                    className="w-full outline-none bg-slate-100 py-3 px-4 rounded-lg"
                                >
                                    {category?.map((item: any, index) => (
                                        <option key={index} value={index + 1}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    className="input-form"
                                    type="text"
                                    name="price"
                                    id="price"
                                    placeholder="Gi?? S???n Ph???m"
                                />
                            </div>
                            <div>
                                <textarea
                                    className="input-form"
                                    name="description"
                                    id="description"
                                    placeholder="M?? T??? S???n Ph???m"
                                    cols={5}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="image" className="inline-block mb-4">
                                    ???nh S???n Ph???m
                                </label>
                                <input
                                    onChange={(e: any) => setImage(e.target.files[0])}
                                    className="block"
                                    type="file"
                                    name="image"
                                    id="image"
                                />
                            </div>
                            <div>
                                <h6 className="mb-4">Tr???ng Th??i S???n Ph???m</h6>
                                <div className="flex space-x-4">
                                    <div className="flex">
                                        <label htmlFor="active" className="inline-block mr-1">
                                            Active
                                        </label>
                                        <input className="block" value={1} type="radio" name="status" id="active" />
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="inactive" className="inline-block mr-1">
                                            Inactive
                                        </label>
                                        <input className="block" value={0} type="radio" name="status" id="inactive" />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                ????ng
                            </Button>
                            <Button type="submit" colorScheme="blue">
                                Th??m
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}

export default Product;
