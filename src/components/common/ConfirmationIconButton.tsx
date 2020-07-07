import React, { useRef, useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import styled from "styled-components";

const IconButtonForProgressIndicator = styled(IconButton)`
  svg:nth-child(1) {
    z-index: 1;
  }
  svg:nth-child(2) {
    z-index: 2;
  }
`;

const SVG_VIRTUAL_SIZE = 100;
const PROGRESS_CIRCLE_STROKE_WIDTH = 8;
const circleLength =
  (SVG_VIRTUAL_SIZE - PROGRESS_CIRCLE_STROKE_WIDTH) * Math.PI;

const ProgressBackgroundContainer = styled.svg`
  width: 2em;
  height: 2em;
  position: absolute;
  transform: rotate(-90deg);
`;

const ProgressBackgroundCircle = styled.circle<{
  color: string;
  progress: number;
  r: number;
}>`
  fill: transparent;
  stroke: ${({ color }): string => color};
  stroke-width: ${PROGRESS_CIRCLE_STROKE_WIDTH}px;
  stroke-dasharray: ${({ progress }): number => (progress / 100) * circleLength}
    ${circleLength};
`;

interface ConfirmationIconButtonProps {
  onConfirmed: () => void;
  color: string;
  label: string;
  disabled?: boolean;
}

const ConfirmationIconButton: React.FC<ConfirmationIconButtonProps> = ({
  onConfirmed,
  color,
  children,
  label,
  disabled
}) => {
  const [progress, setProgress] = useState(0);
  const animationInterval = useRef<number>();
  const startConfirmation = (): void => {
    let currentProgress = 0;
    animationInterval.current = setInterval(() => {
      if (currentProgress > 100) {
        onConfirmed();
        clearInterval(animationInterval.current);
        animationInterval.current = null;
        setProgress(0);
        return;
      }
      setProgress(currentProgress);
      currentProgress += 1;
    }, 10);
  };
  const abortConfirmation = (): void => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
    setProgress(0);
  };

  return (
    <Tooltip title={label}>
      <span>
        <IconButtonForProgressIndicator
          aria-label={label}
          onMouseDown={startConfirmation}
          onMouseUp={abortConfirmation}
          disabled={disabled}
        >
          <ProgressBackgroundContainer
            viewBox={`0 0 ${SVG_VIRTUAL_SIZE} ${SVG_VIRTUAL_SIZE}`}
          >
            <ProgressBackgroundCircle
              r={(SVG_VIRTUAL_SIZE - PROGRESS_CIRCLE_STROKE_WIDTH) / 2}
              cx={SVG_VIRTUAL_SIZE / 2}
              cy={SVG_VIRTUAL_SIZE / 2}
              color={color}
              progress={progress}
            />
          </ProgressBackgroundContainer>
          {children}
        </IconButtonForProgressIndicator>
      </span>
    </Tooltip>
  );
};

export default ConfirmationIconButton;
