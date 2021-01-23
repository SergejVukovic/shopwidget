import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import './Filter.style.css';
import Paper from "../../components/UI/Paper";
import Button from "../../components/UI/Button";
import API from "../../API";
import Select from "../../components/UI/Select/Select";
import {toast} from "react-hot-toast";

const DEFAULT_CATEGORIES = ['food','sport', 'auto', 'house', 'outdoor', 'indoor', 'clothing', 'tools', 'equipment', 'parts' , 'shoes'];
const Filter = ({setFilters}) => {

    const history = useHistory();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        API.shopRequest('category')
            .then(result => setCategories(result))
            .catch(() => setCategories(DEFAULT_CATEGORIES));
    }, [setCategories]);

    const handleCloseClick = () => history.push('/');
    const handleFilterReset = () => {
        setFilters(null);
        toast.success('Filter uklonjen !')
    }
    const handleFilterSubmit = (event) => {
      event.preventDefault();

        const formData = new FormData(event.target);
        const filterData = {};

        for (const key of formData.keys()) {
            if(formData.get(key) && formData.get(key) !== 'Filtriraj po kategoriji') {
                filterData[key] = formData.get(key);
            }
        }

        setFilters(filterData)
        toast.success('Filter Primijenjen !')
    };

    return (
        <div className={'Filter'}>
            <Paper className={'FilterPaper'}>
                <div>
                    <form className={'FilterForm'} onSubmit={handleFilterSubmit} id={'filterForm'}>
                        <div className={'FilterFormElement'}>
                            <label>Naziv Proizvoda</label>
                            <input type={'text'} placeholder={'Product name'} name={'name'} autoComplete={'off'}/>
                        </div>
                        <div className={'FilterFormElement'}>
                            <label>Kategorija</label>
                            <Select name={'category'}>
                                <option key={'DEFAULT'} value={null}>Filtriraj po kategoriji</option>
                                {categories.map(category => <option key={category.id} value={category.id}>
                                    {
                                        category?.name ?
                                            category.name.toUpperCase()
                                            :
                                            category.toUpperCase()
                                    }
                                </option>)}
                            </Select>
                        </div>
                        <div className={'FilterFormElement'}>
                            <label>Min</label>
                            <input type={'number'} placeholder={'Minimum price'} name={'min'} autoComplete={'off'}/>
                        </div>
                        <div className={'FilterFormElement'}>
                            <label>Max</label>
                            <input type={'number'} placeholder={'Maximum price'} name={'max'} autoComplete={'off'}/>
                        </div>
                        <div className={'FilterFormElement'}>
                            <label>Na popustu</label>
                            <input type={'checkbox'} name={'is_sale'} autoComplete={'off'}/>
                        </div>
                    </form>
                    <div className={'FilterActionButtons'}>
                        <Button onClick={handleCloseClick}>
                            Zatvori
                        </Button>
                        <Button onClick={handleFilterReset}>
                            Ukloni Filtere
                        </Button>
                        <Button form={'filterForm'} type={'submit'}>
                            Primjeni Filter
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Filter;
