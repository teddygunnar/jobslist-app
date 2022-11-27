import * as Constants from '../../Constants';
import axios from 'axios';
import { JobDetailI } from './_model';

export const GetJobList = async ({pageParam = 1}) => {
    const {data} = await axios.get<JobDetailI[]>(Constants.JOBS_LIST + `?page=${pageParam}`);
    return data
}

export const SearchJob = async (props: {description?: string, location?: string, full_time?: boolean}) => {
    const {data} = await axios.get<JobDetailI[]>(Constants.JOBS_LIST, {
        params: {...props}
    })

    return data
}

export const JobDetail = async (id?: string) => {
    const {data} = await axios.get<JobDetailI>(Constants.JOB_DETAIL + `/${id}`)

    return data
}