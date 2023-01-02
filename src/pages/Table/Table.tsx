import { useState, useEffect, Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { fetchTableAsync, getTables } from '~/features/table/tableSlice';
import { setOrderType, setTableId } from '~/features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Table() {
    const [status, setStatus] = useState(1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const tables = useAppSelector(getTables);
    useEffect(() => {
        if (tables.length === 0) {
            dispatch(fetchTableAsync(status));
        }
    }, [dispatch, status]);
    return (
        <Fragment>
            <Helmet>
                <title>Tại Bàn</title>
            </Helmet>
            <div className="container pt-20">
                <div className="text-lg mb-20">
                    <ul className="flex space-x-4">
                        <li
                            onClick={() => {
                                setStatus(1);
                                dispatch(fetchTableAsync(1));
                            }}
                            className={`floor ${status === 1 ? 'active' : null}`}
                        >
                            Tầng 1
                        </li>
                        <li
                            onClick={() => {
                                setStatus(2);
                                dispatch(fetchTableAsync(2));
                            }}
                            className={`floor ${status === 2 ? 'active' : null}`}
                        >
                            Tầng 2
                        </li>
                        <li
                            onClick={() => {
                                setStatus(3);
                                dispatch(fetchTableAsync(3));
                            }}
                            className={`floor ${status === 3 ? 'active' : null}`}
                        >
                            Tầng 3
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {tables.map((item, index) => (
                        <div key={index} className="col-span-1">
                            <div
                                onClick={() => {
                                    navigate('/order');
                                    dispatch(setTableId(item.id));
                                    dispatch(setOrderType(1));
                                }}
                                className={`border bg-white ${
                                    item.status === 0 ? 'border-slate-300' : 'border-[#28a745]'
                                } rounded-lg overflow-hidden cursor-pointer`}
                            >
                                <div
                                    className={`${item.status === 0 ? 'bg-[#6c757d]' : 'bg-[#28a745]'} text-white p-2`}
                                >
                                    <h5>{item.status === 0 ? 'Bàn Trống' : 'Đang Phục Vụ'}</h5>
                                </div>
                                <div className="flex items-center justify-center py-10">Bàn {item.id}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default Table;
