import { Link, useLocation } from "react-router-dom";
import { useSidebarStyles } from "./styles";
import React from "react";
import classNames from "classnames";

export const Sidebar = React.memo(() => {
  const classes = useSidebarStyles();
  const location = useLocation();

  return (
    <div className={classes.sidebar}>
      <h2 className={classes.title}>Cats App</h2>
      <div className={classes.navList}>
        <div
          className={classNames(classes.navItem, {
            [classes.active]: location.pathname === "/",
          })}
        >
          <Link to="/" className={classes.link}>
            All Cats
          </Link>
        </div>
        <div
          className={classNames(classes.navItem, {
            [classes.active]: location.pathname === "/create",
          })}
        >
          <Link to="/create" className={classes.link}>
            Create Cat
          </Link>
        </div>
      </div>
    </div>
  );
});
