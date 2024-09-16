import React from 'react';
import { fr } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerInputProps {
  value: Date | undefined;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string | undefined;
  ariaErrorMessage?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  ariaErrorMessage,
}) => {
  return (
    <div>
      <div
        className={`w-full relative group  ${
          error ? 'border-b-2 border-rose-500' : 'border-b-2 h-14  focus-within:border-gray-100 focus-within:border-b-0'
        }`}>
        <label
          htmlFor="datePicker"
          className={`${error ? 'text-rose-500' : 'text-content1'} font-bold ml-1  text-xs flex`}>
          Date de naissance <span className="text-rose-500 ml-0.5">*</span>
        </label>
        <div className={`${error ? ' border-rose-500' : 'border-transparent'} relative z-10 w-full`}>
          <DatePicker
            className={` w-full font-600 placeholder:text-zinc-500 bg-transparent text-base pb-1  focus-visible:outline-none `}
            dateFormat="dd/MM/yyyy"
            aria-errormessage={ariaErrorMessage}
            minDate={new Date('1900-01-01')}
            maxDate={new Date()}
            popperPlacement="left-start"
            placeholderText={placeholder}
            calendarIconClassName="fill-secondary-200  group-hover:fill-content1"
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
          className={`${error ? ' border-b-2 border-rose-500' : 'border-b-content2 h-0.6'} absolute left-0 right-0 bottom-0 
            after:absolute after:left-1/2 after:-translate-x-1/2 after:bg-default-foreground
            after:w-0 after:h-full after:border-b-black  after:origin-center after:transition-width after:duration-250 after:ease
            group-focus-within:after:w-full`}></div>
      </div>
      {error && <p className="text-rose-500 mt-2 text-xs ml-2 ">{error}</p>}
    </div>
  );
};

export default DatePickerInput;
