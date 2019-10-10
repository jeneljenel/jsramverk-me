import React, { Component } from 'react';

import months from '../data/months';

import '../style/Datepicker.css'


//render years for select
const RenderYears = (state) => {
    let today = new Date()
    let year = today.getFullYear();
    const years = [];

    for (let y = 1930; y < year; y++) {
        years.push(y);
    }
    years.reverse();
    const optYears = years.map((year, index) => {
        return (
            <option key={index}>{year}</option>
        )
    });

    return optYears;
};

//render months for select
const RenderMonths = () => {
    const optMonths = months.map((month, index) => {
        return (
            <option key={index} value={index}>{month}</option>
        )
    })

    return optMonths; 
};

//render days for select acc. to month with  leap year.
const RenderDays = (state) => {
    const days = [];
    

    for (let i = 1; i <= state.calendar[state.currMonth]; i++) {
        days.push(i);  
    };
    const optDays = days.map((day, index) => {
        return (
            <option key={index}>{day}</option>
        );
    });

    return optDays;
};


// // Render a hole year
// const RenderYear = state => {
//     // console.log(state.calendar);

//     const rows = state.calendar.map((days_in_month, index) => {
//         let days = [];
//         for (let d = 1; d <= days_in_month; d++) {
//             days.push(d);
//         }
//         return (
//             <tr key={index}>
//             <td>
//                     {days}
//             </td>
//             </tr>
//         )
//     })

//     return <tbody>{rows}</tbody>;


// };



class Datepicker extends Component {
    constructor(props) {
        super(props);
        const today = new Date();

        this.initialState = {
            date: '',
            currYear: today.getFullYear(),
            currMonth: today.getMonth(),
            currDay: 'pick a day',
            currDays: '',
        }

        this.state = this.initialState

        this.handleDateChange = this.handleDateChange.bind(this);

    };

    handleDateChange = event => {
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;


        this.setState({
            [name]: value
        });

        if (typeof(this.state.currDay) === "number") {
            let ts = this.state;
            let compDate = new Date(ts.currYear, ts.currMonth, ts.currDay);

            this.setState({
                date: compDate
            })
            console.log(compDate);
            try {
                this.props.handleChange("birthday", compDate);
            } catch (error) {
                console.log("not running through form");
            }

        };
        


    };



    isLeapYear = year => {

        if ((year % 4 === 0 && year % 100 !== 0 )|| year % 400 === 0) {
            return true
        }
    
        return false;
    };

    //months: 0, 1, 2, 3... = jan, feb, mars, april...
    getDays = (year, month) => {
        let leapyear = this.isLeapYear(year);
        let days = 30;

        if ((month % 2 === 0 && month <= 6) || (month %2 !== 0 && month >= 7)) { //
            days = 31;
        } else if (month === 1 && leapyear) { //leapyear
            console.log("leapyear!");
            days = 29;
        } else if (month === 1) { //feb
            days = 28;
        } else {
            days = 30;
        }

        return days;
    };


    getCalendar = () => {
        let currYear = this.state.currYear;
        let calendar = [];

        for (let m = 0; m < 12; m++) {
            calendar.push(this.getDays(currYear, m));            
        }

       return calendar;        
    };

    getMonth = (monthIndex) => {
        return months[monthIndex];
    };

    render () {
        const { currYear, currMonth, currDay } = this.state;
        const calendar = this.getCalendar();
        const month = this.getMonth(this.state.currMonth);
        
        return (
                // <div className="dp-popup">
                // <div className='dp-popup-inner'>  
                <div>
                    <p>
                        Selected birthday: {this.state.currYear}, {month}, {this.state.currDay}
                    </p>
                    <select 
                        className="dp-select" 
                        value={this.state.currYear}
                        name="currYear"
                        // onChange={this.checkSelectedYear}>
                        onChange={this.handleDateChange}>
                        <RenderYears currYear={currYear}/>
                    </select>
                    <select
                        className="dp-select"
                        value={this.state.currMonth}
                        name="currMonth"
                        onChange={this.handleDateChange}>
                        <RenderMonths currMonth={currMonth}/>
                    </select>
                    <select
                        className="dp-select"
                        value={this.state.currDay}
                        name="currDay"
                        onChange={this.handleDateChange}>
                        <RenderDays calendar={calendar} currMonth={currMonth} currYears={currYear} currDay={currDay}/>
                    </select>
                    {/* <button onClick={this.props.closePopup} type="Submit">OK</button> */}
                    {/* <table className="dp-mini-year">
                        <RenderYear calendar={calendar} />
                    </table> */}
                {/* </div> */}
            </div>

        )
    }
};

export default Datepicker;
