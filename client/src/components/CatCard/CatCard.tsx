import React, { memo, useCallback, useState } from "react";
import { useCatCardStyles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { MiceSection } from "../MiceSection";
import classNames from "classnames";
import type { ICat } from "../../context/CatContext";

interface ICatCardProps {
  cat: ICat;
  onDeleteCat: (id: number) => void;
}

const HIDE_MICE_SECTION_BUTTON_TEXT = "Hide Mice";
const SHOW_MICE_SECTION_BUTTON_TEXT = "Show Mice";

export const CatCard: React.FC<ICatCardProps> = memo(({ cat, onDeleteCat }) => {
  const { id, firstName, lastName, description, image } = cat;
  const fullName = `${firstName} ${lastName}`;
  const [showMiceSection, setShowMiceSection] = useState(false);
  const classes = useCatCardStyles();

  const handleDelete = useCallback(async () => {
    await onDeleteCat(id);
  }, [id, onDeleteCat]);

  const toggleMiceSection = useCallback(() => {
    setShowMiceSection((prev) => !prev);
  }, []);

  return (
    <div className={classes.cardContainer}>
      <div
        className={classNames(classes.cardBody, {
          [classes.noBottomRadius]: showMiceSection,
        })}
      >
        <img src={image} alt={fullName} className={classes.image} />
        <div className={classes.details}>
          <h2 className={classes.name}>{fullName}</h2>
          <p className={classes.description}>{description}</p>
        </div>
        <div className={classes.actions}>
          <Button className={classes.miceButton} onClick={toggleMiceSection}>
            {showMiceSection
              ? HIDE_MICE_SECTION_BUTTON_TEXT
              : SHOW_MICE_SECTION_BUTTON_TEXT}
            <FontAwesomeIcon
              icon={showMiceSection ? faChevronUp : faChevronDown}
              className={classes.chevron}
            />
          </Button>
          <Button className={classes.deleteButton} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      {showMiceSection && <MiceSection catId={id} />}
    </div>
  );
});
