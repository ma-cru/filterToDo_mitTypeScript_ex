import React from "react";

type Props = {
    handleSubmit: (e: React.FormEvent) => void;
    itemChangeHandler: (e: React.ChangeEvent) => void;
    amountChangeHandler: (e: React.ChangeEvent) => void;
    dateChangeHandler: (e: React.ChangeEvent) => void;
    enteredAmount: string;
    enteredItem: string;
    enteredDate: string;
}


const InputForm: React.FC<Props> = (props) => {
    return (
        <React.Fragment>
            <form onSubmit={props.handleSubmit}>
                <div className='input'>
                    <label><b>Item</b></label><br />
                    <input type="text" placeholder="Enter item name" value={props.enteredItem} name="item" onChange={props.itemChangeHandler} required /><br />
                    <label><b>Amount</b></label><br />
                    <input type="number" min="0.01" step="0.01" placeholder="Enter amount" value={props.enteredAmount} name="amount" lang="en-150" onChange={props.amountChangeHandler} required /><br />
                    <label><b>Date</b></label><br />
                    <input type="date" placeholder="Enter date of payment" value={props.enteredDate} name="date" onChange={props.dateChangeHandler} required /><br />
                    <br />
                    <button type="submit">Save changes</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default InputForm;

