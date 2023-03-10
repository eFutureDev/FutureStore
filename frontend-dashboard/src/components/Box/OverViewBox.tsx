import React from "react"
import cx from "classnames"
import { Box, useMediaQuery } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import * as Theme from "Data/User/Theme"

import { useUserTheme } from "state/user/hooks"

import ICO_Info_light from "assets/svg/info_light.svg"
import ICO_Info_dark from "assets/svg/info_dark.svg"

const useStyles = makeStyles(({ palette }) => ({
  self: {
    margin: "10px",
  },
  bg: {
    width: "100%",
    position: "relative",
    background: palette.info.main,
    borderRadius: "10px",
    height: 100,
  },
  leftBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    height: "100%",
    background: palette.info.dark,
    borderRadius: "10px",
    fontFamily: "auto",
  },
  info: {
    position: "absolute",
    top: 3,
    right: 10,
  },
  display: {
    "padding": "12px 0px 10px 30px",

    "& p:first-child": {
      fontWeight: 300,
      fontStyle: "normal",
      fontSize: "11px",
      lineHeight: "13px",
      color: palette.text.hint,
      whiteSpace: "pre-line",
    },
    "& p:last-child": {
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "18px",
      color: palette.text.secondary,
      fontFamily: "Museo Sans",
    },
  },
}))

export interface OverViewBoxProps {
  label: string
  content: any
  info?: string
}

const OverViewBox: React.FC<OverViewBoxProps> = ({ label, content, info }) => {
  const { breakpoints } = useTheme()
  const userTheme: Theme.Theme = useUserTheme()
  const mobile = useMediaQuery(breakpoints.down("xs"))
  const isDarkTheme: boolean = Theme.Eq.equals(userTheme, Theme.Theme.Dark)
  const classes = useStyles({ dark: isDarkTheme, mobile })

  return (
    <Box className={cx(classes.self)}>
      <Box
        className={cx(classes.bg)}
        style={
          isDarkTheme
            ? {
                boxShadow: "0px 4px 4px #E5E5E5",
              }
            : {
                boxShadow: "unset",
              }
        }
      >
        <Box className={cx(classes.leftBorder)}>&nbsp;&nbsp;</Box>
        <Box className={cx(classes.info)}>
          <img src={isDarkTheme ? ICO_Info_dark : ICO_Info_light} alt="" />
        </Box>

        <Box className={cx(classes.display)}>
          <Box component="p">{label}</Box>
          <Box component="p">{content}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OverViewBox
