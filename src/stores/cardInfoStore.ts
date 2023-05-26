import dayjs from "dayjs";
import { create } from "zustand";
import placeholderPhoto from "~/assets/mahirussy.jpg";

type CardInfoState = {
  name: string;
  idNo: string;
  accessLevel: string;
  sex: string;
  birthday: string;
  photo: string;
  expYears: number;
  showWatermarkOnExport: boolean;
};

type CardInfoStoreType = CardInfoState & {
  setValues: (values: Partial<CardInfoState>) => void;
};

const getRandomAlphabet = (length: number = 1) => {
  let res = "";
  const alpha = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

  for (let i = 0; i < length; i++) {
    res += alpha.charAt(Math.round(Math.random() * alpha.length - 1));
  }

  return res;
};

const generateCardNumber = () => {
  return (
    getRandomAlphabet() +
    "-" +
    getRandomAlphabet(2) +
    Math.round(Math.random() * 9999)
      .toString()
      .padStart(4, "0")
  );
};

export const useCardInfoStore = create<CardInfoStoreType>((set) => ({
  name: "Mahiro Oyama",
  idNo: generateCardNumber(),
  accessLevel: "Headpats and hugs only",
  sex: "Male",
  birthday: dayjs().format("YYYY-MM-DD"),
  photo: placeholderPhoto,
  expYears: 5,
  showWatermarkOnExport: true,

  setValues: (values) => set({ ...values }),
}));
