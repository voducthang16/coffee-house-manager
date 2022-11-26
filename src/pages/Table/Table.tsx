import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { fetchTableAsync, getTables } from '~/features/table/tableSlice';

function Table() {
    const [status, setStatus] = useState(1);
    const dispatch = useAppDispatch();
    const table = useAppSelector(getTables);
    useEffect(() => {
        dispatch(fetchTableAsync(status));
    }, [dispatch, status]);
    return (
        <div>
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
                <div className="grid grid-cols-5 gap-5">
                    {table.map((item, index) => (
                        <div key={index} className="col-span-1">
                            <div
                                className={`border ${
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
        </div>
    );
}

export default Table;