import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import cardBaseImage from "~/assets/base-card-bg.png";
import { drawImageProp, loadImage, slugify, wrapText } from "./utils";
import dayjs from "dayjs";
import { useCardInfoStore } from "./stores/cardInfoStore";

export type CardCanvasRef = {
  onExport: () => void;
};

type CardCanvasProps = {
  onRef?: (ref: CardCanvasRef) => void;
};

type ImagesState = {
  base: HTMLImageElement | null;
  photo: HTMLImageElement | null;
};

const CardCanvas = ({ onRef }: CardCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardInfo = useCardInfoStore();
  const [images, setImages] = useState<ImagesState>({
    base: null,
    photo: null,
  });

  useEffect(() => {
    loadImage(cardBaseImage).then((img) => {
      setImages((i) => ({ ...i, base: img }));
    });
  }, []);

  useEffect(() => {
    const photoSrc = cardInfo.photo;
    if (!photoSrc) {
      return;
    }

    loadImage(photoSrc).then((img) => {
      setImages((i) => ({ ...i, photo: img }));
    });
  }, [cardInfo.photo]);

  const redraw = (drawWatermark: boolean = false) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || !images.base) {
      return;
    }

    canvas.width = images.base.width;
    canvas.height = images.base.height + (drawWatermark ? 12 : 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f3f3";
    ctx.fill();

    // Draw photo
    if (images.photo) {
      drawImageProp(ctx, images.photo, 640, 40, 172, 230);
    }

    // Draw base card image
    ctx.drawImage(images.base, 0, 0);

    ctx.fillStyle = "#111";
    ctx.font = "normal 24px Arial";

    // left col
    ctx.fillText(cardInfo.name, 190, 152);
    ctx.fillText(cardInfo.idNo, 190, 220);
    wrapText(ctx, cardInfo.accessLevel, 190, 290, 180, 28);

    // right col
    ctx.fillText(cardInfo.sex, 418, 152);
    ctx.fillText(dayjs(cardInfo.birthday).format("DD-MMM-YYYY"), 418, 220);
    ctx.fillText("One at time", 418, 290);

    // footer
    const expDate = dayjs().add(cardInfo.expYears, "year");
    ctx.fillText(dayjs(expDate).format("YYYYMMMDD").toUpperCase(), 320, 416);

    if (drawWatermark) {
      ctx.fillStyle = "#333";
      ctx.font = "normal 16px Arial";
      ctx.fillText(
        "Wanna join FBI watch list? s.id/loli-license",
        20,
        canvas.height - 8
      );
    }
  };

  useEffect(() => {
    redraw();
  }, [redraw, images, cardInfo]);

  const onExport = () => {
    if (!canvasRef.current) {
      return;
    }

    redraw(cardInfo.showWatermarkOnExport);

    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `loli_license_${slugify(cardInfo.name)}.png`;
      link.href = canvasRef.current!.toDataURL();
      link.click();
      redraw(false);
    }, 100);
  };

  useEffect(() => {
    if (onRef) {
      onRef({ onExport });
    }
  }, [onExport]);

  return (
    <Box
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      padding={3}
    >
      <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </Box>
  );
};

export default CardCanvas;
