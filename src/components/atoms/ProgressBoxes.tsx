import React, { useState } from 'react';
import styled from 'styled-components'
import useDimensions from 'react-cool-dimensions';

import {
  IoCheckboxSharp,
  IoSquare,
  IoSquareOutline,
} from 'react-icons/io5'

interface Props {
  currentPage: number;
  totalPages: number;
}

const Boxes = styled.div`
  display: flex;
  justify-content: center;
  width: 100%
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%
`

function ProgressBoxes({
  currentPage,
  totalPages
} : Props) {
  const [iconSize, setIconSize] = useState(24)
  const [shouldDivide, setShouldDivide] = useState(false)
  const divideIdx = Math.ceil(totalPages / 2)


  const { ref } = useDimensions<HTMLDivElement>({
    onResize: ({ width }) => {
      console.log(width)
      if (width / totalPages > 24) {
        setIconSize(24)
        setShouldDivide(false)
      } else {
        setIconSize(20)
        setShouldDivide(true)
      }
    },
  });

  const icons = Array.from(Array(totalPages).keys()).map(idx => {
    return idx < currentPage
      ? IoCheckboxSharp
      : idx === currentPage
        ? IoSquare
        : IoSquareOutline
  }).map(Icon => <Icon size={iconSize} />)

  return (
    <Rows ref={ref}>
      {shouldDivide && (
        <>
          <Boxes>{icons.slice(0, divideIdx)}</Boxes>
          <Boxes>{icons.slice(divideIdx)}</Boxes>
        </>
      )}
      {!shouldDivide && (
        <Boxes>{icons}</Boxes>
      )}
    </Rows>
  )
}

export default ProgressBoxes