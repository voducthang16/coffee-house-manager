import { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, PlusIcon } from '~/components/Icons';
import BreadCrumb from '~/layouts/Breadcrumb/Breadcrumb';
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
    forwardRef,
} from '@chakra-ui/react';
import vi from 'date-fns/locale/vi';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Config from '~/config';
interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
    onClick(): void;
}

function Coupon() {
    const currentDate = new Date();
    const previousDate = new Date(new Date().getTime());
    previousDate.setDate(new Date().getDate() - 1);
    const [start_date, set_start_date] = useState(previousDate);
    const [end_date, set_end_date] = useState(currentDate);
    const DatePickerCustom = ({ onClick }: Props) => {
        registerLocale('vi', vi);
        const [startDate, setStartDate] = useState(previousDate);
        const [endDate, setEndDate] = useState(currentDate);
        const onChange = (dates: any) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
            if (start && end) {
                set_start_date(start);
                set_end_date(end);
            }
        };
        const ExampleCustomInput = forwardRef(
            (
                {
                    value,
                    onClick,
                }: { value: string; onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void },
                ref: React.Ref<HTMLButtonElement>,
            ) => (
                <div className="flex items-center">
                    <button
                        type="button"
                        className="h-10 min-w-[210px] w-full px-4 py-2 bg-white rounded-l-lg shadow-wrapper outline-none"
                        ref={ref}
                        onClick={onClick}
                    >
                        {value}
                    </button>
                    <div className="h-10 w-10 flex items-center justify-center bg-[#405189] rounded-r-lg">
                        <CalendarIcon className="fill-white" width={20} height={20} />
                    </div>
                </div>
            ),
        );
        return (
            <DatePicker
                locale="vi"
                dateFormat={'dd/MM/yyyy'}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                customInput={<ExampleCustomInput value="" onClick={onClick} />}
                selectsRange
            />
        );
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const convertDate = (create_at: any) => {
        let date = new Date(create_at);
        let year = date.getFullYear();
        let month: any = date.getMonth() + 1;
        let dt: any = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return `${dt}/${month}/${year}`;
    };
    const handleRandomCode = () => {
        const length = 6;
        let result = 'nohii_';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setValue('code', result);
    };
    const toast = useToast();
    const { register, handleSubmit, watch, reset, formState, setValue } = useForm({
        defaultValues: {
            code: '',
            discount_value: '',
            min_order: '',
            discount_max: '',
            start_date: '',
            end_date: '',
            quantity: '',
            status: 1,
        },
    });
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({}, { keepDefaultValues: true });
        }
    }, [formState, reset]);
    return (
        <Fragment>
            <Helmet>
                <title>Mã Giảm Giá</title>
            </Helmet>
            <BreadCrumb page="Mã Giảm Giá" />
            <div className="p-6 lg:space-y-6">
                <div className="p-4 bg-white rounded-lg shadow-box">
                    <button
                        onClick={onOpen}
                        className="flex items-center space-x-2 px-3 py-2 
                            rounded-md text-white bg-[#0ab39c] hover:bg-[#099885] transition-all"
                    >
                        <PlusIcon width={10} height={10} className="fill-white" />
                        <span>Thêm mã giảm giá</span>
                    </button>
                    <div className="mt-3 min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                                <thead className="border-b bg-[#f5f7fa]">
                                    <tr className="text-left">
                                        <th scope="col" className="w-[5%] text-sm font-medium text-gray-900 px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="w-[30%] text-sm font-medium text-gray-900 px-6 py-3">
                                            Sản phẩm
                                        </th>
                                        <th scope="col" className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3">
                                            Số lượng
                                        </th>
                                        <th scope="col" className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3">
                                            Giá
                                        </th>
                                        <th scope="col" className="w-[10%] text-sm font-medium text-gray-900 px-6 py-3">
                                            Đặt mua
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {products?.length > 0 ? (
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
                                                                        src={`${url}uploads/${item?.image}`}
                                                                        alt={item?.name}
                                                                        className="w-16 h-16"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <h6>{item?.name}</h6>
                                                                    <h6>Danh mục: {item?.category_name}</h6>
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
                                            <div>Chưa có sản phẩm</div>
                                        )} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form
                        onSubmit={handleSubmit((data) => {
                            const dataSend = {
                                ...data,
                                discount_value: +data.discount_value,
                                min_order: +data.min_order,
                                discount_max: +data.discount_max,
                                quantity: +data.quantity,
                                start_date: String(start_date),
                                end_date: String(end_date),
                                status: +data.status,
                            };
                            axios
                                .post(Config.apiUrl + 'coupon', dataSend)
                                .then((res: any) => {
                                    if (res.data.success) {
                                        toast({
                                            title: 'success',
                                            description: 'Thêm mã giảm giá thành công',
                                            status: 'success',
                                            position: 'top-right',
                                            duration: 3000,
                                            isClosable: true,
                                        });
                                        onClose();
                                    }
                                })
                                .catch((err) => console.log(err));
                        })}
                    >
                        <ModalHeader>Thêm Mã Giảm Giá</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody className="space-y-4">
                            <div className="flex space-x-2">
                                <input
                                    {...register('code')}
                                    className="input-form"
                                    type="text"
                                    name="code"
                                    id="code"
                                    placeholder="Mã Giảm Giá"
                                />
                                <button
                                    type="button"
                                    onClick={handleRandomCode}
                                    className="p-2 rounded-lg border border-info_rgba bg-info text-white"
                                >
                                    Random
                                </button>
                            </div>
                            <div>
                                <input
                                    {...register('discount_value')}
                                    className="input-form"
                                    type="number"
                                    name="discount_value"
                                    id="discount_value"
                                    placeholder="% Giảm"
                                />
                            </div>
                            <div>
                                <input
                                    {...register('min_order')}
                                    className="input-form"
                                    type="number"
                                    name="min_order"
                                    id="min_order"
                                    placeholder="Đơn Hàng Tối Thiểu"
                                />
                            </div>
                            <div>
                                <input
                                    {...register('discount_max')}
                                    className="input-form"
                                    type="number"
                                    name="discount_max"
                                    id="discount_max"
                                    placeholder="Số Tiền Giảm Tối Đa"
                                />
                            </div>
                            <div>
                                <h6 className="mb-4">Thời gian</h6>
                                <div>
                                    <DatePickerCustom onClick={() => {}} />
                                </div>
                            </div>
                            <div>
                                <input
                                    {...register('quantity')}
                                    className="input-form"
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    placeholder="Số lượng"
                                />
                            </div>
                            <div>
                                <h6 className="mb-4">Trạng Thái</h6>
                                <div className="flex space-x-4">
                                    <div className="flex">
                                        <label htmlFor="active" className="inline-block mr-1">
                                            Active
                                        </label>
                                        <input
                                            {...register('status')}
                                            className="block"
                                            value={1}
                                            type="radio"
                                            name="status"
                                            id="active"
                                        />
                                    </div>
                                    <div className="flex">
                                        <label htmlFor="inactive" className="inline-block mr-1">
                                            Inactive
                                        </label>
                                        <input
                                            {...register('status')}
                                            className="block"
                                            value={0}
                                            type="radio"
                                            name="status"
                                            id="inactive"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Đóng
                            </Button>
                            <Button type="submit" colorScheme="blue">
                                Thêm
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}

export default Coupon;
