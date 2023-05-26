import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useCardInfoStore } from "./stores/cardInfoStore";
import { useRef } from "react";
import { fileToBase64 } from "./utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditDrawer = ({ isOpen, onClose }: Props) => {
  const cardInfo = useCardInfoStore();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const file = event.target.files[0];
    const data = await fileToBase64(file);
    cardInfo.setValues({ photo: data });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Card Detail</DrawerHeader>

        <DrawerBody>
          <VStack spacing={3} alignItems="stretch">
            <Button
              w="120px"
              h={40}
              bg="white"
              shadow="md"
              rounded="md"
              p={2}
              overflow="hidden"
              position="relative"
              onClick={() => photoInputRef.current?.click()}
            >
              <Image src={cardInfo.photo} w="full" h="full" objectFit="cover" />
              <Box
                position="absolute"
                top={1}
                right={1}
                color="gray.900"
                bg="whiteAlpha.800"
                p={1}
                rounded="md"
              >
                <MdEdit />
              </Box>
            </Button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{ display: "none" }}
            />

            <FormControl>
              <FormLabel>Agent Name</FormLabel>
              <Input
                value={cardInfo.name}
                onChange={(e) => cardInfo.setValues({ name: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>ID Number</FormLabel>
              <Input
                value={cardInfo.idNo}
                onChange={(e) => cardInfo.setValues({ idNo: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sex</FormLabel>
              <Input
                value={cardInfo.sex}
                onChange={(e) => cardInfo.setValues({ sex: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Birthday</FormLabel>
              <Input
                type="date"
                value={cardInfo.birthday}
                onChange={(e) =>
                  cardInfo.setValues({ birthday: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Access Level</FormLabel>
              <Input
                value={cardInfo.accessLevel}
                onChange={(e) =>
                  cardInfo.setValues({ accessLevel: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Expires in</FormLabel>
              <Select
                value={cardInfo.expYears.toString()}
                onChange={(e) =>
                  cardInfo.setValues({
                    expYears: parseInt(e.target.value, 10) || 1,
                  })
                }
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx} value={(idx + 1).toString()}>
                    {`${idx + 1} years`}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Checkbox
              isChecked={cardInfo.showWatermarkOnExport}
              onChange={(e) =>
                cardInfo.setValues({ showWatermarkOnExport: e.target.checked })
              }
            >
              Show Watermark on Export
            </Checkbox>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="blue" onClick={() => onClose()}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDrawer;
