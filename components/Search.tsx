import {useCallback, useRef, useState} from 'react'
import Link from 'next/link'
import styles from '../styles/search.module.css'

export default function Search() {

    const searchRef = useRef<HTMLDivElement | null>(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query: string) => `/api/search?q=${query}`

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res.results)
                })
        } else {
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div
            className={styles.container}
            ref={searchRef}
        >
            <input
                className={styles.search}
                onChange={onChange}
                onFocus={onFocus}
                placeholder='Search restaurants'
                type='text'
                value={query}
            />
            {active && results.length > 0 && (
                <ul className={styles.results}>
                    {results.map(({id, name}) => (
                        <li className={styles.result} key={id}>
                            <Link href="/restaurants/[id]" as={`/restaurants/${id}`}>
                                <a>{name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
