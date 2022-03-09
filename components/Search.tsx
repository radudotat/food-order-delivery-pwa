import Link from 'next/link';
import {useCallback, useEffect, useRef, useState} from 'react';
import styles from '../styles/search.module.css';
import {getSortedRestaurantsData} from "../lib/restaurants";

export default function Search() {
    const searchRef = useRef<HTMLDivElement | null>(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length > 2) {
            const timeOutId = setTimeout(() => {
                getSortedRestaurantsData(query)
                    .then((res) => {
                        const uniqueRestaurants = res.response.data.search_restaurants.filter((val: any, id: number, array: string | any[]) => {
                            return array.indexOf(val) == id;
                        });
                        console.log('response', uniqueRestaurants)
                        return setResults(uniqueRestaurants);
                    });
            }, 600);
            return () => clearTimeout(timeOutId);
        }
    }, [query]);

    const onChange = useCallback(async (event) => {
        const newQuery = event.target.value;
        if (newQuery.length >= 0) {
            setQuery(newQuery);
        } else {
            setResults([]);
        }
    }, []);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener('click', onClick);
    }, []);

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);

    return (
        <div className={styles.container} ref={searchRef}>
            <input
                className={styles.search}
                onChange={onChange}
                onFocus={onFocus}
                placeholder="Search restaurants"
                value={query}
            />
            {active && results.length > 0 && (
                <ul className={styles.results}>
                    {results.map(({id, name}) => (
                        <li className={styles.result} key={`results-${id}`}>
                            <Link href="/restaurants/[id]" as={`/restaurants/${id}`}>
                                <a>{name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
