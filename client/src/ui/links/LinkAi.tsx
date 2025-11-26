import { Link } from 'react-router-dom';
const LinkAi = ({
    image,
    direction
}: {
    image: string,
    direction: string
}) => {
    return (
        <Link to={direction} className='w-14 h-14 rounded-xl bg-[#DAE5FC] flex items-center justify-center'>
            <img src={image} alt={direction} />
        </Link>
    )
}
export default LinkAi
