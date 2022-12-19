import { Helmet } from 'react-helmet-async';
import { Fragment, useState, createElement, forwardRef } from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.scss';
import { CalendarIcon, DollarIcon, PlusIcon, UpRightArrowIcon } from '~/components/Icons';
import { addDays } from 'date-fns';
import CountUp from 'react-countup';
// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//     ref?: React.Ref<HTMLInputElement>;
//   }
// export const Input = forwardRef((props: InputProps, ref: React.Ref<HtmlInputElement>) => {
//     return (
//       <>
//         <StyledInput {...props} ref={ref}/>
//       </>
//     )
//   });
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
    // registerLocale('vi', vi);
    // const currentDate = new Date();
    // const previousDate = new Date(new Date().getTime());
    // previousDate.setDate(new Date().getDate() - 1);
    // const [startDate, setStartDate] = useState(previousDate);
    // const [endDate, setEndDate] = useState(currentDate);
    // const onChangeF = (dates: any) => {
    //     const [start, end] = dates;
    //     setStartDate(start);
    //     setEndDate(end);
    //     console.log([start, end]);
    // };
    // const ExampleCustomInput = forwardRef(
    //     (
    //         {
    //             value,
    //             onClick,
    //         }: { value: string; onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void },
    //         ref: React.Ref<HTMLButtonElement>,
    //     ) => (
    //         <button className="example-custom-input" onClick={onClick} ref={ref}>
    //             {value}
    //         </button>
    //     ),
    // );
    // const CustomInput = ({
    //     value,
    //     onClick,
    // }: {
    //     value: string;
    //     onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    // }) => (
    //     <div className="flex items-center">
    //         <button className="h-10 px-4 py-2 bg-white rounded-l-lg shadow-box outline-none" onClick={onClick}>
    //             {value}
    //         </button>
    //         <div className="h-10 w-10 flex items-center justify-center bg-[#405189] rounded-r-lg">
    //             <CalendarIcon className="fill-white" width={20} height={20} />
    //         </div>
    //     </div>
    // );
    return (
        <Fragment>
            <Helmet>
                <title>Báo Cáo Tổng Quan</title>
            </Helmet>
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg">Báo Cáo Tổng Quan</h4>
                    <div>
                        <DatePickerCustom onClick={() => {}} />
                        {/* <DatePicker
                            locale="vi"
                            dateFormat={'dd/MM/yyyy'}
                            selected={startDate}
                            onChange={onChangeF}
                            startDate={startDate}
                            // endDate={endDate}
                            // customInput={createElement(CustomInput)}
                            // customInput={<ExampleCustomInput value="" onClick={onClick} />}
                            selectsRange
                        /> */}
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-12 gap-8">
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
            </div>
        </Fragment>
    );
}

export default Dashboard;
