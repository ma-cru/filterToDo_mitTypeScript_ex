/* 

am effizientesten würde der Filter direkt auf die Anzeige zugreifen und nur die passenden Elemente in App.tsx herzeigen

*/

import React from 'react';

import Button from 'react-bootstrap/Button';

import '../style/expensesFilter.css';

type Props = {

  onYearChange: (yearSelected: string) => void,
  selected: string,
  filterAusschalten: () => void

}

const ExpensesFilter: React.FC<Props> = (props) => {

  const changeCollector = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let yearSelected: string = (event.target as HTMLSelectElement).value;

    console.log(yearSelected);

    props.onYearChange(yearSelected);
  }

  return (
    <React.Fragment>
      <div className='expenses-filter'>
        <div className='expenses-filter__control'>
          <label>Filter by year</label>
          <select value={props.selected} onChange={changeCollector}>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            <option value='2019'>2019</option>
          </select>
          <Button variant="primary" onClick={props.filterAusschalten} className="addButton">cancel filter</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpensesFilter;