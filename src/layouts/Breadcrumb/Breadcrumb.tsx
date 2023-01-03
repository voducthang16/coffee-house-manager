import { Link } from 'react-router-dom';
import { RightArrowIcon } from '~/components/Icons';

interface BreadCrumbProps {
    page?: string;
}
function BreadCrumb({ page }: BreadCrumbProps) {
    return (
        <div className="bg-white px-6 py-2 flex justify-between shadow-box">
            <h6 className="font-semibold">{page}</h6>
            <p className="flex items-center space-x-2 text-sm">
                <Link to={'/dashboard'}>Quản trị</Link>
                <RightArrowIcon width={12} height={12} />
                <Link to={'/product'}>{page}</Link>
            </p>
        </div>
    );
}

export default BreadCrumb;
