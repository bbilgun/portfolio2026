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
      "4K touch kiosk for buying physical gold in person at Fine Gold Nation. Built the whole front-end: identity verification, QPay and card payment, and hardware-driven dispensing.",
    "work.eleasing.summary":
      "EverestSolution’s largest consumer loan product, up to ₮5,000,000 over 3 to 12 months. I built the React Native front-end: registration, loan request, contract signing and repayment tracking.",
    "work.niceleasing.summary":
      "Consumer lending app under the Nice Leasing brand, ₮100,000 to ₮1,000,000 over 3 to 12 months. Its own identity and theming over the loan flow.",
    "work.gate.summary":
      "Lending app with a shorter repayment window of 3 to 9 months. Front-end for the application flow, the contract step and the payment schedule.",
    "work.entcredit.summary":
      "Credit app for EntCredit, covering application through to disbursement, with the repayment calculator and contract screens.",
    "work.wallet.summary":
      "Loan and repayment app for MonInvest. Request a loan, track the balance and read the payment history in one place.",
    "work.onelend.summary":
      "Consumer loan app in the same family. Contributed screens to the application flow and kept it maintained after release.",
    "work.carzeel.summary":
      "Consumer loan app under the CAR zeel brand. Contributed front-end features and ongoing fixes.",
    "work.woow.summary":
      "WooW pay consumer loan app. Contributed features and post-release maintenance.",
    "work.fgn.summary":
      "Fine Gold Nation, an app for buying gold from your phone. Contributed front-end features and maintenance.",
    "timeline.e1.title": "Mongolian University of Science and Technology",
    "timeline.e1.focus": "BSc COMPUTER SCIENCE",
    "timeline.e2.title": "Sys&CoTech Club: Development Team",
    "timeline.e2.focus": "PORTAL & HACKATHON SITE",
    "timeline.e2.body":
      "Built the club portal and the DevHackathon event site with React and Tailwind. The first work of mine that other people depended on.",
    "timeline.e3.title": "Sys&CoTech Club: President",
    "timeline.e3.focus": "LEADING THE UNIVERSITY TECH CLUB",
    "timeline.e3.body":
      "Ran the club: the dev team, the DevHackathon event, and the club's own sites. A lot of the job was getting new members to ship their first real project.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & MOBILE DEVELOPER",
    "timeline.e4.body":
      "Building and maintaining mobile applications for fintech and leasing products. Responsible for migrating legacy Xamarin (C#) apps to React Native.",
    "timeline.e5.title": "Sono Fintech",
    "timeline.e5.focus": "STUDENT PROGRAMME · LOAN COLLECTIONS",
    "timeline.e5.body":
      "Paid summer internship on Sono's student programme, working the collections side of their loan app: contacting borrowers, chasing repayments and arranging extensions. I finished as the highest performing intern in the cohort. It is also where I learned how consumer lending works from the inside, which is the product I now build interfaces for.",
    "contact.title": "Open to frontend and mobile roles.",
    "contact.body":
      "Email is the fastest way to reach me. I read everything and reply within a day. Happy to talk about a role, a contract, or an app you want built properly.",
    "contact.cta": "SEND EMAIL",
    "contact.or": "or find me on",
    "footer.rights": "ALL RIGHTS RESERVED",
    "footer.built": "BUILT WITH NEXT · TAILWIND · FRAMER",
    "notfound.title": "Wrong turn.",
    "notfound.body": "This road doesn't lead anywhere. The page you're looking for doesn't exist.",
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
      "Хүртээмжтэй, өндөр гүйцэтгэлтэй веб болон мобайл интерфэйс хөгжүүлэхийг зорьдог.",
    "about.p1":
      "ШУТИС-МХТС-ийг Компьютерийн ухааны чиглэлээр 2026 төгссөн. 2-р курстээ Sys&CoTech клубт нэгдэн, зохион байгуулж буй үйл ажиллагаануудын веб хөгжүүлэлтэд оролцож эхэлсэн. Сүүлчийн жилдээ клубын тэргүүнээр сонгогдон 30+ гишүүнтэй багийг ахалж байсан туршлагатай.",
    "about.p2":
      "Одоо EverestSolution LLC-д React, React Native, TypeScript, Tailwind CSS ашиглан финтек болон лизингийн бүтээгдэхүүнүүдийн (eLeasing, Nice Leasing, Gate, EntCreditMN, Wallet) хэрэглэгчийн интерфэйс дээр ажилладаг.",
    "about.p3":
      "Бодит хэрэглэгчдэд зориулж бүтээгдэхүүн гаргахын хажуугаар туршлагатай инженерүүдээс суралцаж, цааш өсөн дэвжих дараагийн багаа хайж байна.",
    "work.status.shipped": "ГАРГАСАН",
    "work.status.contributed": "ХУВЬ НЭМЭР · ЗАСВАР ҮЙЛЧИЛГЭЭ",
    "work.store.ios": "App Store",
    "work.store.android": "Google Play",
    "work.store.web": "Нээлтийн мэдээ",
    "work.fgnkiosk.summary":
      "Fine Gold Nation-ы салбарт биет алт худалдаж авах 4K тач дэлгэцтэй киоск. Бүтэн интерфэйсийг нь бүтээсэн: хэрэглэгчийн баталгаажуулалт, QPay болон картын төлбөр, төхөөрөмжөөс шууд удирддаг олголт.",
    "work.eleasing.summary":
      "EverestSolution-ы хамгийн том зээлийн бүтээгдэхүүн. 3-аас 12 сарын хугацаатай ₮5,000,000 хүртэл. React Native интерфэйсийг нь бүтээсэн: бүртгэл, зээлийн хүсэлт, гэрээ байгуулалт, эргэн төлөлтийн хяналт.",
    "work.niceleasing.summary":
      "Nice Leasing брэндийн зээлийн апп. 3-аас 12 сарын хугацаатай ₮100,000-аас ₮1,000,000. Ижил зээлийн урсгал дээр өөрийн брэнд, өнгө төрх.",
    "work.gate.summary":
      "3-аас 9 сарын богино хугацаат зээлийн апп. Хүсэлтийн урсгал, гэрээний алхам, төлбөрийн хуваарийн интерфэйсийг хийсэн.",
    "work.entcredit.summary":
      "EntCredit-ийн зээлийн апп. Хүсэлтээс олголт хүртэл, эргэн төлөлтийн тооцоолуур болон гэрээний дэлгэцүүдтэй.",
    "work.wallet.summary":
      "MonInvest-ийн зээл, төлбөрийн апп. Зээл хүсэх, үлдэгдэл хянах, төлбөрийн түүхээ нэг дороос харах.",
    "work.onelend.summary":
      "Мөн адил төрлийн зээлийн апп. Хүсэлтийн урсгалын дэлгэцүүдэд хувь нэмэр оруулж, гарсны дараах засвар үйлчилгээг хийсэн.",
    "work.carzeel.summary":
      "CAR zeel брэндийн зээлийн апп. Интерфэйсийн шинэ боломжууд болон тогтмол засварт оролцсон.",
    "work.woow.summary":
      "WooW pay зээлийн апп. Шинэ боломжууд нэмж, гарсны дараах засвар үйлчилгээг хариуцсан.",
    "work.fgn.summary":
      "Fine Gold Nation. Гар утаснаасаа алт худалдан авах апп. Интерфэйсийн боломжууд болон засвар үйлчилгээнд оролцсон.",
    "timeline.e1.title": "Шинжлэх Ухаан Технологийн Их Сургууль",
    "timeline.e1.focus": "КОМПЬЮТЕРИЙН УХААН, БАКАЛАВР",
    "timeline.e2.title": "Sys&CoTech клуб: Хөгжүүлэлтийн баг",
    "timeline.e2.focus": "ПОРТАЛ БОЛОН ХАКАТОНЫ САЙТ",
    "timeline.e2.body":
      "Клубын портал болон DevHackathon-ы сайтыг React, Tailwind ашиглан бүтээсэн. Бусад хүн найддаг болсон миний анхны ажил.",
    "timeline.e3.title": "Sys&CoTech клуб: Тэргүүн",
    "timeline.e3.focus": "ИХ СУРГУУЛИЙН ТЕХНОЛОГИЙН КЛУБЫГ УДИРДАН",
    "timeline.e3.body":
      "Клубын хөгжүүлэлтийн баг, DevHackathon арга хэмжээ, клубын сайтуудыг удирдан ажиллуулж байсан. Ажлын нэг чухал хэсэг нь шинэ гишүүдийг анхны бодит төслөө гаргахад нь дэмжих байлаа.",
    "timeline.e4.title": "EverestSolution",
    "timeline.e4.focus": "FRONTEND & ГАР УТАСНЫ ХӨГЖҮҮЛЭГЧ",
    "timeline.e4.body":
      "Финтек болон лизингийн мобайл аппликейшнуудын хөгжүүлэлт, цаашдын арчилгаа дээр ажилладаг. Мөн хуучин Xamarin (C#) дээрх аппуудыг React Native руу хөрвүүлэх ажлыг гүйцэтгэдэг.",
    "timeline.e5.title": "Соно Финтек",
    "timeline.e5.focus": "ОЮУТАН ХӨТӨЛБӨР · ЗЭЭЛИЙН ЭРГЭН ТӨЛӨЛТ",
    "timeline.e5.body":
      "Соно аппын \"Оюутан хөтөлбөр\"-т цалинтай зуны дадлага хийж, зээлийн эргэн төлөлтийн талд ажилласан: зээлдэгчидтэй холбогдох, төлөлт хөөцөлдөх, хугацаа сунгах. Хөтөлбөрийн хамгийн өндөр үзүүлэлттэй дадлагажигч болсон. Хэрэглээний зээл дотроосоо хэрхэн ажилладгийг эндээс сурсан нь одоо интерфэйсийг нь хийж байгаа бүтээгдэхүүнд минь тусдаг.",
    "contact.title": "Frontend болон гар утасны ажлын байранд нээлттэй.",
    "contact.body":
      "Имэйлээр холбогдоход хамгийн хурдан. Бүх захидлыг уншиж, нэг өдрийн дотор хариу өгдөг. Ажлын байр, гэрээт ажил, эсвэл сайн хийгдсэн апп хэрэгтэй бол ярилцъя.",
    "contact.cta": "ИМЭЙЛ БИЧИХ",
    "contact.or": "эсвэл эндээс",
    "footer.rights": "БҮХ ЭРХ ХАМГААЛАГДСАН",
    "footer.built": "NEXT · TAILWIND · FRAMER-ЭЭР БҮТЭЭСЭН",
    "notfound.title": "Буруу эргэлт.",
    "notfound.body": "Энэ зам хаашаа ч хүргэхгүй. Таны хайсан хуудас байхгүй байна.",
    "notfound.cta": "НҮҮР ХУУДАС РУУ",
  },
} satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionary)["en"];
