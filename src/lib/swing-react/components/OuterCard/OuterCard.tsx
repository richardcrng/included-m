import React, { PropsWithChildren } from 'react';
import styled from 'styled-components'

const StyledLi = styled.li`
  list-style: none;
  grid-column-start: 0;
  grid-column-end: 1;
  grid-row-start: 0;
  grid-row-end: 1;
  box-sizing: border-box;
  cursor: default;

  &:nth-last-child(2) {
    top: 4px;
    transform: translate(-4px, -2px) rotate(-1deg);
  }

  &:last-child {
    top: 2px;
    transform: translate(2px, 2px) rotate(0.4deg);
  }
`

interface Props {
  className?: string,
  style?: React.CSSProperties
}

const OuterCard = React.forwardRef<HTMLLIElement, PropsWithChildren<{}>>(
  function OuterCard({
    children,
    className,
    style
  }: PropsWithChildren<Props>, ref) {

    return (
      <StyledLi ref={ref} {...{ className, style }}>
        {children}
      </StyledLi>
    );
  }
)

export default OuterCard;