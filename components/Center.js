import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import tw, { styled } from "twin.macro";
import User from "../img/user.png";

const Container = tw.div`flex-grow text-white`;

const Header = tw.header`absolute top-5 right-5 p-1 pr-2 space-x-3 flex items-center bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full`;
const UserImg = tw.img`rounded-full w-6 h-6`;

const Section = styled.section`
  ${tw`flex items-end space-x-7  p-8 h-1/3 max-h-72`}
`;

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  const getColor = () => `hsl(${360 * Math.random()}, 100%, 50%)`;
  //   const getColor = () =>
  //     `hsl(${360 * Math.random()}, ${25 + 70 * Math.random()}%, ${
  //       75 + 10 * Math.random()
  //     }%)`;

  useEffect(() => {
    setColor(getColor());
  }, []);

  const styles = [
    tw`to-black bg-gradient-to-b`,
    {
      "--tw-gradient-from": color,
      "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to, ${color})`,
    },
  ];
  return (
    <Container>
      <Header>
        <UserImg
          src={
            session?.user?.image === undefined ? User.src : session?.user?.image
          }
          alt="User_Img"
        />
        <h2>{session?.user.name} </h2>
        <ChevronDownIcon tw="h-5 w-5" />
      </Header>
      <Section css={styles}>
        {/* <img src="" alt="" /> */}
        <h1>Hello</h1>
      </Section>
    </Container>
  );
};
export default Center;
