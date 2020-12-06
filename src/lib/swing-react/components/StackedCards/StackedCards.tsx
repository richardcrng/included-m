import React from 'react';
import styled from 'styled-components'

const Cards = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
`

interface StackedCardsProps {
  children?: React.ReactNode,
  className?: string,
  style?: React.CSSProperties
}

function StackedCards({
  children,
  ...rest
}: StackedCardsProps) {
  return (
    <Cards {...rest}>
      {children}
    </Cards>
  )
}

export default StackedCards