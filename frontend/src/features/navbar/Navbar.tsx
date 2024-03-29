import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { LoginModal, SignInModal } from "./LoginModals";
import { SearchModal } from "./SearchModal";
import { useAtom, useAtomValue } from "jotai";
import { loginAtom } from "./atoms/loginAtom";

export const WithSubnavigation = () => {
  const { isOpen, onToggle } = useDisclosure();

  const [loginValue, setLoginValue] = useAtom(loginAtom);

  const toggleValue = () => {
    setLoginValue((prevValue) => !prevValue);
  };

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSearchModal,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  const {
    isOpen: isOpenSignInModal,
    onOpen: onOpenSignInModal,
    onClose: onCloseSignInModal,
  } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("#deb522", "#b2911b")}
        color={useColorModeValue("black", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"space-between"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          // flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          // maxW="300px"
        >
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex bg="white" borderRadius="4px" flexGrow="0.4">
          <Button
            w="100%"
            alignContent="flex-start"
            justifyContent="flex-start"
            onClick={onOpenSearchModal}
          >
            <Search2Icon color="#deb522" mr="10px" />
            <Text bg="white" fontWeight={500}>
              Wyszukaj filmy
            </Text>
          </Button>
        </Flex>
        <SearchModal onClose={onCloseSearchModal} isOpen={isOpenSearchModal} />
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {loginValue ? (
            <Popover>
              <PopoverTrigger>
                <Avatar
                  src="https://lukasz.langa.pl/a01d8a5d-3631-4c5b-8b68-a4750d4d0b84/assets/bateman.jpg"
                  w="40px"
                  h="40px"
                  cursor="pointer"
                />
              </PopoverTrigger>
              <PopoverContent
                w="100px"
                border={0}
                _focus={{ boxShadow: "xl" }}
                boxShadow="xl"
              >
                <PopoverArrow />
                <PopoverBody
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={700}
                    color="#342a08"
                    variant={"link"}
                    onClick={toggleValue}
                    cursor="pointer"
                  >
                    Wyloguj
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={700}
                color="#342a08"
                variant={"link"}
                onClick={onOpenLoginModal}
              >
                Zaloguj się
              </Button>
              <LoginModal
                onClose={onCloseLoginModal}
                isOpen={isOpenLoginModal}
              />
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"black"}
                bg={"white"}
                onClick={onOpenSignInModal}
                _hover={{
                  bg: "gray",
                }}
              >
                Zarejestruj się
              </Button>
              <SignInModal
                onClose={onCloseSignInModal}
                isOpen={isOpenSignInModal}
                onClick={() => {
                  onOpenLoginModal();
                  onCloseSignInModal();
                }}
              />
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  const isLoggedIn = useAtomValue(loginAtom);
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem, index) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={700}
                color={"#342a08"}
                _hover={{
                  textDecoration: "underline",
                  color: linkHoverColor,
                }}
                display={index > 0 && !isLoggedIn ? "none" : ""}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as={"a"}
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("#fcf8e9", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "#9b7f18" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"#9b7f18"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? ""}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  visibility?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Strona Główna",
    href: "/",
    // visibility: true,
  },
  {
    label: "Filmy",
    // visibility: true,

    children: [
      {
        label: "Dodaj nowy film",
        subLabel: "Zrób to, zanim ktoś inny go doda!",
        href: "/add_movie",
      },
      {
        label: "Przeglądarka filmów",
        subLabel: "Zobacz wszystkie dostępne filmy!",
        href: "/all",
      },
    ],
    href: "/all",
  },
  {
    label: "Moje Listy",
    // visibility: useAtomValue(,
    href: "/my_list",
    children: [
      {
        label: "Stwórz listę",
        subLabel: "Stwórz swoje listy filmowe!",
        href: "/create_list",
      },
      {
        label: "Moje listy",
        subLabel: "Zobacz swoje listy filmowe",
        href: "/my_list",
      },
    ],
  },
];
