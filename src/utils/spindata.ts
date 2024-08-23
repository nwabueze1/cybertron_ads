const data = [
  {
    label: "Try again",
    value: 1,
    question: "Try again",
  }, // padding
  {
    label: "2x Digital voucher",
    value: 2,
    question: "2x Digital voucher",
  }, //font-family
  {
    label: "2x Out of Hme Voucher",
    value: 3,
    question: "2x Out of Hme Voucher",
  }, //color
  {
    label: "Try again",
    value: 4,
    question: "Try again",
  }, // padding
  {
    label: "3x Bonus Voucher",
    value: 4,
    question: "3x Bonus Voucher",
  }, //font-weight
  {
    label: "2x OOH",
    value: 5,
    question: "2x OOH",
  }, //font-size
  {
    label: "3x Digital Voucher",
    value: 5,
    question: "3x Digital Voucher",
  }, //font-size
].map((c, index) => ({ ...c, value: index + 1 }));

const backgrounds = [
  "rgb(255, 127, 14)",
  "rgb(174, 199, 232)",
  "rgb(31, 119, 180)",
  "rgb(152, 223, 138)",
  "rgb(44, 160, 44)",
  "rgb(255, 187, 120)",
];

export const spinData = data.map((datum, index: number) => ({
  option: datum?.question,
  style: {
    backgroundColor: backgrounds[index],
  },
}));
