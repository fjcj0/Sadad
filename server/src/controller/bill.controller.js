import prisma from "../config/PrismClinet.js";
export const getBill = async (request, response) => {
    try {
        const { number } = request.params;
        const bill = await prisma.bill.findUnique({
            where: {
                number: BigInt(number),
            },
            select: {
                icon: true,
                name: true,
                phone: true,
                address: true,
                company: true,
                service: true,
                number: true,
                created_at: true,
                price: true,
                notes: true
            }
        });
        const billSerializable = {
            ...bill,
            number: bill.number.toString()
        };
        return response.status(200).json({
            success: true,
            bill: billSerializable
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
};