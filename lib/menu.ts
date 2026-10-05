export type CategoryId =
  | "firin"
  | "sokak"
  | "ana"
  | "tatli"
  | "icecek"
  | "kahvalti";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
};

export type MenuGroup = {
  id: CategoryId;
  label: string;
  hint: string;
};

export const groups: MenuGroup[] = [
  { id: "firin", label: "Fırın Ürünleri", hint: "Simit ve poğaça" },
  { id: "sokak", label: "Sokak Lezzetleri", hint: "Tost ve bazlama" },
  { id: "ana", label: "Ana Yemekler", hint: "Mantı" },
  { id: "tatli", label: "Tatlılar", hint: "Pasta ve baklava" },
  { id: "icecek", label: "İçecekler", hint: "Çay ve kahve" },
  { id: "kahvalti", label: "Kahvaltılar", hint: "Serpme tabaklar" },
];

export const products: Product[] = [
  {
    id: "susamli-simit",
    name: "Susamlı Simit",
    description: "Çıtır kabuklu, bol susamlı klasik halka.",
    price: 25,
    category: "firin",
    image: "/products/sade-simit.jpg",
  },
  {
    id: "kasarli-zeytinli-simit",
    name: "Kaşarlı Zeytinli Simit",
    description: "Sıcak simidin içinde kaşar ve sele zeytin.",
    price: 45,
    category: "firin",
    image: "/products/kasarli-simit.jpg",
  },
  {
    id: "peynirli-pogaca",
    name: "Peynirli Poğaça",
    description: "Beyaz peynirli, yumuşak içli poğaça.",
    price: 45,
    category: "firin",
    image: "/products/peynirli-pogaca.jpg",
  },
  {
    id: "zeytinli-pogaca",
    name: "Zeytinli Poğaça",
    description: "Siyah zeytinli, parlak kabuklu poğaça.",
    price: 40,
    category: "firin",
    image: "/products/zeytinli-pogaca.jpg",
  },
  {
    id: "simitci-tost",
    name: "Simitçi'nin Tostu",
    description: "Susamlı ekmekte kaşar ve dana sucuk. Yanında patates.",
    price: 220,
    category: "sokak",
    image: "/products/simitci-tost.jpg",
  },
  {
    id: "bazlama-tost",
    name: "Kaşarlı Bazlama Tost",
    description: "Bazlama ekmeğinde bol kaşar, yanında kızarmış patates.",
    price: 250,
    category: "sokak",
    image: "/products/bazlama-tost.jpg",
  },
  {
    id: "ayvalik-tost",
    name: "Ayvalık Tost",
    description: "Kaşar, sucuk, sosis, turşu ve salata.",
    price: 240,
    category: "sokak",
    image: "/products/ayvalik-tost.jpg",
  },
  {
    id: "tepsi-manti",
    name: "Kayseri Tepsi Mantısı",
    description: "Yoğurt ve tereyağlı sosla tepsi mantı.",
    price: 240,
    category: "ana",
    image: "/products/tepsi-manti.jpg",
  },
  {
    id: "citir-manti",
    name: "Kızarmış Çıtır Mantı",
    description: "Dışı kızarmış mantı, sarımsaklı yoğurt ile.",
    price: 250,
    category: "ana",
    image: "/products/tepsi-manti.jpg",
  },
  {
    id: "cheesecake",
    name: "Frambuazlı Cheesecake",
    description: "Frambuaz soslu cheesecake dilimi.",
    price: 160,
    category: "tatli",
    image: "/products/cheesecake.jpg",
  },
  {
    id: "baklava",
    name: "Cevizli Baklava",
    description: "Cevizli, şerbetli baklava.",
    price: 140,
    category: "tatli",
    image: "/products/baklava.jpg",
  },
  {
    id: "cay",
    name: "Çay",
    description: "İnce belli bardakta demleme çay.",
    price: 25,
    category: "icecek",
    image: "/products/cay.jpg",
  },
  {
    id: "turk-kahvesi",
    name: "Türk Kahvesi",
    description: "Köpüklü Türk kahvesi, yanında su.",
    price: 70,
    category: "icecek",
    image: "/products/turk-kahvesi.jpg",
  },
  {
    id: "limonata",
    name: "Limonata",
    description: "Taze limon, nane ve buz.",
    price: 65,
    category: "icecek",
    image: "/products/limonata.jpg",
  },
  {
    id: "ayran",
    name: "Ayran",
    description: "Soğuk, köpüklü ayran.",
    price: 35,
    category: "icecek",
    image: "/products/ayran.jpg",
  },
  {
    id: "klasik-kahvalti",
    name: "Klasik Kahvaltı Tabağı",
    description: "Peynir, zeytin, domates, salatalık ve bal.",
    price: 280,
    category: "kahvalti",
    image: "/products/kahvalti.jpg",
  },
  {
    id: "simitci-kahvalti",
    name: "Simitçinin Kahvaltı Tabağı",
    description: "Sıcak simit eşliğinde serpme kahvaltı.",
    price: 340,
    category: "kahvalti",
    image: "/products/hero-bakery.jpg",
  },
];

export function formatPrice(value: number) {
  return `₺${value}`;
}

export function productsIn(category: CategoryId) {
  return products.filter((product) => product.category === category);
}
