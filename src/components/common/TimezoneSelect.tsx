import { FC, Fragment, useEffect, useState } from "react";
import { useTimezoneSelect, allTimezones, ITimezoneOption } from 'react-timezone-select'
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props {
  onChange?: (view: string) => void;
  defaultTimezone: string;
}

const labelStyle = 'original'
const timezones = {
  ...allTimezones,
  'Europe/Berlin': 'Frankfurt'
}

const TimezoneSelect: FC<Props> = ({ onChange, defaultTimezone }) => {
  const { options } = useTimezoneSelect({ labelStyle, timezones })
  const [selectedOption, setSelectedOption] = useState<ITimezoneOption>(options.find((timezone) => timezone.value === defaultTimezone) || options[0])

  useEffect(() => {
    setSelectedOption(options.find((timezone) => timezone.value === defaultTimezone) || options[0])
  }, [defaultTimezone])

  const [query, setQuery] = useState('')

  const filteredTimezones = query === ''
    ? options
    : options.filter((option) => {
      return option.label.toLowerCase().includes(query.toLowerCase())
    })

  const handleChange = (option: ITimezoneOption) => {
    onChange && onChange(option.value);
    setSelectedOption(option);
  };


  return (
    <Combobox value={selectedOption} onChange={handleChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
      <Combobox.Input displayValue={(timezone : ITimezoneOption) => timezone.label} onChange={(event) => setQuery(event.target.value)}
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"/>
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Combobox.Options
          className="absolute z-20 scrollbar mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredTimezones.map((timezone) => (
            <Combobox.Option key={timezone.value} value={timezone} className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-900'
              }`
            }>
              {timezone.label}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
      </div>
    </Combobox>
  )
}

export default TimezoneSelect