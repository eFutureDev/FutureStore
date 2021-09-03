import React, { useState } from 'react'
import { Box, Button, Container, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import cx from 'classnames'
import { useIsDarkMode } from 'state/user/hooks'
import { TokenAssetGrid, TokenAssetGridFilter } from 'components'
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams
} from '@material-ui/data-grid'
import {
  FilterOption,
  FilterType
} from 'components/DataGrid/TokenAssetGridFilter'

import COIN1 from 'assets/image/COIN1.png'

const rows = [
  {
    id: 0,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 2,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 17,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 2,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 18,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 1,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 19,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 3,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 10,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 1,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 10,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 20,
    minColl: 150,
    assetIcon: COIN1
  },
  {
    id: 10,
    asset: 'Wrapped Bitcoin',
    type: 'WBTC-A',
    dUSD: '29.36M',
    stabilityFee: 2,
    minColl: 150,
    assetIcon: COIN1
  }
]

export function SortedDescendingIcon () {
  return <KeyboardArrowDownIcon color='primary' />
}

export function SortedAscendingIcon () {
  return <KeyboardArrowUpIcon color='primary' />
}

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {},
  filter: {},
  assetList: {
    width: '100%'
  },
  openVault: {
    backgroundColor: palette.type === 'dark' ? '#5297BD' : '#1273CC',
    borderRadius: '100px',
    fontWeight: 900,
    fontSize: '20px',
    color: palette.common.white,
    padding: '10px 25px',
    minWidth: '150px',
    lineHeight: '100% !important'
  }
}))

const AssetSection: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const [filterOption, setFilterOption] = useState<FilterOption>({
    filterType: FilterType.POPULAR,
    keyword: ''
  })

  const columns: GridColDef[] = [
    {
      field: 'asset',
      headerName: 'Asset',
      sortable: false,
      flex: 2,
      renderCell: (params: GridCellParams) => {
        const assetIcon = params.getValue(params.id, 'assetIcon')
        return (
          <Box display='flex' alignItems='center'>
            <img src={assetIcon?.toString()} alt='' />
            <Box pl='15px'>{params.value}</Box>
          </Box>
        )
      }
    },
    {
      field: 'type',
      headerName: 'Type',
      sortable: false,
      flex: 1
    },
    {
      field: 'dUSD',
      headerName: 'dUSD Available',
      flex: 1
    },
    {
      field: 'stabilityFee',
      headerName: 'Stability Fee',
      type: 'number',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) =>
        Number(params.value).toFixed(2) + '%'
    },
    {
      field: 'minColl',
      headerName: 'Min Coll. Ratio',
      type: 'number',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: GridValueGetterParams) => params.value + '%'
    },
    {
      field: 'action',
      headerName: ' ',
      sortable: false,
      width: 200,
      align: 'center',
      renderCell: () => {
        return <Button className={cx(classes.openVault)}>Open Vault</Button>
      }
    }
  ]

  return (
    <Box className={cx(classes.root)}>
      <Container>
        <Box className={cx(classes.filter)}>
          <TokenAssetGridFilter
            filterOption={filterOption}
            handleFilterChange={newOption => setFilterOption(newOption)}
          />
        </Box>
        <Box className={cx(classes.assetList)}>
          <TokenAssetGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnSelector
            disableColumnMenu
            disableDensitySelector
            hideFooterPagination
            rowHeight={70}
            autoHeight
            autoPageSize
            pageSize={20}
            rowsPerPageOptions={[20]}
            components={{
              ColumnSortedDescendingIcon: SortedDescendingIcon,
              ColumnSortedAscendingIcon: SortedAscendingIcon
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default AssetSection
