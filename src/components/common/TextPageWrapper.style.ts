import styled from 'styled-components';

export enum PageWidth {
  ULTRA_NARROW = 'ULTRA_NARROW',
  NARROW = 'NARROW',
  REGULAR = 'REGULAR',
  WIDE = 'WIDE',
}

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const pageWidthToRem = (width: PageWidth): number => {
  switch (width) {
    case PageWidth.ULTRA_NARROW:
      return 30;
    case PageWidth.NARROW:
      return 50;
    case PageWidth.WIDE:
      return 100;
    default:
      return 70;
  }
};
export const Centered = styled.div<{ pageWidth: PageWidth }>`
  width: 100%;
  max-width: ${({ pageWidth }): number => pageWidthToRem(pageWidth)}rem;
`;
