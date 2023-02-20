import React, { useEffect, useState } from 'react'

const Test = () => {
    const [count, setCount] = useState<number>(10);
    const storedCount = localStorage.getItem('count');

    useEffect(() => {
        if (storedCount) {
            setCount(Number(storedCount));
        } else {
            localStorage.setItem('count', JSON.stringify(count));
        }
    }, [])

    useEffect(() => {
        let interval = setInterval(() => {
            setCount((count) => count - 1)
        }, 1000)

        if (count === 0) {
            clearInterval(interval)
            localStorage.setItem('count', JSON.stringify(count));
        } else {
            localStorage.setItem('count', JSON.stringify(count));
        }

        return () => {
            return clearInterval(interval)
        }
    }, [count])

    return (
        <div>
            <p>{count}</p>
            <input type={'button'} disabled={count !== 0} value={'OK'} onClick={() => {
                alert('this is alert');
                setCount(10)
            }} />
        </div>
    )
}

export default Test