import {
  Box,
  ChakraProvider,
  IconButton,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AppBar from "./components/AppBar";

import { MdSave, MdEdit } from "react-icons/md";
import EditDrawer from "./EditDrawer";
import CardCanvas, { CardCanvasRef } from "./CardCanvas";
import { useRef } from "react";

const App = () => {
  const cardCanvasRef = useRef<CardCanvasRef | null>(null);
  const editDrawer = useDisclosure();

  return (
    <ChakraProvider>
      <EditDrawer isOpen={editDrawer.isOpen} onClose={editDrawer.onClose} />

      <Box
        bg="gray.100"
        display="flex"
        flexDir="column"
        height="100vh"
        alignItems="stretch"
        overflow="hidden"
      >
        <AppBar
          title="My Loli License"
          actions={
            <>
              <IconButton
                size="lg"
                fontSize="xl"
                aria-label="Save"
                icon={<MdSave />}
                variant="ghost"
                onClick={() =>
                  cardCanvasRef.current && cardCanvasRef.current.onExport()
                }
              />
              <IconButton
                size="lg"
                fontSize="xl"
                aria-label="Edit"
                icon={<MdEdit />}
                variant="ghost"
                onClick={editDrawer.onOpen}
              />
            </>
          }
        />

        <CardCanvas
          onRef={(ref) => {
            cardCanvasRef.current = ref;
          }}
        />

        <Text textAlign="center" my={2}>
          Artwork by:{" "}
          <Link
            fontWeight="bold"
            href="https://www.artstation.com/artwork/14orKL"
          >
            FLying Cookie
          </Link>
          &nbsp; | Fork on&nbsp;
          <Link
            fontWeight="bold"
            href="https://github.com/khairul169/Loli-License.git"
          >
            Github
          </Link>
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default App;
