import React, { useState } from "react";
import styled from "styled-components";
import useDimensions from "react-cool-dimensions";

import { FaSquare, FaCaretSquareRight, FaRegSquare } from "react-icons/fa";

interface Props {
  className?: string;
  currentPage: number;
  totalPages: number;
}

const Boxes = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const defaultWidth = 20;
let memoIconSize = defaultWidth;
let memoShouldDivide = false;

function ProgressBoxes({ className, currentPage, totalPages }: Props) {
  const maxIndex = totalPages;

  const [iconSize, setIconSize] = useState(memoIconSize);
  const [shouldDivide, setShouldDivide] = useState(memoShouldDivide);
  const divideIdx = Math.ceil(maxIndex / 2);

  const { ref } = useDimensions<HTMLDivElement>({
    onResize: ({ width }) => {
      if (width / maxIndex > defaultWidth) {
        setIconSize(defaultWidth);
        setShouldDivide(false);
        memoIconSize = defaultWidth;
        memoShouldDivide = false;
      } else {
        setIconSize(Math.abs(defaultWidth - 4));
        setShouldDivide(true);
        memoIconSize = Math.abs(memoIconSize - 4);
        memoShouldDivide = true;
      }
    },
  });

  const icons = Array.from(Array(maxIndex).keys())
    .map((idx) => {
      return idx < currentPage
        ? FaSquare
        : idx === currentPage
        ? FaCaretSquareRight
        : FaRegSquare;
    })
    .map((Icon, idx) => <Icon key={idx} size={iconSize} />);

  return (
    <Rows ref={ref} className={className}>
      {shouldDivide && (
        <>
          <Boxes>{icons.slice(0, divideIdx)}</Boxes>
          <Boxes>{icons.slice(divideIdx)}</Boxes>
        </>
      )}
      {!shouldDivide && <Boxes>{icons}</Boxes>}
    </Rows>
  );
}

export default ProgressBoxes;
