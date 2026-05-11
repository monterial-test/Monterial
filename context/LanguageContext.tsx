"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        header_home: "Home",
        header_about: "About us",
        header_services: "Our services",
        header_projects: "Our Projects",
        header_contact: "Contact us",
        header_lang: "English",
        verify_title: "Security Gateway",
        verify_desc: "Please confirm that you are a human visitor to access the Monterial Construction portal.",
        verify_btn: "Verify Identity",
        global_encrypted: "Global Encrypted Access",
        rights_reserved: "All rights reserved to",
        company_name: "Monterial Construction",
        hero_subtitle: "BUILDING THE",
        hero_span: "FUTURE",
        hero_slogan: "We Preserve Our History And Build Our Future",
        hero_infrastructure: "OF INFRASTRUCTURE",
        hero_desc: "We provide world-class engineering solutions and high-quality building materials for iconic urban developments and industrial projects.",
        hero_btn_projects: "Explore Projects",
        hero_btn_services: "Our Services",
        stats_projects: "Projects Completed",
        stats_workers: "Expert Workers",
        stats_awards: "Awards Won",
        stats_years: "Years Experience",
        services_subtitle: "Our Services",
        services_title: "High-Performance Services",
        service1_title: "Building & Construction - Integrated Works",
        service2_title: "Bridge & Tunnel Construction",
        service3_title: "Railway & Metro Station Maintenance",
        service4_title: "Steel Construction Works",
        service5_title: "Specialized Construction Services",
        service6_title: "Infrastructure Works",
        service7_title: "Restoration of Historical Sites & Museums",
        service8_title: "Agriculture & Green Space Maintenance",
        service9_title: "Landscaping & Afforestation",
        service10_title: "Management & Operation of Public Facilities",
        projects_title_prefix: "Our",
        projects_title_span: "Milestones",
        projects_desc: "Explore our portfolio of high-impact construction projects that define modern landscapes.",
        about_hero_title: "Our Legacy",
        about_hero_desc: "Building the future of infrastructure with precision, innovation, and an unwavering commitment to quality since 1995.",
        about_excellence_title: "Engineering Excellence",
        about_excellence_desc: "At Monterial Constructions, we don't just build structures; we create landmarks that define cityscapes. Our approach combines traditional craftsmanship with cutting-edge sustainable technology to deliver projects that stand the test of time.",
        mission_title: "Our Mission",
        mission_desc: "To deliver superior construction services by emphasizing safety, quality, and environmental responsibility.",
        vision_title: "Our Vision",
        vision_desc: "To be the most trusted name in global infrastructure development through innovation.",
        values_title: "Our Values",
        values_desc: "Integrity, excellence, and transparency in every brick we lay and every connection we make.",
        home_services_title: "OUR SERVICES",
        home_about_title: "ABOUT US",
        home_projects_title: "OUR PROJECTS",
        home_services_btn: "SHOW MORE SERVICES",
        home_about_btn: "READ MORE COMPANY",
        home_projects_btn: "SHOW MORE WORKS",
        home_about_text: "The company is distinguished by its extensive expertise and high efficiency in executing projects according to the highest standards of quality and within specified timelines. It also has a specialized and highly trained team, in addition to utilizing the latest technologies and equipment in its operations.",
        footer_follow: "Follow us",
        footer_head_office: "Head Office",
        footer_branch1: "Branch 1",
        footer_branch2: "Branch 2",
        footer_opening: "Opening Hours",
        footer_contact_btn: "Contact us",
        footer_whatsapp: "WhatsApp",
        footer_phone: "Phone number",
        footer_email: "E-mail",
        footer_head_office_address: "Building B219, The Courtyard – sheikh Zayed – giza",
        footer_branch1_address: "Vila 51w, khafra gate, Hadayek Al ahram – giza",
        footer_branch2_address: "1 Egypt – Aswan Agricultural Road, Front of the Intercity station – Asfwan – Esna center – Luxor",
        footer_opening_hours: "Saturday to Thursday: 9AM - 5PM",
        about_profile_title: "COMPANY PROFILE",
        about_download: "DOWNLOAD NOW",
        about_us_title: "ABOUT US",
        about_us_text1: "Monterial Constructions Company was established in 2010 to become a leading company in the construction field and a trusted partner in the building and construction sector. The company boasts an impressive track record of achievements in executing diverse projects, ranging from massive infrastructure developments to the restoration of historical sites. Our company was the first and only one to restore the Pyramids area, historic castles (such as Mohamed Ali Castle and Qaitbay Citadel), and other archaeological sites.",
        about_us_text2: "The company is distinguished by its extensive expertise and high efficiency in executing projects according to the highest standards of quality and within specified timelines. It also has a specialized and highly trained team, in addition to utilizing the latest technologies and equipment in its operations.",
        about_vision_title: "OUR VISION",
        about_vision_text: "The company always strives to achieve customer satisfaction by providing innovative solutions that meet their needs and exceed their expectations, ensuring high quality and outstanding results in all its projects.",
        about_vision_quote: "It also seeks to focus on cultural heritage & architectural legacy by providing exceptional services that combine modernity & authenticity. Our history deserves the best by preserving the past and preparing for the future.",
        about_goals_title: "OUR GOALS",
        about_goal1: "Establishing the company's reputation as a reliable and innovative brand",
        about_goal2: "Entering regional or international markets and opening new branches",
        about_goal3: "Improving operational efficiency",
    },
    ar: {
        header_home: "الرئيسية",
        header_about: "من نحن",
        header_services: "خدماتنا",
        header_projects: "مشاريعنا",
        header_contact: "اتصل بنا",
        header_lang: "العربية",
        verify_title: "بوابة الأمان",
        verify_desc: "يرجى تأكيد أنك زائر بشري للوصول إلى بوابة مونتريال للإنشاءات.",
        verify_btn: "تأكيد الهوية",
        global_encrypted: "وصول عالمي مشفر",
        rights_reserved: "جميع الحقوق محفوظة الي",
        company_name: "مونتريال للإنشاءات",
        hero_subtitle: "بناء",
        hero_span: "مستقبل",
        hero_slogan: "نحافظ على تاريخنا ونبني مستقبلنا",
        hero_infrastructure: "البنية التحتية",
        hero_desc: "نحن نقدم حلولاً هندسية عالمية المستوى ومواد بناء عالية الجودة للتطورات الحضرية المميزة والمشاريع الصناعية.",
        hero_btn_projects: "استكشاف المشاريع",
        hero_btn_services: "خدماتنا",
        stats_projects: "مشاريع مكتملة",
        stats_workers: "خبراء متخصصون",
        stats_awards: "جوائز فزنا بها",
        stats_years: "سنوات الخبرة",
        services_subtitle: "خدماتنا",
        services_title: "خدمات عالية الأداء",
        service1_title: "أعمال البناء والتشييد - أعمال متكاملة",
        service2_title: "تشييد وبناء الكباري والانفاق",
        service3_title: "إنشاء وصيانة محطات وورش السكك الحديدية والمترو",
        service4_title: "أعمال الإنشاءات المعدنية",
        service5_title: "جميع الإنشاءات التخصصية",
        service6_title: "أعمال البنية التحتية",
        service7_title: "أعمال ترميم المتاحف والمعابد والتماثيل والمساجد والمواقع الأثرية",
        service8_title: "أعمال الزراعة والتشجير وصيانة المساحات الخضراء",
        service9_title: "الزراعة وتنسيق الحدائق بالأشجار وصيانة المساحات الخضراء",
        service10_title: "أعمال الصيانة والتشغيل والإدارة للمباني الحكومية والمتاحف والمستشفيات والسكك الحديدية ومترو الأنفاق والنوادي والأماكن الرياضية",
        projects_title_prefix: "أهم",
        projects_title_span: "إنجازاتنا",
        projects_desc: "استكشف مجموعة مشاريعنا ذات التأثير القوي التي تعيد تعريف المشهد المعماري الحديث.",
        about_hero_title: "إرثنا العريق",
        about_hero_desc: "بناء مستقبل البنية التحتية بدقة وابتكار والتزام لا يتزعزع بالجودة منذ عام 1995.",
        about_excellence_title: "التميز الهندسي",
        about_excellence_desc: "في مونتريال للإنشاءات، نحن لا نبني الهياكل فحسب؛ بل نصنع معالم تحدد آفاق المدن. يجمع نهجنا بين الحرفية التقليدية والتكنولوجيا المستدامة المتطورة لتقديم مشاريع تصمد أمام اختبار الزمن.",
        mission_title: "مهمتنا",
        mission_desc: "تقديم خدمات بناء متفوقة من خلال التأكيد على السلامة والجودة والمسؤولية البيئية.",
        vision_title: "رؤيتنا",
        vision_desc: "أن نكون الاسم الأكثر ثقة في تطوير البنية التحتية العالمية من خلال الابتكار.",
        values_title: "قيمنا",
        values_desc: "النزاهة والتميز والشفافية في كل لبنة نضعها وفي كل صلة نصنعها.",
        home_services_title: "خدماتنا",
        home_about_title: "من نحن",
        home_projects_title: "مشاريعنا",
        home_services_btn: "عرض المزيد من الخدمات",
        home_about_btn: "اقرأ المزيد عن الشركة",
        home_projects_btn: "عرض المزيد من الأعمال",
        home_about_text: "تتميز الشركة بخبرتها الواسعة وكفاءتها العالية في تنفيذ المشاريع وفق أعلى معايير الجودة وفي المواعيد المحددة. كما تمتلك فريقاً متخصصاً ومدرباً على أعلى مستوى، فضلاً عن استخدام أحدث التقنيات والمعدات في عملياتها.",
        footer_follow: "تابعنا",
        footer_head_office: "المكتب الرئيسي",
        footer_branch1: "فرع 1",
        footer_branch2: "فرع 2",
        footer_opening: "ساعات العمل",
        footer_contact_btn: "اتصل بنا",
        footer_whatsapp: "واتساب",
        footer_phone: "رقم الهاتف",
        footer_email: "البريد الإلكتروني",
        footer_head_office_address: "مبنى B219، ذا كورت يارد - الشيخ زايد - الجيزة",
        footer_branch1_address: "فيلا 51 و، بوابة خفرع، حدائق الأهرام - الجيزة",
        footer_branch2_address: "1 طريق مصر أسوان الزراعي، أمام محطة الأقاليم - سفوان - مركز إسنا - الأقصر",
        footer_opening_hours: "من السبت إلى الخميس: 9 صباحاً - 5 مساءً",
        about_profile_title: "ملف الشركة",
        about_download: "تحميل الآن",
        about_us_title: "من نحن",
        about_us_text1: "تأسست شركة مونتريال للإنشاءات في عام 2010 لتصبح شركة رائدة في مجال البناء وشريكاً موثوقاً به في قطاع التشييد والبناء. تفتخر الشركة بسجل حافل من الإنجازات في تنفيذ مشاريع متنوعة، تتراوح من تطوير البنية التحتية الضخمة إلى ترميم المواقع التاريخية. كانت شركتنا الأولى والوحيدة التي قامت بترميم منطقة الأهرامات والقلاع التاريخية (مثل قلعة محمد علي وقلعة قايتباي) وغيرها من المواقع الأثرية.",
        about_us_text2: "تتميز الشركة بخبرتها الواسعة وكفاءتها العالية في تنفيذ المشاريع وفق أعلى معايير الجودة وفي المواعيد المحددة. كما تمتلك فريقاً متخصصاً ومدرباً على أعلى مستوى، فضلاً عن استخدام أحدث التقنيات والمعدات في عملياتها.",
        about_vision_title: "رؤيتنا",
        about_vision_text: "تسعى الشركة دائماً لتحقيق رضا العملاء من خلال تقديم حلول مبتكرة تلبي احتياجاتهم وتتجاوز توقعاتهم، مما يضمن الجودة العالية والنتائج المتميزة في جميع مشاريعها.",
        about_vision_quote: "كما تسعى للتركيز على التراث الثقافي والإرث المعماري من خلال تقديم خدمات استثنائية تجمع بين الحداثة والأصالة. تاريخنا يستحق الأفضل من خلال الحفاظ على الماضي والاستعداد للمستقبل.",
        about_goals_title: "أهدافنا",
        about_goal1: "ترسيخ سمعة الشركة كعلامة تجارية موثوقة ومبتكرة",
        about_goal2: "دخول الأسواق الإقليمية أو الدولية وفتح فروع جديدة",
        about_goal3: "تحسين الكفاءة التشغيلية",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("monterial_lang") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "ar")) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("monterial_lang", lang);
    };

    useEffect(() => {
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
