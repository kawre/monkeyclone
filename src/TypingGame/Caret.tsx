/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  letter: Element;
  minusLetter: Element;
  focus: boolean;
  input: string;
  word: Element;
  words: string[];
  currentKey: string;
  isPlaying: boolean;
  current: number;
  overflowCurrent: string;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({
  focus,
  overflowCurrent,
  letter,
  currentKey,
  input,
  minusLetter,
  word,
  words,
  isPlaying,
  current,
}) => {
  const caretRef = useRef<HTMLDivElement>(null);
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // caret position
  useEffect(() => {
    if (input.length >= words[current].length) return caretOverflow();
    //
    if (input.length === 0) return caretFirstLetter();
    return caretCurrentLetter();
  }, [letter, minusLetter]);

  const caretFirstLetter = () => {
    if (!word) return;
    const position = word.getBoundingClientRect();
    caretAnimation(position.left);
    setCaret({ ...caret, top: position.top });
  };

  const caretCurrentLetter = () => {
    if (!letter) return;
    const position = letter.getBoundingClientRect();
    caretAnimation(position.left);
    setCaret({ ...caret, top: position.top });
  };

  const caretOverflow = () => {
    if (!word.lastElementChild) return;
    const position = word.lastElementChild.getBoundingClientRect();
    caretAnimation(position.right);
    setCaret({ ...caret, top: position.top });
  };

  // on load caret position
  useEffect(() => {
    if (!caretRef || !letter) return;

    const position = letter?.getBoundingClientRect();

    setCaret({ ...caret, top: position.top });

    if (caretRef.current?.classList.contains("onload-hidden"))
      caretRef.current?.classList.remove("onload-hidden");
  }, [caretRef.current]);

  // smooth caret animation
  const caretAnimation = (x: number): void => {
    caretRef.current?.animate(
      { left: `${x}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // caret flash animation on stop
  useEffect(() => {
    if (!isPlaying) return;
    caretRef.current?.classList.remove("caret-flash-animation");
    const timeout = setTimeout(
      () => caretRef.current?.classList.add("caret-flash-animation"),
      1500
    );

    return () => clearTimeout(timeout);
  }, [letter]);

  return (
    <Wrapper
      className={`caret-flash-animation onload-hidden ${focus ? "" : "hidden"}`}
      ref={caretRef}
      style={{ top: caret.top }}
    />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: fixed;
  width: 3px;
  background: ${colors.secondary};
  height: 32px;
  border-radius: 999px;

  &.caret-flash-animation {
    animation: caretFlash 1000ms infinite;
  }

  &.onload-hidden {
    display: none !important;
  }

  &.hidden {
    display: none !important;
  }

  @keyframes caretFlash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
