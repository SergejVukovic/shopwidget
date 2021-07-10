import React, {Fragment} from 'react';
import Button from '../Button';
import { useHistory, useParams, Link } from 'react-router-dom';

import "./Pagination.style.css";
import Paper from "../Paper";

const Pagination = ({currentPage = 1, maxPages = 0}) => {

    const isEnd = currentPage >= maxPages;
    currentPage = Number(currentPage);
    const history = useHistory();
    const {category} = useParams();

    const handlePreviousOrNextClick = (isBack) => {
        isBack ?
            history.push(`/products/${category}/page/${currentPage === 1 ? currentPage : currentPage - 1}`)
            :
            history.push(`/products/${category}/page/${currentPage === maxPages ? currentPage : currentPage + 1}`)
    }

    const generatePageButtons = () => {

        let pagesArray = [];
        let counter = currentPage + 3 >= maxPages ? maxPages - 3 : currentPage;

        counter = counter <= 0 ? 1 : counter;

        for(let i = counter;i < maxPages; i++) {
            pagesArray.push(i);
        }

        if(isEnd) {
            pagesArray[0] = 1;
        }

        return pagesArray;
    }

    return (
        <div className={"Pagination"}>
            <Paper className={"PaginationContainer"}>
                <Button onClick={() => handlePreviousOrNextClick(true)} className={"ripple"}>
                    {'<'}
                </Button>
                {
                    generatePageButtons().slice(0,3).map((number) => {
                        if (isEnd && number === 1) {
                            return (
                                <Fragment key={number}>
                                    <Link to={`/products/${category}/page/${number}`}>
                                        <Button className={"ripple"}>
                                            {number}
                                        </Button>
                                    </Link>
                                    <Button>
                                        ...
                                    </Button>
                                </Fragment>
                            )
                        }

                        return (
                            <Link to={`/products/${category}/page/${number}`} key={number}>
                                <Button key={number} className={"ripple"}>
                                    {number}
                                </Button>
                            </Link>
                        )
                    })
                }
                {
                    !isEnd
                    &&
                    <Button>
                        ...
                    </Button>
                }
                <Link to={`/products/${category}/page/${maxPages}`}>
                    <Button className={"ripple"}>
                        {maxPages}
                    </Button>
                </Link>
                <Button onClick={() => handlePreviousOrNextClick(false)} className={"ripple"}>
                    {'>'}
                </Button>
            </Paper>
        </div>
    )
};

export default Pagination;
