import Lottie from 'lottie-react';
const Animation = ({
    animation,
    width,
    height
}: {
    animation: Object,
    width: number,
    height: number
}) => {
    return (
        <div className="w-full flex items-center justify-center">
            <Lottie animationData={animation} width={width} height={height} />
        </div>
    )
}
export default Animation;