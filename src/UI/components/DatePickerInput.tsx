import React from 'react';
import { fr } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerInputProps {
  value: Date | undefined;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  error?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange, onBlur, error }) => {
  return (
    <div>
      <div className=" w-full border-b-2  relative group shadow-[rgba(0,0,15,0.05)_0px_1px_1px_0px]">
        <label
          htmlFor="datePicker"
          className={`${error ? 'text-rose-500' : 'text-gray-600'} font-bold ml-1  text-xs flex`}>
          Date de naissance <span className="text-rose-500 ml-0.5">*</span>
        </label>
        <div className={`${error ? 'border-b-3 border-rose-500' : 'border-transparent'} relative z-10 w-full`}>
          <DatePicker
            className={` w-full font-600 placeholder:text-zinc-500 bg-transparent text-base pb-1  focus-visible:outline-none `}
            dateFormat="dd/MM/yyyy"
            minDate={new Date('1900-01-01')}
            maxDate={new Date()}
            popperPlacement="left-start"
            showMonthDropdown
            showYearDropdown
            showIcon
            dropdownMode="select"
            dateFormatCalendar="MMMM"
            scrollableYearDropdown
            locale={fr}
            toggleCalendarOnIconClick
            selected={value ? value : null}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <div
          className={`${error ? 'h-0.6' : 'h-0.5'} absolute left-0 right-0 bottom-0 
            after:absolute after:left-1/2 after:-translate-x-1/2 after:bg-default-foreground
            after:w-0 after:h-full after:origin-center after:transition-width after:duration-250 after:ease
            group-focus-within:after:w-full`}></div>
      </div>
      {error && <p className="text-rose-500 mt-2 text-xs ml-2 ">{error}</p>}
    </div>
  );
};

export default DatePickerInput;
