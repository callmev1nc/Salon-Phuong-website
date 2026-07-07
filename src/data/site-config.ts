export const siteConfig = {
  name: "Hair Salon Phuong",
  nameVi: "Hair Salon Phương",
  slogan: {
    en: "The surprising truth is that doing HAIR doesn't come from TALENT — it comes from PASSION",
    vi: "Có một điều bất ngờ là làm TÓC không đến từ NĂNG KHIẾU mà đến từ ĐAM MÊ",
  },
  phone: ["0909013878", "0903174157"],
  zalo: "0909013878",
  address: {
    full: "244 Vinh Vien, Phuong 4, District 10, Ho Chi Minh City",
    fullVi: "244 Vĩnh Viễn, Phường 4, Quận 10, TP. Hồ Chí Minh",
    short: "244 Vinh Vien, District 10",
  },
  hours: {
    weekdays: "8:00 AM – 8:30 PM",
    weekdaysVi: "8:00 – 20:30",
    note: "Mon – Sun",
    noteVi: "Thứ 2 – Chủ Nhật",
  },
  social: {
    facebook: "https://www.facebook.com/hairsalonphuongvinhvien/?locale=vi_VN",
    googleMaps:
      "https://www.google.com/maps?q=Hair+Salon+Ph%C6%B0%C6%A1ng+244+V%C4%A9nh+Vi%E1%BB%85n+Ph%C6%B0%E1%BB%9Dng+4+Qu%E1%BA%ADn+10",
    // TODO(owner): supply a real Google Place ID and switch this to
    // https://search.google.com/local/writereview?pid=<PLACE_ID>. Until then,
    // the "Write a Review" CTA safely points at the Maps listing.
    googleReview:
      "https://www.google.com/maps?q=Hair+Salon+Ph%C6%B0%C6%A1ng+244+V%C4%A9nh+Vi%E1%BB%85n+Ph%C6%B0%E1%BB%9Dng+4+Qu%E1%BA%ADn+10",
  },
} as const;
