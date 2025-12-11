import prisma from "../config/PrismClinet.js";
export const getAllCategories = async (request, response) => {
    try {
        const categories = await prisma.category.findMany(
            {
                select: {
                    title: true,
                    icon: true,
                    id: true
                }
            }
        );
        return response.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const getCompanies = async (request, response) => {
    try {
        const { id } = request.params;
        const companies = await prisma.company.findMany({
            where: {
                categoryId: Number(id)
            },
            select: {
                id: true,
                title: true,
                icon: true
            }
        });
        return response.status(200).json({
            success: true,
            companies
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const getInvoices = async () => {
    try {
        const invoices = await prisma.bill.findMany({
            select: {
                name: true,
                number: true,
                link: true,
                company: true
            }
        });
        return invoices;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : error);
    }
}