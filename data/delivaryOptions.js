import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function findDelivaryOption(delivaryOptionId) {
  let matchingDelivaryOption = delivaryOptions[0];
  delivaryOptions.forEach((delivaryOption) => {
    if (delivaryOption.id === delivaryOptionId)
      matchingDelivaryOption = delivaryOption;
  });
  return matchingDelivaryOption || delivaryOptions[0];
}

export function createDelivaryDate(Days) {
  const today = dayjs();
  Days = Number(Days);
  if (today.format("dddd") === "Thursday" && Days === 3) Days += 2;
  if (today.format("dddd") === "Thursday" && Days === 7) Days += 4;
  if (today.format("dddd") === "Friday" && (Days === 1 || Days === 3))
    Days += 2;
  if (today.format("dddd") === "Friday" && Days === 7) Days += 4;
  if (today.format("dddd") === "Saturday" && (Days === 1 || Days === 3))
    Days += 1;
  if (today.format("dddd") === "Saturday" && Days === 7) Days += 3;

  let delivaryDate = today.add(Days, "days").format("dddd, MMMM D");
  return delivaryDate;
}

export const delivaryOptions = [
  {
    id: "1",
    delivaryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    delivaryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    delivaryDays: 1,
    priceCents: 999,
  },
];
