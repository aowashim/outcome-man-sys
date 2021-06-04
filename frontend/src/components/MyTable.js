import React, { useContext } from 'react'
import { useTable, useRowSelect } from 'react-table'
import AppContext from '../store/AppContext'
import CheckBox from './CheckBox'
import '../helpers/table.css'

function MyTable(props) {
  const [isLoggedIn, setIsLoggedIn] = useContext(AppContext)

  // const data = React.useMemo(() => props.data, [])
  // const columns = React.useMemo(() => props.columns, [])

  const data = props.data
  const columns = props.columns

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default MyTable
