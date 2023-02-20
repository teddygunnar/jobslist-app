import React from 'react'
import moment from 'moment';
import { JobDetailI } from '../../modules/core/_model'
import { Link } from 'react-router-dom';

const JobItem = (props: JobDetailI) => {
    const { title, location, company, created_at, type, id } = props;
    const dateParse = new Date(Date.parse(created_at));
    return (
        <Link to={id}>
            <div className='border-t p-3 hover:bg-blue-500/10 cursor-pointer'>
                <div className='flex justify-between items-center flex-wrap'>
                    <span className='font-bold text-blue-500'>{title}</span>
                    <span className='font-semibold'>{location}</span>
                </div>
                <div className='hidden md:flex lg:flex xl:flex justify-between items-center'>
                    <span className='font-thin'>{company} - <span className='font-semibold text-green-600'>{type}</span></span>
                    <span className='text-gray-400'>{moment(dateParse, 'YYYYMMDD').fromNow()}</span>
                </div>
            </div>
        </Link>
    )
}

export default JobItem