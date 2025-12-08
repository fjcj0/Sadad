import Animation from "../utils/Animation";
import animationError from '../animation/Error404.json';
const Error404 = () => {
    return (
        <div className='w-screen min-h-[100vh] flex items-center justify-center'>
            <Animation animation={animationError} width={400} height={400} />
        </div>
    );
}
export default Error404;