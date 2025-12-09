import prisma from "../config/PrismClinet.js";
export const bills = [{
    billOwnerInfo: {
        name: 'محمد رزق ابو علي',
        phone: '0591245567',
        address: 'رام الله، شارع القدس'
    },
    billInfo: {
        company: 'مركبتي',
        service: 'اغسلني',
        billNumber: '202406987654',
        date: '2025-06-01',
    },
    moneyInfo: {
        money: 145.75,
        currency: 'شيكل'
    },
    note: "لا يوجد ملاحظات",
    icon: '/pictures/company.png',
}];
const categories = [
    { id: 1, title: 'شركات الاتصالات', icon: '/items-pictures/telecom.png' },
    { id: 2, title: 'شركات الكهرباء', icon: '/items-pictures/electronic.png' },
    { id: 3, title: 'شركات المياه', icon: '/items-pictures/water.png' },
    { id: 4, title: 'خدمات تعليمية', icon: '/items-pictures/school.png' },
    { id: 5, title: 'شركات دعاية واعلان', icon: '/items-pictures/socail.png' },
    { id: 6, title: 'مؤسسات قروض مغيرة', icon: '/items-pictures/organizations.png' },
    { id: 7, title: 'جامعات', icon: '/items-pictures/graduation.png' },
    { id: 8, title: 'مدفوعات حكومية', icon: '/items-pictures/bank.png' },
    { id: 9, title: 'البلديات', icon: '/items-pictures/urban.png' },
    { id: 10, title: 'مواقع التسوق الإلكتروني', icon: '/items-pictures/e-commerce-site 1.png' },
    { id: 11, title: 'تبرعات المؤسسات الخيرية', icon: '/items-pictures/donation.png' },
    { id: 12, title: 'غرف التجارة والصناعة', icon: '/items-pictures/gas.png' },
    { id: 13, title: 'اشتراك قنوات فضائية', icon: '/items-pictures/channel.png' },
    { id: 14, title: 'نظام فواتير وسيط', icon: '/items-pictures/third-party.png' },
    { id: 15, title: 'شركات التوصيل', icon: '/items-pictures/delivery.png' },
    { id: 16, title: 'اشتراكات نقلات', icon: '/items-pictures/calender.png' },
    { id: 17, title: 'شركات التامين', icon: '/items-pictures/insurance.png' },
];
const baseCompanies = [
    { title: 'الزيتونة للاتصالات', icon: '/companies/1.png' },
    { title: 'فيوجن', icon: '/companies/2.png' },
    { title: 'شركة سبايدر نت-خدمات تسديد الانترنت', icon: '/companies/3.png' },
    { title: 'مدى لخدمات الانترنت', icon: '/companies/4.png' },
];
async function main() {
    console.log('🌱 Seeding database...');
    for (const c of categories) {
        await prisma.category.upsert({
            where: { id: c.id },
            update: {},
            create: {
                id: c.id,
                title: c.title,
                icon: c.icon,
            },
        });
        for (const comp of baseCompanies) {
            await prisma.company.create({
                data: {
                    title: comp.title,
                    icon: comp.icon,
                    categoryId: c.id,
                },
            });
        }
    }
    for (const b of bills) {
        await prisma.bill.create({
            data: {
                name: b.billOwnerInfo.name,
                icon: b.icon,
                phone: b.billOwnerInfo.phone,
                address: b.billOwnerInfo.address,
                company: b.billInfo.company,
                service: b.billInfo.service,
                number: BigInt(b.billInfo.billNumber),
                price: b.moneyInfo.money,
                notes: b.note,
                created_at: new Date(b.billInfo.date),
            },
        });
    }
    console.log('✅ Seeding completed!');
}
main()
    .catch((err) => {
        console.log(err instanceof Error ? err.message : err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });