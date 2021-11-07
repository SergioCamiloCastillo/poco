import React from 'react'
import { useRouter } from 'next/router';
import { Pagination as PaginationSU } from "semantic-ui-react";
import queryString from "query-string";

export default function Pagination(props) {
    const router = useRouter();
    const urlParse = queryString.parseUrl(router.asPath);
    //transformar la url actual en objetos 
    console.log(urlParse);
    const { limitPerPage, totalProductsCategory, page } = props;
    const totalPages = Math.ceil(totalProductsCategory / limitPerPage);
    const goToPage = (newPage) => {
        urlParse.query.page = newPage;
        const url = queryString.stringifyUrl(urlParse);
        router.push(url);
    }
    return (
        <div className='pagination'>
            <PaginationSU boundaryRange={0} siblingRange={1} ellipsisItem={null} defaultActivePage={page} totalPages={totalPages} firstItem={null} lastItem={null} onPageChange={(_, data) => goToPage(data.activePage)}></PaginationSU>
        </div>
    )
}
