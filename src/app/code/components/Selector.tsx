import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SelectorOptionsProps {
  id: string,
  name: string,
  icon?: string
}
interface SelectorProps {
  options: Array<SelectorOptionsProps>,
  onChange: (value: any) => void,
  defaultValue?: any,
  label?: string,
  placeholder?: string
}
export default function Selector({ options, placeholder, label, ...props }: SelectorProps) {
  const [selected, setSelected] = useState(props.defaultValue)
  useEffect(() => {
    setSelected(props.defaultValue)
  }, [props.defaultValue])
  // @ts-ignore
  return (
    <Listbox value={selected} onChange={(v) => {
      setSelected(v)
      props.onChange && props.onChange(v)
    }}>
      {({ open }) => (
        <>
          {
            label && <Listbox.Label className="block text-sm font-medium leading-6 text-white">{label}</Listbox.Label>
          }
          <div className="relative">
            <Listbox.Button className="relative w-full rounded-full cursor-default  min-h-unit-8 rounded-small h-3/5 rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              {
                selected ? (
                  <>
                    <span className="flex items-center">
                      {
                        selected.icon &&
                        <img src={selected.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                      }
                      <span className="ml-3 block truncate text-white text-xs md:text-base">{selected.name}</span>
                    </span>
                  </>
                ) : <span className="ml-3 block truncate text-[#666] text-xs md:text-base">{placeholder || "请选择"}</span>
              }
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute bg-black z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((item: SelectorOptionsProps, index) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {
                            item.icon &&
                            <img src={item.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          }
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-white text-xs md:text-base')}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
