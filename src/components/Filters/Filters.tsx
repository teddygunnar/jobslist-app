import React, { ChangeEvent } from 'react'

type Props = {
    description?: string;
    setDescription: (prev: string) => void;
    location?: string;
    setLocation: (prev: string) => void;
    full_time?: boolean;
    setFullTime: (prev: boolean) => void;
    handleSearchFetch: () => void;
}

const Filters = (props: Props) => {
    const { description, location, full_time, setDescription, setLocation, setFullTime, handleSearchFetch } = props;

    return (
        <div className='p-3 w-100'>
            <div className='flex gap-5 items-end justify-between flex-wrap'>
                <div className='flex flex-col'>
                    <label htmlFor='job-label' className='font-semibold'>Job Description</label>
                    <input id='job-label' className='w-100 xl:w-[30rem] lg:w-[20rem] border border-gray-500/40 px-3 py-1 focus:outline-none rounded-sm' placeholder='Job Description' value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='job-label' className='font-semibold'>Location</label>
                    <input id='location-label' className='w-100 xl:w-[30rem] lg:w-[20rem] border border-gray-500/40 px-3 py-1 focus:outline-none rounded-sm' placeholder='Location' value={location} onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
                </div>
                <div className='flex items-center flex-row-reverse justify-center gap-3 xl:pb-1 lg:pb-1 md:pb-1 sm:pb-1'>
                    <label htmlFor='fulltime-label' className='font-bold'>
                        Full time Only
                    </label>
                    <input id='fulltime-label' type={"checkbox"} onChange={() => setFullTime(!full_time)} checked={Boolean(full_time)} />
                </div>
                <div className='xl:pb-1 lg:pb-1 md:pb-1 sm:pb-1'>
                    <span className='px-4 py-1 text-white font-semibold cursor-pointer hover:bg-blue-600 rounded shadow-sm bg-blue-500' onClick={() => handleSearchFetch()}>Search</span>
                </div>
            </div>
        </div>
    )
}

export default Filters