export const closeEye = '/icons/hide.png';
export const openEye = '/icons/visible.png';
export const warningIcon = '/icons/warning.png';
export const bottomMenuLinks = [
    {
        title: 'Home',
        iconActive: '/menu-icons/blue-home.png',
        icon: '/menu-icons/home.png',
        direction: '/dashboard/home'
    },
    {
        title: 'Scan',
        iconActive: '/menu-icons/blue-scan.svg',
        icon: '/menu-icons/scan.png',
        direction: '/dashboard/scan'
    },
    {
        title: 'AI',
        iconActive: '/menu-icons/blue-bot.png',
        icon: '/menu-icons/bot.png',
        direction: '/dashboard/ai'
    },
];
export const categories = [
    {
        id: 1,
        title: 'شركات الاتصالات',
        icon: '/items-pictures/telecom.png',
    },
    {
        id: 2,
        title: 'شركات الكهرباء',
        icon: '/items-pictures/electronic.png',
    },
    {
        id: 3,
        title: 'شركات المياه',
        icon: '/items-pictures/water.png',
    },
    {
        id: 4,
        title: 'خدمات تعليمية',
        icon: '/items-pictures/school.png',
    },
    {
        id: 5,
        title: 'شركات دعاية واعلان',
        icon: '/items-pictures/socail.png',
    },
    {
        id: 6,
        title: 'مؤسسات قروض مغيرة',
        icon: '/items-pictures/organizations.png',
    },
    {
        id: 7,
        title: 'جامعات',
        icon: '/items-pictures/graduation.png',
    },
    {
        id: 8,
        title: 'مدفوعات حكومية',
        icon: '/items-pictures/bank.png',
    },
    {
        id: 9,
        title: 'البلديات',
        icon: '/items-pictures/urban.png',
    },
    {
        id: 10,
        title: 'مواقع التسوق الإلكتروني',
        icon: '/items-pictures/e-commerce-site 1.png',
    },
    {
        id: 11,
        title: 'تبرعات المؤسسات الخيرية',
        icon: '/items-pictures/donation.png',
    },
    {
        id: 12,
        title: 'غرف التجارة والصناعة',
        icon: '/items-pictures/gas.png',
    },
    {
        id: 13,
        title: 'اشتراك قنوات فضائية',
        icon: '/items-pictures/channel.png',
    },
    {
        id: 14,
        title: 'نظام فواتير وسيط',
        icon: '/items-pictures/third-party.png',
    },
    {
        id: 15,
        title: 'شركات التوصيل',
        icon: '/items-pictures/delivery.png',
    },
    {
        id: 16,
        title: 'اشتراكات نقلات',
        icon: '/items-pictures/calender.png',
    },
    {
        id: 17,
        title: 'شركات التامين',
        icon: '/items-pictures/insurance.png',
    }
];
export const companies = [
    {
        title: 'الزيتونة للاتصالات',
        image: '/companies/1.png',
    },
    {
        title: 'فيوجن',
        image: '/companies/2.png',
    },
    {
        title: 'شركة سبايدر نت-خدمات تسديد الانترنت',
        image: '/companies/3.png',
    },
    {
        title: 'مدى لخدمات الانترنت',
        image: '/companies/4.png',
    },
];
export const messages = [
    {
        role: 'user',
        time: '22:43',
        message: 'أريد تسديد مخالفة.'
    },
    {
        role: 'ai',
        time: '22:43',
        message: 'من فضلك ما اسم صاحب المخالفة؟ واي شركة تريد تسديد الفاتورة اليها؟'
    },
    {
        role: 'user',
        time: '22:55',
        message: 'الاسم محمد رزق ابو عليه. مخالفة رقم 456789. والشركة التي اريد الدفع اليها هي مركبتي.'
    },
    {
        role: 'ai',
        time: '22:57',
        message: 'شكرًا لك، جارٍ التحقق من تفاصيل المخالفة رقم 456789 لدى شركة مركبتي باسم محمد رزق أبو عليه...'
    },
    {
        role: 'ai',
        time: '22:57',
        message: 'تم العثور على المخالفة. المبلغ المستحق هو 320 شيكل.'
    },
    {
        role: 'user',
        time: '22:43',
        message: 'نعم تابع'
    },
    {
        role: 'ai',
        time: '22:43',
        message: 'حسنا سيتم ارسالك الان الى شاشة الدفع لدفع الفاتورة'
    },
];
export const bill = [{
    billOwnerInfo: {
        name: 'محمد رزق ابو علي',
        phone: '0591245567',
        address: 'رام الله، شارع القدس'
    },
    billInfo: {
        company: 'مركبتي',
        service: 'اغسلني',
        billNumber: 'ELEC-202406-987654',
        date: '01 يونيو 2025',
    },
    moneyInfo: {
        money: '145.75',
        currency: 'شيكل'
    },
    note: "لا يوجد ملاحظات"
}];