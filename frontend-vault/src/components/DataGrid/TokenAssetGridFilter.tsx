import React from "react"
import { Box, MenuItem, Select, useMediaQuery } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import cx from "classnames"
import { useIsDarkMode } from "state/user/hooks"
import { BootstrapInput, SearchInput } from "components"

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0px",
  },
  typographyPrimary: {
    fontFamily: "Brandon Grotesque",
    fontStyle: "normal",
    fontWeight: 900,
  },
  typographySecondary: {
    fontFamily: "Museo Sans",
    fontStyle: "normal",
    fontWeight: 100,
  },
  filterType: {
    display: "flex",
  },
  filterItem: {
    "border": "1px solid transparent",
    "borderRadius": "20px",
    "fontSize": "16px",
    "lineHeight": "100%",
    "display": "flex",
    "alignItems": "center",
    "background": "transparent",
    "cursor": "pointer",
    "color": palette.primary.main,
    "padding": "5px 20px",
    "marginRight": "20px",

    "&.active": {
      background: palette.info.light,
      color: palette.common.white,
    },
    "&:hover": {
      border: `1px solid ${palette.primary.main}`,
    },
  },
  searchBox: {
    [breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}))

export enum FilterType {
  POPULAR = "Popular Assets",
  ALL = "All Assets",
  STABLECOINS = "Stablecoins",
  LP = "LP Token",
}

export interface FilterOption {
  filterType: FilterType
  keyword: string
}

export interface TokenAssetGridFilterProps {
  filterOption: FilterOption
  handleFilterChange: (filterOption: FilterOption) => void
}

const TokenAssetGridFilter: React.FC<TokenAssetGridFilterProps> = ({
  filterOption,
  handleFilterChange,
}) => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down("xs"))
  const classes = useStyles({ dark, mobile })
  const { filterType, keyword } = filterOption

  const hanldeFilterTypeChange = (type: FilterType) => {
    handleFilterChange({
      ...filterOption,
      filterType: type,
    })
  }

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange({
      ...filterOption,
      keyword: e.target.value,
    })
  }

  return (
    <Box className={cx(classes.root)} flexDirection={mobile ? "column" : "row"}>
      {!mobile && (
        <Box className={cx(classes.filterType)}>
          <Box
            className={cx(classes.typographyPrimary, classes.filterItem, {
              active: filterType === FilterType.POPULAR,
            })}
            onClick={() => hanldeFilterTypeChange(FilterType.POPULAR)}
          >
            {FilterType.POPULAR}
          </Box>
          <Box
            className={cx(classes.typographyPrimary, classes.filterItem, {
              active: filterType === FilterType.ALL,
            })}
            onClick={() => hanldeFilterTypeChange(FilterType.ALL)}
          >
            {FilterType.ALL}
          </Box>
          <Box
            className={cx(classes.typographyPrimary, classes.filterItem, {
              active: filterType === FilterType.STABLECOINS,
            })}
            onClick={() => hanldeFilterTypeChange(FilterType.STABLECOINS)}
          >
            {FilterType.STABLECOINS}
          </Box>
          <Box
            className={cx(classes.typographyPrimary, classes.filterItem, {
              active: filterType === FilterType.LP,
            })}
            onClick={() => hanldeFilterTypeChange(FilterType.LP)}
          >
            {FilterType.LP}
          </Box>
        </Box>
      )}

      {mobile && (
        <Box mb="20px" width="100%">
          <Select
            labelId="Filter"
            id="Filter Select"
            value={filterOption.filterType}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              hanldeFilterTypeChange(event.target.value as FilterType)
            }}
            input={<BootstrapInput />}
          >
            <MenuItem value={FilterType.POPULAR}>{FilterType.POPULAR}</MenuItem>
            <MenuItem value={FilterType.ALL}>{FilterType.ALL}</MenuItem>
            <MenuItem value={FilterType.STABLECOINS}>
              {FilterType.STABLECOINS}
            </MenuItem>
            <MenuItem value={FilterType.LP}>{FilterType.LP}</MenuItem>
          </Select>
        </Box>
      )}

      <Box>
        <SearchInput
          value={keyword}
          onChange={handleFilterInputChange}
          className={cx(classes.searchBox)}
        />
      </Box>
    </Box>
  )
}

export default TokenAssetGridFilter
