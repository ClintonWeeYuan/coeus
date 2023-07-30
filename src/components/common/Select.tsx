import { FC, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { HiCheck } from 'react-icons/hi';

interface Option {
    display: string;
    value: string;
}
interface Props {
    options: Option[];
    onChange?: (view: string) => void;
}

const Select: FC<Props> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (option: Option) => {
        onChange && onChange(option.value);
        setSelectedOption(option);
    };

    return (
        <Listbox value={selectedOption} onChange={handleChange}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-200 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                    <span className="block truncate">
                        {selectedOption.display}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? 'bg-amber-100 text-amber-900'
                                            : 'text-gray-900'
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                            }`}
                                        >
                                            {option.display}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <HiCheck
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default Select;
