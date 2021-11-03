import { useRouter } from 'next/router'
import React from 'react'

export default function Category() {
    const { query } = useRouter();
    console.log(query);
    return (
        <div>
            <h1>aqui va una categoria {query.id}</h1>
        </div>
    )
}
