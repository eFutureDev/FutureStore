import React, { useState } from "react"
import {
  useMediaQuery,
  Box,
  Link,
  Drawer,
  IconButton,
  Container,
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import cx from "classnames"
import Hamburger from "hamburger-react"

import { useIsDarkMode } from "state/user/hooks"
import { Menus, NavInfoType } from "data"

import LOGO_White from "assets/logo_white.png"
import LOGO_Text from "assets/logo_text.png"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    background: "transparent",
    zIndex: 1,
  },
  self: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
  },
  logo: {
    "paddingLeft": "10px",
    "display": "flex",
    "alignItems": "center",
    "cursor": "pointer",
    "& img": {
      "padding": "20px 5px",
      "&:first-child": {
        width: "55px",
      },
      "&:last-child": {
        height: "55px",
      },
    },
  },
  drawer: {
    padding: "10px",
  },
  menuItem: {
    "fontFamily": "Museo Sans",
    "fontWeight": 700,
    "fontStyle": "normal",
    "lineHeight": "100%",
    "margin": "auto 20px",
    "padding": "8px 0px",
    "color": "white",
    "fontSize": "13px",
    "position": "relative",
    "textAlign": "center",
    "textTransform": "uppercase",
    "transition": "all .2s",
    "cursor": "pointer",

    "&:hover": {
      color: "#73D6F1",
    },

    "&.active": {
      "color": palette.secondary.main,
      "&::before": {
        content: "' '",
        position: "absolute",
        top: "100%",
        width: "100%",
        left: 0,
        height: "2.5px",
        borderRadius: "2px",
        background: "linear-gradient(90deg, #5F72FF 0%, #73D6F1 100%)",

        [breakpoints.down("xs")]: {
          display: "none",
        },
      },
    },
  },
}))

const HeaderSection: React.FC = () => {
  const { palette, breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down("xs"))
  const classes = useStyles({ dark, mobile })
  const history = useHistory()

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const toggleMenu = () => {
    setOpenMenu((prev: boolean) => !prev)
  }

  const activeMenu = (to: string): boolean => {
    return window.location.href.endsWith(to)
  }

  function handleNavigate(link: NavInfoType) {
    const { to, blank } = link
    if (blank) {
      window.open(to)
    } else {
      history.push(to)
    }
  }

  return (
    <Box className={cx(classes.root)}>
      <Container>
        <Box className={cx(classes.self)}>
          <Box className={cx(classes.logo)} onClick={() => history.push("/")}>
            <img src={LOGO_White} alt="logo" />
            <img src={LOGO_Text} alt="logo" />
          </Box>
          {!mobile && (
            <Box>
              {Menus.map((link, index) => {
                return (
                  <span
                    className={cx(classes.menuItem, {
                      active: activeMenu(link.to),
                    })}
                    key={index}
                    onClick={() => handleNavigate(link)}
                  >
                    {link.label}
                  </span>
                )
              })}
            </Box>
          )}
          {mobile && (
            <>
              <IconButton
                style={{ height: "48px", padding: 0 }}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Hamburger
                  size={24}
                  distance={"lg"}
                  color={palette.common.white}
                  toggled={openMenu}
                  toggle={setOpenMenu}
                />
              </IconButton>
              <Drawer
                className={cx(classes.drawer)}
                anchor={"top"}
                open={openMenu}
                onClose={toggleMenu}
              >
                {Menus.map((link, index) => (
                  <Link
                    key={index}
                    className={cx(classes.menuItem)}
                    href={link.to}
                    underline="none"
                    rel="noopener noreferrer"
                    target={link.blank ? "_blank" : "_self"}
                  >
                    {link.label}
                  </Link>
                ))}
              </Drawer>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HeaderSection
