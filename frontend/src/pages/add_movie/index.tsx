import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const AddMovie = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack h="90vh">
      <Stack>
        <Text> Filmy dodane przez ciebie </Text>
      </Stack>

      <Button
        onClick={onOpen}
        bg="#deb522"
        w="100px"
        fontSize="14px"
        _hover={{ bg: "#e5c44e" }}
        justifySelf="flex-start"
        alignSelf="flex-end"
        mt={5}
        mr={5}
      >
        Dodaj film
      </Button>
      <AddMovieModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

const AddMovieModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie nowego filmu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired={true}>
            <FormLabel>Tytuł</FormLabel>
            <Input
              placeholder="Tytuł"
              _placeholder={{ color: "#626262" }}
              mb={5}
            />
            <FormLabel>Reżyser</FormLabel>
            <Input
              placeholder="Reżyser"
              _placeholder={{ color: "#626262" }}
              mb={5}
            />
            <FormLabel>Rok produkcji</FormLabel>
            <Select
              placeholder="2023"
              _placeholder={{ color: "#626262" }}
              mb={5}
            >
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </Select>
            <FormLabel>Aktorzy</FormLabel>
            <Select
              placeholder="Leonardo DiCaprio"
              _placeholder={{ color: "#626262" }}
              mb={5}
            >
              <option value="Keanu Reeves">Keanu Reeves</option>
              <option value="Ryan Gosling">Ryan Gosling</option>
              <option value="Margot Robbie">Margot Robbie</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Button
            bg="#deb522"
            fontSize="14px"
            _hover={{ bg: "#e5c44e" }}
            mr={3}
            onClick={onClose}
            w="50%"
          >
            Zatwierdź
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddMovie;
