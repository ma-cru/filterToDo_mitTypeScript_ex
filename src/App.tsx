import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import ExpenseItem from "./components/ExpenseItem";
import ExpensesFilter from './components/ExpensesFilter';
import ContentAdder from './components/ContentAdder';
// import DateTester from './components/DateTester';

import expenses, { expensesStr } from "./data/expenses";
import newEntry from './modules/newEntry';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.css';

function App() {

  const [addModalShow, setAddModalShow] = useState<boolean>(false);

  const [filteredYear, setFilteredYear] = useState<string>('2022');

  const [startExpenses, setExpenses] = useState(expenses);

  const [filterAussetzen, setFilterAussetzen] = useState<boolean>(false);

  const jahrSpeicher = (yearSelected: string): void => {

    setFilterAussetzen(false);

    let filterYear = yearSelected;

    console.log(filterYear);

    setFilteredYear(filterYear);

  }

  const expensesUpdater = (updatedEntry: newEntry) => {

    setExpenses((prevExpenses) => {

      console.log(prevExpenses);

      console.log(updatedEntry);

      let nonDuplicates: newEntry[] = [];
      prevExpenses.forEach((element) => {
        if (element.id !== updatedEntry.id) {
          nonDuplicates.push(element);
        }
      });

      return [updatedEntry, ...nonDuplicates];

    });

  }

  const filterAusschalten = () => {
    setFilterAussetzen(true);
  }

  const newEntryProcesser = (newEntry: newEntry) => {

    setExpenses((prevExpenses) => {

      console.log(prevExpenses);

      console.log(newEntry);

      return [newEntry, ...prevExpenses];

    });

  }

  // new Date(expense.date).toLocaleDateString('de-DE', dateOpts)

  // const dateCalc = (a: newEntry, b: newEntry) => {

  //   console.log("dateA:" + a.date);
  //   console.log("dateB:" + b.date);

  //   const firstDotA = a.date.indexOf('.');
  //   const lastDotA = a.date.lastIndexOf('.');

  //   const firstDotB = b.date.indexOf('.');
  //   const lastDotB = b.date.lastIndexOf('.');

  //   const daysA = Number(a.date.slice(0, firstDotA));
  //   const monthsA = Number(a.date.slice(firstDotA + 1, lastDotA));
  //   console.log("daysA:" + daysA);
  //   console.log("monthsA:" + monthsA);

  //   const daysB = Number(b.date.slice(0, firstDotB));
  //   const monthsB = Number(b.date.slice(firstDotB + 1, lastDotB));
  //   console.log("daysB:" + daysB);
  //   console.log("monthsB:" + monthsB);

  //   return ((daysA + (monthsA * 31)) - (daysB + (monthsB * 31)));

  // }

  let filteredExpenses: expensesStr[] = [];
  let filteredExpensesArr: expensesStr[] = [];

  if (filterAussetzen === true) {

    // filteredExpensesArr = startExpenses.sort((a, b) => dateCalc(a, b));

    filteredExpensesArr = startExpenses.sort((a, b) => Math.abs(new Date(b.date).getTime()) - Math.abs(new Date(a.date).getTime()));

  } else {

    filteredExpenses = startExpenses.filter(expense => {

      console.log(expense);

      return ((expense.date.slice(0, 4)) === filteredYear);

    });

      filteredExpensesArr = filteredExpenses.sort((a, b) => Math.abs(new Date(b.date).getTime()) - Math.abs(new Date(a.date).getTime()));


      console.log("unfiltered:" + startExpenses);
      console.log("filtered:" + filteredExpenses);

    }

    // console.log("filteredExpensesArr:" + filteredExpensesArr);

    return (
      <React.Fragment>
        <div>
          <h1>Expenses Planner</h1>
          <ExpensesFilter
            selected={filteredYear}
            onYearChange={jahrSpeicher}
            filterAusschalten={filterAusschalten}
          />
          <Button variant="primary" onClick={() => setAddModalShow(true)} className="addButton">add entry</Button>
          {filteredExpensesArr.length > 0
            ? <div className="mainGrid">
              {filteredExpensesArr.map(expense => <ExpenseItem
                key={expense.key}
                id={expense.id}
                item={expense.item}
                amount={expense.amount}
                date={expense.date}
                adaptExpenses={expensesUpdater}
              />)}
            </div>
            : <p className="noEntryP">No entry is available for this year</p>
          }
          <ContentAdder
            show={addModalShow}
            hideadd={() => setAddModalShow(false)}
            savenewentry={newEntryProcesser}
          />
        </div>
        {/* <DateTester /> */}
      </React.Fragment>
    );
  }

  export default App;