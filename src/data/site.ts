// Client facts for the homepage. Source: veon/client.json only (ids in comments). Nothing here is invented.

export interface Phone { tel: string; display: string; operator: string; }
export interface Location { id: string; district: string; street: string; map: string; }

export const brand = {
  name: "Євро Авто Сервіс", // company.name
  tagline: "Євро Авто Сервіс — запчастини та СТО в Києві", // C-001
};

// company.contacts.phones, C-005
export const phones: Phone[] = [
  { tel: "+380445877000", display: "(044) 587-7000", operator: "Київ" },
  { tel: "+380954277774", display: "(095) 427-7774", operator: "Водафон" },
  { tel: "+380960477774", display: "(096) 047-7774", operator: "Київстар" },
  { tel: "+380634277774", display: "(063) 427-7774", operator: "Лайф" },
];
export const mainPhone = phones[0]!;

// company.contacts.hours, C-004
export const hours = {
  open: 9,
  close: 19,
  callsUntil: 22,
  work: "Пн–Нд 9:00–19:00",
  calls: "дзвінки щодня до 22:00",
};

// company.contacts.addresses, socials (google_maps confirmed), C-003
export const locations: Location[] = [
  { id: "obolon", district: "Оболонь", street: "вул. Озерна, 1, корп. 3", map: "https://maps.app.goo.gl/sTMx5nHx6F3arNLh6" },
  { id: "darnytsia", district: "Дарниця", street: "вул. Бориспільська, 7А", map: "https://maps.app.goo.gl/5EpHmMsiohPdoZMKA" },
];

// company.products_services: diagnostics prices «від», UAH
export const diagnostics = [
  { name: "Діагностика ходової", price: 150 },
  { name: "Комплексна діагностика", price: 250 },
  { name: "Передпродажна підготовка", price: 250 },
  { name: "Комп’ютерна діагностика", price: 280 },
  { name: "Діагностика перед покупкою", price: 500 },
];

// company.products_services: repair and service units
export const units = [
  "Ходова",
  "Рульове керування",
  "Гальма",
  "Паливна система",
  "Трансмісія",
  "Двигун",
  "Технічне обслуговування",
  "Заміна ременя ГРМ",
  "Ремені й ролики",
  "Фільтри",
  "Масла й рідини",
  "Кузовний ремонт",
];

export const futureNote = "Розділ у розробці";
