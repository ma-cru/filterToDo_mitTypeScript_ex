import React, { useEffect, useState } from 'react';

const DateTester = () => {

    const dateOpts: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

    const [enteredDate, setDate] = useState<string>(new Date().toISOString());

    const [datesArr, setDatesArr] = useState<string[]>([]);

    const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        setDate(e.target.value);

        console.log("change handler is working");

        console.log(enteredDate);
        console.log(new Date(enteredDate).toLocaleDateString('de-DE', dateOpts));
        console.log(new Date(enteredDate));
    }

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        console.log("submit is working");

        console.log(enteredDate);

        console.log(new Date(enteredDate));

        datesArr.length > 0
            ? setDatesArr(prevDates => [enteredDate, ...prevDates])
            : setDatesArr([enteredDate]);

    }

    useEffect(() => {
        let sortedDates = datesArr.sort((a, b) => Math.abs(new Date(b).getTime()) - Math.abs(new Date(a).getTime())); // wäre unnötig in normalem JS, wird nur benötigt, weil TypeScript dir klar machen möchte, dass ein Datum eigentlich keine Zahl ist, obwohl JS es trotzdem problemlos konvertieren kann

        console.log(sortedDates);
    }, [datesArr]);

    return (
        <React.Fragment>
            <div className='flexBox'>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <label><b>Date</b></label><br />
                        <input type="date" placeholder="Enter date of payment" value={enteredDate} name="date" onChange={dateChangeHandler} required /><br />
                        <br />
                        <button type="submit">Save changes</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}
export default DateTester;