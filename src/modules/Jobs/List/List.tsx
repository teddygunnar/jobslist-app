import React, { Fragment, useState, useRef } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import Filters from '../../../components/Filters/Filters'
import JobItem from '../../../components/JobItem/JobItem'
import { JobDetailI } from '../../core/_model'
import { GetJobList, SearchJob } from '../../core/_request'
import useIntersectionObserver from '../../../components/useIntersectionObserver/useIntersectionObserver'

const List = () => {
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [full_time, setFullTime] = useState<boolean | undefined>(undefined);
    const [search, setSearch] = useState<boolean>(false);

    const loadMoreRef = useRef() as any;

    const params = { full_time, description, location };

    const filterProps = {
        setDescription, location, setLocation, description, full_time, setFullTime
    }

    // const { data: jobList, isLoading: jobListLoading } = useQuery(['jobs-list'], () => GetJobList(page), {
    //     staleTime: 60000,
    //     refetchOnWindowFocus: false,
    // });

    const { data: jobList, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery("jobItems", GetJobList, {
        getNextPageParam: (_, pages) => {
            if (pages?.length < 2) {
                return pages.length + 1;
            } else {
                return undefined;
            }
        }
    })

    const { data: jobSearchList, refetch: jobSearchFetch, isLoading: jobSearchListLoading } = useQuery(['search-job'], () => SearchJob(params), {
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: false
    })

    const handleSearchFetch = () => {
        jobSearchFetch();
        setSearch(true);
    }

    useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })

    const JobSearchComponent = () => {
        return (
            <>
                <span className='m-3 text-blue-500 cursor-pointer' onClick={() => setSearch(false)}>Back</span>
                <h1 className='text-3xl font-bold px-3'>Showing {jobSearchList?.length} Jobs</h1>

                <div className='mt-5'>
                    {
                        jobSearchListLoading
                            ? <div>Loading...</div>
                            : (<ul>
                                {jobSearchList?.map((val: JobDetailI) => (
                                    <li key={val.id}>
                                        <JobItem {...val} />
                                    </li>
                                ))}
                            </ul>)
                    }
                </div>
            </>
        )
    }

    const JobListComponent = () => {
        return (
            <>
                <h1 className='text-3xl font-bold px-3'>Jobs List</h1>

                <div className='mt-5'>
                    <ul>
                        {
                            jobList?.pages.map((group, i) => {
                                return (
                                    <Fragment key={i}>
                                        {
                                            group.map((val, index) => {
                                                return (
                                                    val ? <JobItem {...val} /> : null
                                                )
                                            })
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </ul>

                    <div ref={loadMoreRef} className="text-center font-thin">
                        <span className="text-center font-thin">{isFetching && !isFetchingNextPage ? 'Loading...' : null}</span>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className='m-3'>
            <Filters {...filterProps} handleSearchFetch={handleSearchFetch} />
            <div className='bg-white p-3 border m-3'>
                {
                    !search
                        ?
                        <JobListComponent />
                        :
                        <JobSearchComponent />
                }
            </div>
        </div>
    )
}

export default List