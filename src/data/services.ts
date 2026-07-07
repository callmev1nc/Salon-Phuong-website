export interface ServiceItem {
  id: string;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  items: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    id: "cut",
    items: [
      { id: "cutMen" },
      { id: "cutWomen" },
      { id: "cutKids" },
      { id: "cutStyle" },
    ],
  },
  {
    id: "wash",
    items: [
      { id: "washBasic" },
      { id: "washRelax" },
      { id: "washTreatment" },
    ],
  },
  {
    id: "perm",
    items: [
      { id: "permCurly" },
      { id: "permKorean" },
      { id: "permVolume" },
    ],
  },
  {
    id: "color",
    items: [
      { id: "colorNatural" },
      { id: "colorBalayage" },
      { id: "colorBleach" },
    ],
  },
  {
    id: "straighten",
    items: [
      { id: "straightRegular" },
      { id: "straightKeratin" },
    ],
  },
  {
    id: "other",
    items: [
      { id: "otherShave" },
      { id: "otherWax" },
      { id: "otherRepair" },
    ],
  },
];
