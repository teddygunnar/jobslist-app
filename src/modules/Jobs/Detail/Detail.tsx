/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { JobDetail } from '../../core/_request';

const LogoPlaceholder = require('../../../assets/images/logo-placeholder.jpg')

const Detail = () => {
    const { id } = useParams();
    const [img, setImg] = useState<boolean>(false)
    const { data } = useQuery(['detail-jobs', id], () => JobDetail(id), {
        staleTime: 60000,
        refetchOnWindowFocus: false,
    })

    const image = () => {
        if (data?.company_logo) {
            axios.get(data.company_logo)
                .then((res) => {
                    console.log(res);
                    return setImg(true)
                })
                .catch((err) => {
                    console.log(err);
                    return false
                })
        }
    }

    image()

    const navigate = useNavigate();

    return (
        <div className='m-3'>
            <span className='text-blue-500 font-semibold cursor-pointer hover:text-blue-600' onClick={() => navigate(-1)}>Back</span>
            <div className='p-3 bg-white border shadow-lg'>

                <span className='text-sm text-gray-400'>{data?.type} / {data?.location}</span>

                <h1 className='text-2xl font-bold text-blue-900'>{data?.title}</h1>

                <div className='mt-5 border-t pt-5 flex gap-5 flex-col-reverse justfiy-center items-center sm:justify-end sm:items-start sm:flex-row'>
                    <div dangerouslySetInnerHTML={{ __html: data?.description! }} className="w-[75%]" />

                    <div className='w-96'>
                        <div className='border p-5'>
                            <img src={img ? data?.company_logo : LogoPlaceholder} alt="logo.jpeg" width={350} height={250} />
                        </div>

                        <div className='border p-2 mt-2 text-center'>
                            <h1 className='font-bold'>How to apply</h1>

                            <div dangerouslySetInnerHTML={{ __html: data?.how_to_apply! }} className="break-words" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detail