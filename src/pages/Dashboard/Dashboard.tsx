import { Helmet } from 'react-helmet-async';
import { forwardRef, Fragment, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';
interface InputProps {
    onChange?: any;
    placeholder?: any;
    value?: any;
    id?: any;
    onClick?: any;
    className?: any;
    ref?: any;
}
function Dashboard() {
    registerLocale('vi', vi);
    const currentDate = new Date();
    const previousDate = new Date(new Date().getTime());
    previousDate.setDate(new Date().getDate() - 1);
    const [startDate, setStartDate] = useState(previousDate);
    const [endDate, setEndDate] = useState(currentDate);
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const ref = useRef<HTMLDivElement>(null);
    const Input = ({ onChange, placeholder, value, id, onClick }: InputProps) => (
        <input onChange={onChange} placeholder={placeholder} value={value} id={id} onClick={onClick} />
    );
    // const ExampleCustomInput = forwardRef(({ value, onClick }: InputProps, ref) => (
    //     <button className="example-custom-input" onClick={onClick} ref={ref}>
    //       {value}
    //     </button>
    //   ));
    return (
        <Fragment>
            <Helmet>
                <title>Báo Cáo</title>
            </Helmet>
            <div className="p-8">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg">Báo Cáo Tổng Quan</h4>
                    <div>
                        <DatePicker
                            locale="vi"
                            dateFormat={'dd/MM/yyyy'}
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            customInput={<Input className={'outline-none'} />}
                            selectsRange
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;
