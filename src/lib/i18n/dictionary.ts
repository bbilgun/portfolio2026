// Site copy, keyed by a flat dotted namespace and grouped by locale.
// Every locale carries the full key set, so `t()` never has to fall back.

export const locales = [
  { code: "en", label: "EN", native: "English" },
  { code: "mn", label: "MN", native: "Монгол" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const dictionary = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "hero.status": "OPEN TO WORK · ULAANBAATAR",
    "nav.projects": "Projects",
    "hero.role": "FRONTEND & MOBILE DEVELOPER",
    "hero.tagline.lead":
      "Focusing on building accessible, high-performance web and mobile interfaces.",
    "about.p1":
      "Graduated from MUST-SICT with a degree in Computer Science (2026). Joined the Sys&CoTech club in my second year, contributing to web development for various events and activities. In my final year, I was elected club President and led a team of 30+ members.",
    "about.p2":
      "Currently working at Everest Solution LLC, building user interfaces for fintech and leasing products (eLeasing, Nice Leasing, Gate, EntCreditMN, Wallet) using React, React Native, TypeScript, and Tailwind CSS.",
    "about.p3":
      "Looking for my next team to keep shipping live products to real users while growing alongside experienced engineers.",
    "work.status.shipped": "SHIPPED",
    "work.status.contributed": "CONTRIBUTED · MAINTAINED",
    "work.store.ios": "App Store",
    "work.store.android": "Google Play",
    "work.store.web": "Launch coverage",
    "work.fgnkiosk.summary":
      "4K touch kiosk for buying physical gold in person at Fine Gold Nation. Built the entire front-end: staff login, the QPay payment flow, and the purchase screens. Where the brief left gaps, I designed several screens myself.",
    "work.eleasing.summary":
      "EverestSolution’s largest leasing app, rebuilt from Xamarin (C#) on the company’s shared React Native base: Expo Router, TypeScript and NativeWind, with API, auth and app state coming from a shared core. I did the migration, built the front-end on that base and shipped it to the App Store and Google Play.",
    "work.niceleasing.summary":
      "My first app at EverestSolution, built on React Native without Expo, using TypeScript and NativeWind. I built the front-end, gave it the brand’s own look and shipped it to the App Store and Google Play. I’ve used it as the base for my later apps since.",
    "work.gate.summary":
      "Lending app on the same shared React Native base as eLeasing. I built the front-end on top of it and shipped it to the App Store and Google Play.",
    "work.entcredit.summary":
      "Credit app for EntCredit, on the same shared React Native base. I built the front-end and shipped it to the App Store and Google Play.",
    "work.wallet.summary":
      "Loan app for MonInvest, on the same shared React Native base. I built the front-end and shipped it to Google Play.",
    "work.onelend.summary":
      "Consumer loan app on the same shared React Native base. I added features after release and keep it maintained.",
    "work.carzeel.summary":
      "Loan app for the CAR zeel brand, on the same shared React Native base. I added front-end features and handle ongoing fixes.",
    "work.woow.summary":
      "WooW pay loan app, on the same shared React Native base. I added features and handle post-release maintenance.",
    "work.fgn.summary":
      "Fine Gold Nation’s app for buying gold from your phone. A separate codebase on Expo Router and NativeWind, with Zustand for state. I added front-end features and help maintain it.",
    "timeline.e1.title": "Mongolian University of Science and Technology",
    "timeline.e1.focus": "BSc COMPUTER SCIENCE",
    "timeline.e2.title": "Sys&CoTech Club: Development Team",
    "timeline.e2.focus": "PORTAL & HACKATHON SITE",
    "timeline.e2.body":
      "Built the club portal and the DevHackathon event site with React and Tailwind. The first work of mine that other people depended on.",
    "timeline.e3.title": "Sys&CoTech Club: President",
    "timeline.e3.focus": "LEADING THE UNIVERSITY TECH CLUB",
    "timeline.e3.body":
      "Ran the club and led a team of about 30 people. Organized DevHackathon, open to university students from across Mongolia, along with smaller tech events throughout the year.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & MOBILE DEVELOPER",
    "timeline.e4.body":
      "Building and maintaining mobile applications for fintech and leasing products. Migrated the legacy Xamarin (C#) eLeasing app to React Native.",
    "timeline.e5.title": "Sono Fintech",
    "timeline.e5.focus": "STUDENT PROGRAMME · LOAN COLLECTIONS",
    "timeline.e5.body":
      "Paid summer internship on Sono's student programme, working the collections side of their loan app. Reaching out to borrowers about their payments, helping them stay on schedule and arranging extensions when needed. I finished as the highest performing intern in the cohort. It is also where I learned how consumer lending works from the inside, which is the product I now build interfaces for.",
    "contact.title": "Open to frontend and mobile roles.",
    "contact.body":
      "Email is the fastest way to reach me. I read everything and reply within a day. Happy to talk about a role, a contract, or an app you want built properly.",
    "contact.cta": "SEND EMAIL",
    "contact.or": "or find me on",
    "footer.rights": "ALL RIGHTS RESERVED",
    "footer.built": "BUILT WITH NEXT · TAILWIND · FRAMER",
    "notfound.title": "Wrong turn.",
    "notfound.body":
      "This road doesn't lead anywhere. The page you're looking for doesn't exist.",
    "notfound.cta": "BACK HOME",
  },
  mn: {
    "nav.about": "Танилцуулга",
    "nav.experience": "Ажлын туршлага",
    "nav.education": "Боловсрол",
    "nav.contact": "Холбогдох",
    "hero.status": "АЖИЛД НЭЭЛТТЭЙ · УЛААНБААТАР",
    "nav.projects": "Төслүүд",
    "hero.role": "FRONTEND & MOBILE ХӨГЖҮҮЛЭГЧ",
    "hero.tagline.lead":
      "Хэрэглэхэд хялбар, гүйцэтгэлтэй сайтай веб болон мобайл интерфэйс хөгжүүлэхийг зорьж ажилладаг.",
    "about.p1":
      "ШУТИС-МХТС-ийг Компьютерийн ухааны чиглэлээр 2026 онд төгссөн. 2-р курстээ Sys&CoTech клубт нэгдэн, зохион байгуулж буй үйл ажиллагаануудын веб хөгжүүлэлтэд оролцож эхэлсэн. Сүүлчийн жилдээ клубын тэргүүнээр сонгогдон 30+ гишүүнтэй багийг ахалж байсан туршлагатай.",
    "about.p2":
      "Одоо EverestSolution LLC-д React, React Native, TypeScript, Tailwind CSS ашиглан финтек болон лизингийн бүтээгдэхүүнүүдийн (eLeasing, Nice Leasing, Gate, EntCreditMN, Wallet) хэрэглэгчийн интерфэйс дээр ажилладаг.",
    "about.p3":
      "Бодит хэрэглэгчдэд зориулж бүтээгдэхүүн гаргахын хажуугаар туршлагатай инженерүүдээс суралцаж, цааш өсөн дэвжих дараагийн багаа хайж байна.",
    "work.status.shipped": "ГҮЙЦЭТГЭСЭН",
    "work.status.contributed": "CONTRIBUTED · MAINTAINED",
    "work.store.ios": "App Store",
    "work.store.android": "Google Play",
    "work.store.web": "Нээлтийн мэдээ",
    "work.fgnkiosk.summary":
      "Fine Gold Nation-ы биет алт худалдаалдаг киоск. Хэрэглэгчийн интерфэйс-ийг бүрэн хариуцаж хийсэн. Өгөгдсөн дизайнд байгаагүй зарим нэг зайлшгүй шаардлагатай дэлгэцүүдийг өөрөө зохиомж гарган хийсэн (Staff login, бүтээгдэхүүн бүртгэх дэлгэцүүд г.м).",
    "work.eleasing.summary":
      "EverestSolution-ийн хамгийн том лизингийн апп. Хуучин Xamarin (C#) аппыг компанийн нийтлэг React Native суурь дээр шинээр хийсэн: Expo Router, TypeScript, NativeWind, харин API, нэвтрэлт, төлөвийн удирдлага нь хуваалцсан нэгдсэн цөмөөс ирдэг. Хөрвүүлэлтийг хийж, интерфэйсийг энэ суурь дээр бүтээн App Store болон Google Play-д гаргасан.",
    "work.niceleasing.summary":
      "Хамгийн анх авч ажиллаж байсан бодит төсөл. Expo ашиглаагүй, React Native дээр TypeScript, NativeWind-оор хийсэн. Интерфэйсийг хийж, брэндийн өнгө төрхийг оруулан App Store болон Google Play-д гаргасан. Түүнээс хойш дараагийн аппуудаа энэ апп дээр суурилж хийсэн.",
    "work.gate.summary":
      "eLeasing-тэй ижил React Native суурь дээрх зээлийн апп. Интерфэйсийг хийж, App Store болон Google Play-д гаргасан.",
    "work.entcredit.summary":
      "EntCredit-ийн зээлийн апп, мөн адил React Native суурь дээр. Интерфэйсийг хийж, App Store болон Google Play-д гаргасан.",
    "work.wallet.summary":
      "MonInvest-ийн зээлийн апп, мөн адил React Native суурь дээр. Интерфэйсийг хийж, Google Play-д гаргасан.",
    "work.onelend.summary":
      "Мөн адил React Native суурь дээрх зээлийн апп. Гарсны дараа шинэ боломжууд нэмж, засвар үйлчилгээг хийдэг.",
    "work.carzeel.summary":
      "CAR zeel брэндийн зээлийн апп, мөн адил React Native суурь дээр. Интерфэйсийн шинэ боломжууд нэмж, тогтмол засварт оролцдог.",
    "work.woow.summary":
      "WooW pay зээлийн апп, мөн адил React Native суурь дээр. Шинэ боломжууд нэмж, гарсны дараах засвар үйлчилгээг хариуцдаг.",
    "work.fgn.summary":
      "Fine Gold Nation. Гар утаснаасаа алт худалдан авах апп. Expo Router, NativeWind, Zustand ашигласан тусдаа кодын сан. Интерфэйсийн шинэ боломжууд нэмж, засвар үйлчилгээнд оролцдог.",
    "timeline.e1.title": "Шинжлэх Ухаан Технологийн Их Сургууль",
    "timeline.e1.focus": "КОМПЬЮТЕРИЙН УХААН, БАКАЛАВР",
    "timeline.e2.title": "Sys&CoTech клуб: Хөгжүүлэлтийн баг",
    "timeline.e2.focus": "ПОРТАЛ БОЛОН ХАКАТОНЫ САЙТ",
    "timeline.e2.body":
      "Клубын портал болон DevHackathon-ы сайтыг React, Tailwind ашиглан бүтээсэн. Бусад хүн найддаг болсон миний анхны ажил.",
    "timeline.e3.title": "Sys&CoTech клуб: Тэргүүн",
    "timeline.e3.focus": "ИХ СУРГУУЛИЙН ТЕХНОЛОГИЙН КЛУБЫГ УДИРДАН",
    "timeline.e3.body":
      "Клубыг удирдаж, 30 орчим хүнтэй багийг ахалсан. Монгол даяарх их, дээд сургуулийн оюутнууд оролцох боломжтой DevHackathon-ыг зохион байгуулж, жилийн турш технологийн чиглэлийн жижиг арга хэмжээнүүд хийсэн.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & ГАР УТАСНЫ ХӨГЖҮҮЛЭГЧ",
    "timeline.e4.body":
      "Финтек болон лизингийн мобайл аппликейшнуудын хөгжүүлэлт, цаашдын арчилгаа дээр ажилладаг. Мөн хуучин Xamarin (C#) дээрх eLeasing аппыг React Native руу хөрвүүлсэн.",
    "timeline.e5.title": "Соно Финтек",
    "timeline.e5.focus": "ОЮУТАН ХӨТӨЛБӨР · ЗЭЭЛИЙН ЭРГЭН ТӨЛӨЛТ",
    "timeline.e5.body":
      'Соно аппын "Оюутан хөтөлбөр"-т цалинтай зуны дадлага хийж, зээлийн эргэн төлөлтийн талд ажилласан: зээлдэгчидтэй холбогдож төлөлтөө хугацаанд нь хийхэд нь туслах, шаардлагатай үед хугацаа сунгах. Хөтөлбөрийн хамгийн өндөр үзүүлэлттэй дадлагажигч болсон. Хэрэглээний зээл дотроосоо хэрхэн ажилладгийг эндээс сурсан нь одоо интерфэйсийг нь хийж байгаа бүтээгдэхүүнд минь тусдаг.',
    "contact.title": "Frontend болон гар утасны ажлын байранд нээлттэй.",
    "contact.body":
      "Имэйлээр холбогдоход хамгийн хурдан. Бүх захидлыг уншиж, нэг өдрийн дотор хариу өгдөг. Ажлын байр, гэрээт ажил, эсвэл сайн хийгдсэн апп хэрэгтэй бол ярилцъя.",
    "contact.cta": "ИМЭЙЛ БИЧИХ",
    "contact.or": "эсвэл эндээс",
    "footer.rights": "БҮХ ЭРХ ХАМГААЛАГДСАН",
    "footer.built": "NEXT · TAILWIND · FRAMER-ЭЭР БҮТЭЭСЭН",
    "notfound.title": "Буруу эргэлт.",
    "notfound.body":
      "Энэ зам хаашаа ч хүргэхгүй. Таны хайсан хуудас байхгүй байна.",
    "notfound.cta": "НҮҮР ХУУДАС РУУ",
  },
} satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionary)["en"];
