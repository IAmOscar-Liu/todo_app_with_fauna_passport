import { Box, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavItemProps {
  icon?: JSX.Element;
  label: string;
  href: string;
}

const DesktopNavItem = ({ icon, label, href }: NavItemProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    // router.push(href);
    router.push(href);
  };

  return (
    <HStack
      as="a"
      href={href}
      onClick={handleClick}
      spacing="2"
      px="3"
      py="2"
      rounded="md"
      //transitions={'all 0.2s'}
      transitionProperty="all"
      transitionDuration="0.2s"
      color="white"
      _hover={{
        bg: "whiteAlpha.200",
      }}
    >
      {icon && (
        <Box aria-hidden fontSize="md">
          {icon}
        </Box>
      )}
      <Box fontWeight="semibold">{label}</Box>
    </HStack>
  );
};

const MobileNavItem = ({ label, href }: NavItemProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <Box
      as="a"
      display="block"
      href={href}
      onClick={handleClick}
      px="3"
      py="3"
      rounded="md"
      fontWeight="semibold"
    >
      {label}
    </Box>
  );
};

export const NavItem = {
  Desktop: DesktopNavItem,
  Mobile: MobileNavItem,
};
