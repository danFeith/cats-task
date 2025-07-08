import React, { memo } from "react";
import { useMiceListStyles } from "./styles";
import { List } from "immutable";
import { type IMouse } from "../../context/CatContext";

interface MiceListProps {
  mice: List<IMouse>;
}

const NO_MICE_MESSAGE = "No mice for this cat";

export const MiceList: React.FC<MiceListProps> = memo(({ mice }) => {
  const classes = useMiceListStyles();

  if (mice.count() === 0) {
    return <div className={classes.noMiceMessage}>{NO_MICE_MESSAGE}</div>;
  }

  return (
    <div className={classes.miceGrid}>
      {mice.map((mouse, index) => (
        <div key={index} className={classes.mouseItem}>
          🐭 {mouse.name}
        </div>
      ))}
    </div>
  );
});
