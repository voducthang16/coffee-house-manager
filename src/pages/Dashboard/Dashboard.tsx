import { Helmet } from 'react-helmet-async';
import { Fragment, useState, createElement, forwardRef } from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.scss';
import { CalendarIcon, CircleIcon, DollarIcon, PlusIcon, UpRightArrowIcon } from '~/components/Icons';
import { addDays } from 'date-fns';
import CountUp from 'react-countup';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
    onClick(): void;
}

const DatePickerCustom = ({ onClick }: Props) => {
    registerLocale('vi', vi);
    const currentDate = new Date();
    const previousDate = new Date(new Date().getTime());
    previousDate.setDate(new Date().getDate() - 1);
    const [startDate, setStartDate] = useState(previousDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [maxDate, setMaxDate] = useState(currentDate);
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start) {
            setMaxDate(currentDate);
        }
        if (start && end) {
            console.log(start, end);
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
                    className="h-10 min-w-[210px] px-4 py-2 bg-white rounded-l-lg shadow-box outline-none"
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
            maxDate={addDays(maxDate, 0)}
            customInput={<ExampleCustomInput value="" onClick={onClick} />}
            selectsRange
        />
    );
};

function Dashboard() {
    const data = [
        {
            name: 'T1',
            orders: 300,
            earnings: 1400,
        },
        {
            name: 'T2',
            orders: 350,
            earnings: 1506,
        },
        {
            name: 'T3',
            orders: 450,
            earnings: 989,
        },
        {
            name: 'T4',
            orders: 330,
            earnings: 1228,
        },
        {
            name: 'T5',
            orders: 290,
            earnings: 1100,
        },
        {
            name: 'T6',
            orders: 420,
            earnings: 1700,
        },
        {
            name: 'T7',
            orders: 400,
            earnings: 1700,
        },
        {
            name: 'T8',
            orders: 380,
            earnings: 1700,
        },
        {
            name: 'T9',
            orders: 350,
            earnings: 1700,
        },
        {
            name: 'T10',
            orders: 270,
            earnings: 1700,
        },
        {
            name: 'T11',
            orders: 460,
            earnings: 1700,
        },
        {
            name: 'T12',
            orders: 500,
            earnings: 1700,
        },
    ];

    const CustomTooltip = ({ payload, label, active }: any) => {
        if (active) {
            return (
                <div className="bg-white">
                    <h6 className="py-2 px-3 bg-[#F6F8FB] border-b border-[#cccccc]">{label}</h6>
                    <div className="py-2 px-3 text-sm">
                        <p className="flex items-center space-x-2">
                            <CircleIcon width={14} height={14} className="fill-[#405189]" />
                            <span>Đơn hàng:</span>
                            <span className="font-medium">{payload[0].value}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <CircleIcon width={14} height={14} className="fill-[#0ab39c]" />
                            <span>Thu nhập:</span>
                            <span className="font-medium">{payload[1].value}</span>
                        </p>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <Fragment>
            <Helmet>
                <title>Báo Cáo Tổng Quan</title>
            </Helmet>
            <div className="p-6 lg:space-y-6">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium">Báo Cáo Tổng Quan</h4>
                    <div>
                        <DatePickerCustom onClick={() => {}} />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-8">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="col-span-3">
                            <div
                                className="p-4 bg-white shadow-box rounded-lg 
                                translate-y-0 hover:-translate-y-1 shadow-hover transition-all duration-300"
                            >
                                <div className="flex justify-between">
                                    <h6>Total Earnings</h6>
                                    <div className="flex items-center">
                                        <UpRightArrowIcon className="mr-2 fill-success" width={10} height={10} />
                                        <PlusIcon className="mr-0.5 fill-success" width={10} height={10} />
                                        <h6 className="text-success">16.24%</h6>
                                    </div>
                                </div>
                                <h3 className="py-4 text-2xl font-semibold text-dark">
                                    <CountUp end={123457} />
                                </h3>
                                <div className="flex justify-between items-center">
                                    <p className="underline font-light text-sm text-link">View net earnings</p>
                                    <div className="bg-success_rgba p-3 rounded-md">
                                        <DollarIcon className="fill-success" width={18} height={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-4 space-y-4 bg-white shadow-box rounded-lg">
                    <div className="px-4 flex justify-between items-center">
                        <h4 className="text-lg font-medium">Doanh thu</h4>
                        <div className="space-x-2 text-sm">
                            {/* bg-info_rgba */}
                            <button
                                className="p-[6px] bg-button_bg hover:bg-info hover:text-white transition-all
                                rounded-md outline-none cursor-pointer "
                            >
                                ALL
                            </button>
                            <button
                                className="p-[6px] bg-info_rgba hover:bg-info hover:text-white transition-all
                                rounded-md outline-none cursor-pointer"
                            >
                                1M
                            </button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(243,246,249, 0.18' }} className="flex">
                        <div className="flex-1 px-2 py-3 text-center border border-x-0 border-dashed">
                            <h6 className="font-medium">10000</h6>
                            <h6>Orders</h6>
                        </div>
                        <div className="flex-1 px-2 py-3 text-center border border-r-0 border-dashed">
                            <h6 className="font-medium">10000</h6>
                            <h6>Orders</h6>
                        </div>
                    </div>
                    <div className="bg-[#8884d8]"></div>
                    <div className="px-4 h-[300px]">
                        <ResponsiveContainer width="100%">
                            <ComposedChart data={data}>
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: '', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    wrapperStyle={{
                                        border: '1px solid #cccccc',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        overflow: 'hidden',
                                    }}
                                    content={<CustomTooltip />}
                                />
                                <Legend
                                    payload={[
                                        { id: 'orders', value: 'Đơn hàng', type: 'circle', color: 'rgb(64, 81, 137)' },
                                        {
                                            id: 'earnings',
                                            value: 'Thu nhập',
                                            type: 'circle',
                                            color: 'rgba(10, 179, 156, 0.9)',
                                        },
                                    ]}
                                />
                                <Area type="monotone" dataKey="orders" fill="#ecedf3" stroke="rgb(64, 81, 137)" />
                                <Bar dataKey="earnings" barSize={20} fill="rgba(10, 179, 156, 0.9)" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;
