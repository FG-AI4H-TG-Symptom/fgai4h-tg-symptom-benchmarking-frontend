import React from "react";

import { Tooltip } from "@material-ui/core";
import {
  Check as StatusGoodIcon,
  Clear as StatusBadIcon,
  HourglassEmpty as TimeoutIcon,
  HelpOutline as UnknownIcon,
} from "@material-ui/icons";

enum AiImplementationHealth {
  OK = "ok",
  BAD_RESPONSE = "bad response",
  TIMEOUT = "timeout",
}

const AiImplementationHealthComponent: React.FC<{
  health;
}> = ({ health }) => {
  switch (health) {
    case AiImplementationHealth.OK:
      return (
        <Tooltip title="Okay">
          <StatusGoodIcon />
        </Tooltip>
      );
    case AiImplementationHealth.BAD_RESPONSE:
      return (
        <Tooltip title="Bad response / errored">
          <StatusBadIcon />
        </Tooltip>
      );
    case AiImplementationHealth.TIMEOUT:
      return (
        <Tooltip title="Offline / timeout">
          <TimeoutIcon />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Unknown status">
          <UnknownIcon />
        </Tooltip>
      );
  }
};

export default AiImplementationHealthComponent;
