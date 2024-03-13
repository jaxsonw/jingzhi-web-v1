"use client";

import React,{Fragment, useState} from "react";
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MobelTable from '../../components/common/ModelTable'
const people = [
  { name: '全部类型' },
  { name: '聊天模型' },
  { name: '基础模型' },
  { name: '图像模型' }
]
const model = () => {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="h-screen pt-[104px] lg:px-16">
      <h1 className="text-[30px] text-[#000B4D] pt-[33px] sm:flex sm:flex-auto sm:justify-center">大模型广场</h1>
      <h2 className="text-[16px] text-[#A3C6FF] sm:flex sm:flex-auto sm:justify-center">LARGE MODEL HUB</h2>
      <div className="sm:flex pt-[22px]">
         <div className=" sm:flex flex-auto sm:justify-end  sm:flex-grow-[1.78]">
            <button className="w-[120px] h-[40px] mr-[23px] bg-[#3162FF] text-white rounded-full">
              重要参数
            </button>
            <button className="w-[120px] h-[40px]  bg-[#fff] text-[#1A1A1A] border-2 border-[#98E2FF] rounded-full">
              费用介绍
            </button>
          </div>
        <div className=" sm:flex sm:flex-auto sm:justify-end">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button
                className="sm:flex sm:flex-auto  items-center w-[153px] h-[40px] mr-[21px] bg-[#fff] border-2  border-[#E4E4E4] hover:border-[#3162FF] text-[rgba(0, 0, 0, 0.65)] rounded-full"
                // className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span className="sm:flex-grow-[1] truncate">{selected.name}</span>
                <span className="pointer-events-none flex items-center pr-2">
                  <ChevronDownIcon
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-4 pr-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-1 border-[#3162FF]">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 text-center border-b-2 border-[#E4E4E4]
                        last:border-b-0
                        ${
                          active ? 'text-[#3162FF]' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'text-[#3162FF]' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {/* {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null} */}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button
                className="sm:flex sm:flex-auto  items-center w-[153px] h-[40px]  bg-[#fff] border-2  border-[#E4E4E4] hover:border-[#3162FF] text-[rgba(0, 0, 0, 0.65)] rounded-full"
                // className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span className="sm:flex-grow-[1] truncate">{selected.name}</span>
                <span className="pointer-events-none flex items-center pr-2">
                  <ChevronDownIcon
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-4 pr-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-1 border-[#3162FF]">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 text-center border-b-2 border-[#E4E4E4]
                        last:border-b-0
                        ${
                          active ? 'text-[#3162FF]' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'text-[#3162FF]' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                        
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <MobelTable
      />
    </div>
   
    
  )
};

export default model;




