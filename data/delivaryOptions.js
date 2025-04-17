export function findDelivaryOption(delivaryOptionId) {
  let matchingDelivaryOption = "";
  delivaryOptions.forEach((delivaryOption) => {
    if (delivaryOption.id === delivaryOptionId)
      matchingDelivaryOption = delivaryOption;
  });
  return matchingDelivaryOption;
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
