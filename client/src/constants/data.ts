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
        title: 'شركات الاتصالات',
        icon: '/items-pictures/telecom.png',
    },
    {
        title: 'شركات الكهرباء',
        icon: '/items-pictures/electronic.png',
    },
    {
        title: 'شركات المياه',
        icon: '/items-pictures/water.png',
    },
    {
        title: 'خدمات تعليمية',
        icon: '/items-pictures/school.png',
    },
    {
        title: 'شركات دعاية واعلان',
        icon: '/items-pictures/socail.png',
    },
    {
        title: 'مؤسسات قروض مغيرة',
        icon: '/items-pictures/organizations.png',
    },
    {
        title: 'جامعات',
        icon: '/items-pictures/graduation.png',
    },
    {
        title: 'مدفوعات حكومية',
        icon: '/items-pictures/bank.png',
    },
    {
        title: 'البلديات',
        icon: '/items-pictures/urban.png',
    },
    {
        title: 'مواقع التسوق الإلكتروني',
        icon: '/items-pictures/e-commerce-site 1.png',
    },
    {
        title: 'تبرعات المؤسسات الخيرية',
        icon: '/items-pictures/donation.png',
    },
    {
        title: 'غرف التجارة والصناعة',
        icon: '/items-pictures/gas.png',
    },
    {
        title: 'اشتراك قنوات فضائية',
        icon: '/items-pictures/channel.png',
    },
    {
        title: 'نظام فواتير وسيط',
        icon: '/items-pictures/third-party.png',
    },
    {
        title: 'شركات التوصيل',
        icon: '/items-pictures/delivery.png',
    },
    {
        title: 'اشتراكات نقلات',
        icon: '/items-pictures/calender.png',
    },
    {
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