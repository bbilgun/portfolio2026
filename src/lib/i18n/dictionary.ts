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
      "Focused on building easy-to-use, high-performance web and mobile interfaces.",
    "about.p1":
      "Graduated from MUST-SICT in Computer Science in 2026. Joined the Sys&CoTech club in my second year and started working on the web development for the events and activities it organized. In my final year I was elected club President and led a team of 30+ members.",
    "about.p2":
      "Currently working at EverestSolution LLC on the user interfaces of fintech and leasing products (eLeasing, Nice Leasing, Gate, EntCreditMN, Wallet) with React, React Native, TypeScript and Tailwind CSS.",
    "about.p3":
      "Looking for my next team to keep shipping live products to real users while growing alongside experienced engineers.",
    "work.status.shipped": "SHIPPED",
    "work.status.contributed": "CONTRIBUTED · MAINTAINED",
    "work.store.ios": "App Store",
    "work.store.android": "Google Play",
    "work.store.web": "Launch coverage",
    "work.fgnkiosk.summary":
      "Fine Gold Nation’s kiosk for buying physical gold. I was fully responsible for the user interface, and designed several essential screens the provided design didn’t cover myself (staff login, product registration screens and more).",
    "work.eleasing.summary":
      "PC Mall’s leasing app. I rebuilt the old Xamarin (C#) app on the company’s shared React Native base, handled the migration and published it to the App Store and Google Play.",
    "work.niceleasing.summary":
      "The first real project I worked on. Built on React Native without Expo, using TypeScript and NativeWind on the front end. I rewrote its interface, gave it the brand’s look and shipped it to the App Store and Google Play. Its code became the template for later projects like it.",
    "work.gate.summary":
      "Lending app on the same React Native base as Nice Leasing. I built the interface and shipped it to the App Store and Google Play.",
    "work.entcredit.summary":
      "EntCredit’s loan app, on the same React Native base. I built the interface and shipped it to the App Store and Google Play.",
    "work.wallet.summary":
      "MonInvest’s loan app, on the same React Native base. I built the interface and shipped it to Google Play.",
    "work.onelend.summary":
      "Loan app on the same React Native base. I add new features after release and handle its maintenance.",
    "work.carzeel.summary":
      "Also on the same React Native base. I add new features and take part in regular fixes.",
    "work.woow.summary":
      "WooW pay loan app, on the same React Native base. I ship updates and handle post-release maintenance.",
    "work.fgn.summary":
      "Fine Gold Nation. An app for buying gold from your phone. A separate codebase using Expo Router, NativeWind and Zustand. I make interface updates and help maintain it.",
    "timeline.e1.title": "Mongolian University of Science and Technology",
    "timeline.e1.focus": "BSc COMPUTER SCIENCE",
    "timeline.e2.title": "Sys&CoTech Club: Development Team",
    "timeline.e2.focus": "PORTAL & HACKATHON SITE",
    "timeline.e2.body":
      "Worked on the web development for the club portal and its events.",
    "timeline.e3.title": "Sys&CoTech Club: President",
    "timeline.e3.focus": "PRESIDENT OF THE UNIVERSITY TECH CLUB",
    "timeline.e3.body":
      "Led the club and a team of about 30 people. Organized DevHackathon, open to university and college students from across Mongolia, and ran smaller tech events throughout the year.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & MOBILE DEVELOPER",
    "timeline.e4.body":
      "Developing and maintaining mobile apps for fintech and leasing products. Also migrating legacy Xamarin (C#) apps to React Native.",
    "timeline.e5.title": "Sono Fintech",
    "timeline.e5.focus": "STUDENT PROGRAMME · LOAN COLLECTIONS",
    "timeline.e5.body":
      "Paid summer internship on Sono’s student programme, working on loan collections: reaching out to borrowers, helping them pay on time and arranging loan extensions. Finished the programme as its highest-performing intern.",
    "contact.title": "Open to frontend and mobile roles.",
    "contact.body": "Looking for full-time and contract work.",
    "contact.cta": "SEND EMAIL",
    "contact.or": "or find me on",
    "footer.rights": "xbbilgun@gmail.com",
    "footer.built": "NEXT · TAILWIND · TYPESCRIPT",
    "notfound.title": "Noot fouunndd.",
    "notfound.body":
      "Looks like the page you’re looking for doesn’t exist, bronny james.",
    "notfound.cta": "BACK HOME",
  },
  mn: {
    "nav.about": "Танилцуулга",
    "nav.experience": "Ажлын туршлага",
    "nav.education": "Боловсрол",
    "nav.contact": "Холбогдох",
    "hero.status": "OPEN TO WORK · УЛААНБААТАР",
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
      "PC Mall-ийн лизингийн апп. Хуучин Xamarin (C#) аппыг компанийн нийтлэг React Native суурь дээр шинээр хийсэн. Хөрвүүлэлтийг хийн App Store болон Google Play-д байршуулсан.",
    "work.niceleasing.summary":
      "Хамгийн анх авч ажиллаж байсан бодит төсөл. Expo ашиглаагүй, React Native, TypeScript, NativeWind-ийг front дээр нь ашигласан. Интерфэйсийг нь шинээр бичиж, брэндийн өнгө төрхийг оруулан App Store болон Google Play-д гаргасан. Энэ аппын кодыг дараагийн ижил төстэй төслүүд дээр template болгон ашиглаж эхэлсэн.",
    "work.gate.summary":
      "NiceLeasing-тэй ижил React Native суурь дээрх зээлийн апп. Интерфэйсийг хийж, App Store болон Google Play-д гаргасан.",
    "work.entcredit.summary":
      "EntCredit-ийн зээлийн апп, мөн адил React Native суурь дээр. Интерфэйсийг хийж, App Store болон Google Play-д гаргасан.",
    "work.wallet.summary":
      "MonInvest-ийн зээлийн апп, мөн адил React Native суурь дээр. Интерфэйсийг хийж, Google Play-д гаргасан.",
    "work.onelend.summary":
      "Мөн адил React Native суурь дээрх зээлийн апп. Гарсны дараа интерфэйс сайжруулж, засвар үйлчилгээнд оролцсон.",
    "work.carzeel.summary":
      "Мөн адил React Native суурьтэй. Шинэ feature-үүд нэмж, тогтмол засварт оролцдог.",
    "work.woow.summary":
      "WooW pay зээлийн апп, мөн адил React Native суурь дээр. Шинэчлэлтүүд оруулж, гарсны дараах засвар үйлчилгээг хариуцдаг.",
    "work.fgn.summary":
      "Fine Gold Nation. Гар утаснаасаа алт худалдан авах апп. Expo Router, NativeWind, Zustand ашигласан тусдаа кодын сан. Интерфэйсийн шинэчлэлтүүд хийж, засвар үйлчилгээнд оролцдог.",
    "timeline.e1.title": "Шинжлэх Ухаан Технологийн Их Сургууль",
    "timeline.e1.focus": "КОМПЬЮТЕРИЙН УХААН, БАКАЛАВР",
    "timeline.e2.title": "Sys&CoTech клуб: Хөгжүүлэлтийн баг",
    "timeline.e2.focus": "ПОРТАЛ БОЛОН ХАКАТОНЫ САЙТ",
    "timeline.e2.body":
      "Клубын портал болон Event-үүдийн веб хөгжүүлэлтэд оролцдог байсан.",
    "timeline.e3.title": "Sys&CoTech клуб: Тэргүүн",
    "timeline.e3.focus": "ИХ СУРГУУЛИЙН ТЕХНОЛОГИЙН КЛУБЫН ТЭРГҮҮН",
    "timeline.e3.body":
      "Клубыг удирдаж, 30 орчим хүнтэй багийг ахалсан. Монгол даяарх их, дээд сургуулийн оюутнууд оролцох боломжтой DevHackathon-ыг зохион байгуулж, жилийн турш технологийн чиглэлийн жижиг арга хэмжээнүүд хийсэн.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & ГАР УТАСНЫ ХӨГЖҮҮЛЭГЧ",
    "timeline.e4.body":
      "Финтек болон лизингийн мобайл аппликейшнуудын хөгжүүлэлт, цаашдын maintenance дээр ажилладаг. Мөн хуучин Xamarin (C#) дээрх апп-уудыг React Native руу хөрвүүлэлт хийдэг.",
    "timeline.e5.title": "Соно Финтек",
    "timeline.e5.focus": "ОЮУТАН ХӨТӨЛБӨР · ЗЭЭЛИЙН ЭРГЭН ТӨЛӨЛТ",
    "timeline.e5.body":
      'Соно аппын "Оюутан хөтөлбөр"-т цалинтай зуны дадлага хийж, зээлдэгчтэй холбогдох, төлөлт хугацаанд нь хийхэд туслах, зээл сунгах зэргээр зээлийн эргэн төлөлт дээр ажилласан. Хөтөлбөрөө хамгийн өндөр үзүүлэлттэй дадлагажигчаар дуусгасан.',
    "contact.title": "Get in touch.",
    "contact.body": "Бүтэн цагийн ажил болон гэрээт ажил хайж байна.",
    "contact.cta": "ИМЭЙЛ БИЧИХ",
    "contact.or": "эсвэл эндээс",
    "footer.rights": "xbbilgun@gmail.com",
    "footer.built": "NEXT · TAILWIND · TYPESCRIPT",
    "notfound.title": "Noot fouunndd.",
    "notfound.body": "Хайсан хуудас нь байхгүй байх шиг байна өө bronny james.",
    "notfound.cta": "НҮҮР ХУУДАС РУУ",
  },
} satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionary)["en"];
