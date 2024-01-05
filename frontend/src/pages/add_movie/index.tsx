import { fetcher } from "@/providers/api/fetchers";
import { Actor, MovieData } from "@/providers/interfaces/movieDataTypes";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Select as ChakraSelect,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Select,
  OptionBase,
  ActionMeta,
  MultiValue,
} from "chakra-react-select";
import { useState } from "react";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const AddMovie = () => {
  const urlActors = `https://www.projektimdb.it/api/v1/actors`;

  const { data: actors, error: error2 } = useSWR<Actor[]>(urlActors, fetcher, {
    refreshInterval: 1000,
  });

  if (error2) return <div>Failed to fetch</div>;
  if (!actors) {
    return (
      <Stack h="80vh" justify="center">
        <Center>
          <Spinner />
        </Center>
      </Stack>
    );
  }

  const actorsArray = actors.map((actor) => {
    return {
      value: {
        firstName: actor.firstName,
        lastName: actor.lastName,
        actorId: actor.actorId,
      },
      label: actor.firstName + " " + actor.lastName,
    };
  }) as OptionBase[];
  console.log(actorsArray);
  return (
    <Stack align="center" mb="100px" mt="32px">
      <AddMovieBox actorsArray={actorsArray} />
    </Stack>
  );
};

interface AddMovieBoxProps {
  actorsArray: OptionBase[];
}

const AddMovieBox: React.FC<AddMovieBoxProps> = ({ actorsArray }) => {
  const {
    isOpen: isOpenActorModal,
    onOpen: onOpenActorModal,
    onClose: onCloseActorModal,
  } = useDisclosure();

  const urlMovies = `https://www.projektimdb.it/api/v1/movies`;
  const sendRequest = async (
    url: string,
    {
      arg,
    }: {
      arg: {
        title: string;
        director: string;
        description: string;
        productionYear: number;
        // actors: [{ actorId: number }];
        actors: { actorId: number; firstName: string; lastName: string }[];
        genre: string;
      };
    }
  ) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };
  const { trigger } = useSWRMutation(urlMovies, sendRequest);
  const toast = useToast();

  const [inputs, setInputs] = useState({
    title: "",
    director: "",
    genre: "Komedia",
    productionYear: 2024,
    // actors: [],
    description: "",
  });
  console.log(inputs);
  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { target: { value: string | number } },
    inputName: string
  ) => {
    setInputs((prevInputs) => ({ ...prevInputs, [inputName]: e.target.value }));
  };

  const [actorSelectValue, setActorSelectValue] = useState<OptionBase[]>([]);

  const handleSelectChange = (selectedOptions: MultiValue<OptionBase>) => {
    const selectedOptionsArray: OptionBase[] = [...selectedOptions];
    setActorSelectValue(selectedOptionsArray);
  };
  // console.log(actorSelectValue);
  const finalActors = actorSelectValue.map(
    (actor) =>
      //jak tak zrobicie w pracy to was wyrzucą, dlatego jeszcze ją mam
      //to też only last time in my life
      (
        actor as {
          value: { actorId: number; firstName: string; lastName: string };
        }
      ).value
  );
  // console.log({
  //   ...inputs,
  //   finalActors,
  // });
  const genres = [
    "Komedia",
    "Kryminał",
    "Dokument",
    "Thriller",
    "Akcja",
    "ScienceFiction",
    "Fabularny",
    "Dramat",
    "Horror",
    "Tragikomedia",
    "Komedia romantyczna",
  ];
  return (
    <>
      <Stack w="30%" spacing={5}>
        <FormControl isRequired={true}>
          <FormLabel>Tytuł</FormLabel>
          <Input
            placeholder="Tytuł"
            _placeholder={{ color: "#98947e" }}
            bg="#faf8ed"
            border={0}
            value={inputs.title}
            onChange={(e) => handleInputChange(e, "title")}
          />
        </FormControl>
        <FormControl isRequired={true}>
          <FormLabel>Reżyser</FormLabel>
          <Input
            placeholder="Reżyser"
            _placeholder={{ color: "#98947e" }}
            bg="#faf8ed"
            border={0}
            value={inputs.director}
            onChange={(e) => handleInputChange(e, "director")}
          />
        </FormControl>
        <FormControl isRequired={true}>
          <FormLabel>Gatunek</FormLabel>
          <ChakraSelect
            placeholder=""
            _placeholder={{ color: "#98947e" }}
            bg="#faf8ed"
            border={0}
            value={inputs.genre}
            onChange={(e) => handleInputChange(e, "genre")}
          >
            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </ChakraSelect>
        </FormControl>

        <FormControl isRequired={true}>
          <FormLabel>Rok produkcji</FormLabel>
          <NumberInput
            max={2030}
            min={1888}
            defaultValue={2024}
            bg="#faf8ed"
            value={inputs.productionYear}
            onChange={(value) =>
              handleInputChange({ target: { value } }, "productionYear")
            }
          >
            <NumberInputField border={0} />
            <NumberInputStepper>
              <NumberIncrementStepper border={0} />
              <NumberDecrementStepper border={0} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl isRequired={true}>
          <FormLabel>Aktorzy</FormLabel>
          <Select
            isMulti={true}
            useBasicStyles={true}
            options={actorsArray}
            value={actorSelectValue}
            onChange={handleSelectChange}
          />
          <Button
            variant="link"
            fontWeight={500}
            fontSize="14px"
            mt={2}
            onClick={onOpenActorModal}
          >
            Brak twojego aktora? Dodaj go!
          </Button>
          <AddActorModal
            isOpen={isOpenActorModal}
            onClose={onCloseActorModal}
          />
        </FormControl>

        <FormControl isRequired={true}>
          <FormLabel>Opis</FormLabel>

          <Textarea
            placeholder="Opis"
            _placeholder={{ color: "#98947e" }}
            bg="#faf8ed"
            border={0}
            minH="150px"
            value={inputs.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </FormControl>
      </Stack>
      <Button
        bg="#deb522"
        w="100px"
        fontSize="14px"
        color="white"
        _hover={{ bg: "white", color: "black" }}
        mt={5}
        mr={5}
        onClick={async () => {
          try {
            const result = await trigger(
              {
                title: inputs.title,
                director: inputs.director,
                description: inputs.description,
                productionYear: inputs.productionYear,
                // actors: [
                //   { actorId: 2, firstName: "Elease", lastName: "Morissette" },
                // ],
                actors: finalActors,
                // actors: [{ actorId: 2 }],
                genre: inputs.genre,
              },
              { revalidate: true }
            );

            // const result = await trigger({ ...inputs }, { revalidate: true });
            setActorSelectValue([]);
            setInputs({
              title: "",
              director: "",
              genre: "",
              productionYear: 2024,
              // actors: [],
              description: "",
            });

            toast({
              title: "Dodano film.",
              description: "Pomyślnie dodano film",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          } catch (e) {
            toast({
              title: "Błąd!",
              description: "Nie udało się dodać filmu.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        }}
      >
        Dodaj film
      </Button>
    </>
  );
};

const AddActorModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const urlActors = `https://www.projektimdb.it/api/v1/actors`;
  const sendRequest = async (
    url: string,
    { arg }: { arg: { firstName: string; lastName: string } }
  ) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };
  const { trigger } = useSWRMutation(urlActors, sendRequest);
  const toast = useToast();

  const [inputs, setInputs] = useState({ firstName: "", lastName: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setInputs((prevInputs) => ({ ...prevInputs, [inputName]: e.target.value }));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj aktora</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={6}
            px={6}
            align="center"
          >
            <FormControl isRequired={true}>
              <FormLabel>Imię</FormLabel>
              <Input
                placeholder="Imię"
                _placeholder={{ color: "#98947e" }}
                bg="#faf8ed"
                border={0}
                value={inputs.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Nazwisko</FormLabel>
              <Input
                placeholder="Nazwisko"
                _placeholder={{ color: "#98947e" }}
                bg="#faf8ed"
                border={0}
                value={inputs.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </FormControl>
            <Button
              bg="#deb522"
              w="150px"
              h="40px"
              fontSize="14px"
              color="white"
              _hover={{ bg: "white", color: "black" }}
              onClick={async () => {
                try {
                  if (inputs.firstName === "" || inputs.lastName === "") {
                    toast({
                      title: "Błąd!",
                      description: "Aktor musi mieć imię i nazwisko",
                      status: "error",
                      duration: 2000,
                      isClosable: true,
                    });

                    return;
                  }
                  const result = await trigger(
                    {
                      firstName: inputs.firstName,
                      lastName: inputs.lastName,
                    },
                    { revalidate: true }
                  );

                  onClose();
                  setInputs({ firstName: "", lastName: "" });
                  toast({
                    title: "Dodano komentarz.",
                    description: "Pomyślnie dodano aktora",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                } catch (e) {
                  toast({
                    title: "Błąd!",
                    description: "Nie udało się dodać aktora.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                }
              }}
            >
              Dodaj aktora
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddMovie;
