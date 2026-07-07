export interface GalleryItem {
  src: string;
  caption?: string;
  category?: "men" | "women" | "kids" | "color";
}

export const galleryImages: GalleryItem[] = [
  // Customer hair photos
  { src: "/images/customers/476237842_1045473420927395_8834375606442426673_n.jpg", category: "women" },
  { src: "/images/customers/476236990_1046162377525166_4707251329725601584_n.jpg", category: "women" },
  { src: "/images/customers/476610977_1046162517525152_861853454996391586_n.jpg", category: "women" },
  { src: "/images/customers/476632197_1046182027523201_1048182386472948843_n.jpg", category: "women" },
  { src: "/images/customers/476369756_1046182077523196_3927973506363334038_n.jpg", category: "women" },
  { src: "/images/customers/476897030_1048446403963430_2463695709518587982_n.jpg", category: "color" },
  { src: "/images/customers/477666876_1048446247296779_8377615888456054520_n.jpg", category: "color" },
  { src: "/images/customers/480491336_1056483186493085_2552572810878213550_n.jpg", category: "women" },
  { src: "/images/customers/480739881_1057540516387352_6525606500274533202_n.jpg", category: "women" },
  { src: "/images/customers/481279074_1057905749684162_4781335830922012171_n.jpg", category: "women" },
  { src: "/images/customers/481894905_1057549956386408_3746345952590348981_n.jpg", category: "women" },
  { src: "/images/customers/475475762_1038656748275729_3212428623091902059_n.jpg", category: "men" },
  { src: "/images/customers/475637329_1039417934866277_3420658210352386798_n.jpg", category: "women" },
  { src: "/images/customers/480774224_1057071073100963_9056836514078842639_n.jpg", category: "women" },
  { src: "/images/customers/480802042_1056653279809409_8673230494094379246_n.jpg", category: "women" },
  { src: "/images/customers/480769203_1057738236367580_4150948342163781754_n.jpg", category: "color" },
  { src: "/images/customers/480912794_1057059436435460_4926067644831051470_n.jpg", category: "women" },
  { src: "/images/customers/481238066_1056639626477441_763329725752757945_n.jpg", category: "women" },
  { src: "/images/customers/481513644_1062493989225338_6311318188818570079_n.jpg", category: "women" },
  { src: "/images/customers/480847622_1057765943031476_5638206964119105967_n.jpg", category: "women" },
  { src: "/images/customers/480783903_1058859172922153_1766001837899945471_n.jpg", category: "women" },
  { src: "/images/customers/482218217_1069059615235442_3305652582426792622_n.jpg", category: "women" },
  { src: "/images/customers/483576922_1069018955239508_4534160889985523475_n.jpg", category: "color" },
  { src: "/images/customers/483851655_1069018911906179_3218877735368579647_n.jpg", category: "women" },
  { src: "/images/customers/483861957_1068750188599718_1259773664436719158_n.jpg", category: "color" },
  { src: "/images/customers/483935659_1068750121933058_2503745224542178906_n.jpg", category: "color" },
  { src: "/images/customers/473379901_1028324962642241_2976058759589296387_n.jpg", category: "kids" },
  { src: "/images/customers/474726211_1035562098585194_3419770575149101101_n.jpg", category: "kids" },
  { src: "/images/customers/473419641_1030673519074052_5151281413169423935_n.jpg", category: "women" },
  { src: "/images/customers/473632133_1028821599259244_3500688773119286952_n.jpg", category: "women" },
  { src: "/images/customers/473668856_1030673779074026_6698535404564050498_n.jpg", category: "women" },
  { src: "/images/customers/473712710_1030673802407357_4448738809955792870_n.jpg", category: "women" },
  { src: "/images/customers/474912796_1037011115106959_2672476932834645300_n.jpg", category: "women" },
  { src: "/images/customers/475146353_1037526615055409_8170449630939067815_n.jpg", category: "color" },
  { src: "/images/customers/475187488_1037011568440247_8537626735488276608_n.jpg", category: "women" },
  { src: "/images/customers/475229912_1036778531796884_2349959114177255244_n.jpg", category: "women" },
  { src: "/images/customers/475310427_1038961378245266_3416694540198482240_n.jpg", category: "women" },
  // Shop photos
  { src: "/images/shop/shop-0.webp", category: "women" },
  { src: "/images/shop/shop-1.webp", category: "women" },
  { src: "/images/shop/shop-2.webp", category: "women" },
  { src: "/images/shop/shop-3.webp", category: "women" },
  { src: "/images/shop/shop-4.webp", category: "women" },
  { src: "/images/shop/shop-5.webp", category: "women" },
  { src: "/images/shop/shop-6.webp", category: "women" },
  { src: "/images/shop/shop-7.webp", category: "women" },
  { src: "/images/shop/shop-8.webp", category: "women" },
  { src: "/images/shop/shop-9.webp", category: "women" },
];

export const galleryCategories = [
  { id: "all", labelKey: "gallery.filterAll" },
  { id: "men", labelKey: "gallery.filterMen" },
  { id: "women", labelKey: "gallery.filterWomen" },
  { id: "kids", labelKey: "gallery.filterKids" },
  { id: "color", labelKey: "gallery.filterColor" },
] as const;

/** Remove duplicate entries by src (rule #11 — always dedupe before render). */
export function dedupeBySrc(items: GalleryItem[]): GalleryItem[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.src)) return false;
    seen.add(i.src);
    return true;
  });
}

/**
 * Customer work only — excludes shop interior photos.
 * (Shop photos are tagged `women`, so we must filter by PATH PREFIX, not category — rule #2.)
 */
export const customerGalleryImages: GalleryItem[] = dedupeBySrc(
  galleryImages.filter((i) => !i.src.startsWith("/images/shop/"))
);

