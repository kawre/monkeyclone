import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataType, useData } from "../../contexts/DataContext";
import KeycapButton from "./KeycapButton";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../Global";
import { GiArrowCursor } from "react-icons/gi";
// Types -------------------------------------------------------------------------

interface Props {
  rows: DataType["rows"];
}

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const [rows, setRows] = useState<Props["rows"]>();
  const { getLayout } = useData();
  const [focus, setFocus] = useState<boolean>(true);
  console.log(focus);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLayout();
        setRows({
          numbersRow: response?.numbersRow!,
          topRow: response?.topRow!,
          middleRow: response?.middleRow!,
          bottomRow: response?.bottomRow!,
        });
      } catch {
        console.log("error");
      }
    };

    fetchData();
  }, [getLayout]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      {!focus && (
        <FocusAlert>
          <GiArrowCursor />
          Click or press any key to focus
        </FocusAlert>
      )}
      <RowsWrapper className={focus ? "" : "focus-alert"}>
        <InputHandler
          autoFocus
          value={""}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={inputChangeHandler}
        />
        <NumbersRow>
          {/* {rows?.numbersRow.map((res: string) => {
            const key = res.toUpperCase();

            return <KeycapButton key={uuidv4()}>{key}</KeycapButton>;
          })} */}
        </NumbersRow>
        <TopRow>
          {rows?.topRow.map((res: string) => {
            const key = res.toUpperCase();

            return <KeycapButton key={uuidv4()}>{key}</KeycapButton>;
          })}
        </TopRow>
        <MiddleRow>
          {rows?.middleRow.map((res: string) => {
            const key = res.toUpperCase();

            return <KeycapButton key={uuidv4()}>{key}</KeycapButton>;
          })}
        </MiddleRow>
        <BottomRow>
          {rows?.bottomRow.map((res: string) => {
            const key = res.toUpperCase();

            return <KeycapButton key={uuidv4()}>{key}</KeycapButton>;
          })}
        </BottomRow>
      </RowsWrapper>
    </Wrapper>
  );
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowsWrapper = styled.div`
  width: 800px;
  height: fit-content;
  margin: auto;
  position: relative;

  &.focus-alert {
    transition: 200ms ease;
    opacity: 0.5;
    filter: blur(3px);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const NumbersRow = Row;

const TopRow = Row;

const MiddleRow = Row;

const BottomRow = Row;

const InputHandler = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: default;
  color: transparent;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

const FocusAlert = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  color: ${colors.text};
  pointer-events: none;
  text-shadow: 0 0 6px black;
  font-size: 20px;
  font-weight: 500;

  svg {
    margin-right: 5px;
  }
`;