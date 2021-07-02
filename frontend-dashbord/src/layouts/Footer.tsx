import React from "react";
import { Box, useMediaQuery, Container, Link } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import cx from "classnames";

import { useIsDarkMode } from "state/user/hooks";

import LOGO_Ardana_hor from "assets/img/landing/logos/ardana-hor.svg";

const useStyles = makeStyles(({ palette }) => ({
  bg: {
    background: palette.primary.dark,
    marginTop: "50px",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  socialIconLink: {
    borderRadius: "50%",
    backgroundColor: "white",
    padding: "10px",
    marginRight: "20px",
    cursor: "pointer",
    color: "gray",
    textAlign: "center",
    transition: "background .2s",

    "& i": {
      width: "16px",
      height: "16px",
    },

    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
}));

const Footer: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.bg)}>
      <Container>
        <Box className={cx(classes.container)}>
          <Box>
            <img
              src={LOGO_Ardana_hor}
              alt="Ardana logo"
              style={{ maxWidth: "max-content" }}
            />
          </Box>
          <Box>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-medium"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className={cx(classes.socialIconLink)} href="#">
              <i className="fab fa-linkedin"></i>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
