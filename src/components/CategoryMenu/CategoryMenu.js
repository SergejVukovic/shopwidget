import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams, useHistory} from "react-router-dom";

import {setFilters} from "../../store/actions/filter.action";
import Button from "../UI/Button";
import {isDesktop} from "../../utils";

import "./CategoryMenu.style.css";
import {toast} from "react-hot-toast";

const CategoryMenu = () => {

    const [localFilters, setLocalFilters] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const filters = useSelector(state => state.filters);
    const categories = useSelector(state => state.shop.categories);

    const history = useHistory();
    const dispatch = useDispatch();
    const {category, page} = useParams();

    useEffect(() => {

        if(category === "sale") {
            setCurrentCategory({
                id:101,
                name: 'rasprodaja',
                url_name: 'is_sale'
            })
            return;
        }
        const nextCurrentCategory = categories?.filter(shopCategory => shopCategory.url_name === category)[0];
        setCurrentCategory(nextCurrentCategory || null);

    }, [category, setCurrentCategory, categories]);

    const handleFilterChange = (event) => {
        switch (event.target.name) {
            case "productName":
                setLocalFilters({...localFilters, name : event.target.value});
                break;
            case "maxPrice":
                setLocalFilters({...localFilters, max : event.target.value});
                break;
            case "minPrice":
                setLocalFilters({...localFilters, min : event.target.value});
                break;
            default:
                return null;
        }
    }

    const handleFilterSubmit = () => {
       dispatch(setFilters(localFilters));
       toast.success('Filter primjenjen', {
           duration: 2000
       });
    }

    const handleRemoveFilter = (filterValue) => {
        const removedFilterKey = Object.keys(filters).filter(existingFilter => filters[existingFilter] === filterValue);
        const {[removedFilterKey] : removed, ...nextFilters} = filters;
        dispatch(setFilters(nextFilters));
    }

    const handleRemoveCategory = () => {
        history.push('/products/all/page/1');
    }

    const handleClose = () => {
        history.push(`/products/${category || 'all' }/page/1`);
    }

    if(!categories || !categories.length) {
        return null;
    }

  return (
      <div className={`CategoryMenu ${!isDesktop() && 'active'}`}>
          <div className={'CategoryMenuItemContainer'}>
              {
                  (Object.keys(filters).length > 0 || currentCategory) &&
                      <>
                          <div className={'CategoryMenuSeparator'}>
                              Aktivni filteri
                          </div>
                          {
                              currentCategory &&
                              <div className={'CategoryMenuItem'} key={currentCategory.id}>
                                      <span className={'filterLabel'} onClick={handleRemoveCategory}>
                                           x {currentCategory.name}
                                      </span>
                              </div>
                          }
                          {
                              Object.values(filters).map(filterValue => (
                                  <div className={'CategoryMenuItem'} key={filterValue}>
                                      <span className={'filterLabel'} onClick={ () => handleRemoveFilter(filterValue)}>
                                           x {filterValue}
                                      </span>
                                  </div>
                                  )
                              )
                          }
                      </>
              }
              <div className={'CategoryMenuSeparator'}>
                  Pretrazi po nazivu
              </div>
              <div className={'CategoryMenuItem input'}>
                  <input placeholder={"Tus kabina 90x90"} onChange={handleFilterChange} name={"productName"} />
              </div>
              <div className={'CategoryMenuSeparator'}>
                  Kategorije
              </div>
              <Link to={`/products/all/page/1`}>
                  <div className={'CategoryMenuItem ripple'}>Početna</div>
              </Link>
              {
                categories.map(category => {
                    const categoryUrl =
                        isDesktop() ?
                            `/products/${category.url_name}/page/${page || 1}`
                            :
                            `/products/${category.url_name}/page/${page || 1}/menu`
                    return   (
                        <Link  key={category.id} to={categoryUrl}>
                            <div className={'CategoryMenuItem ripple'}>
                                {category.name}
                            </div>
                        </Link>
                        )
                })
              }
              <Link to={`/products/sale/page/1`}>
                  <div className={'CategoryMenuItem ripple'}>Rasprodaja</div>
              </Link>
              <div className={'CategoryMenuSeparator'}>
                  Pretrazi po cijeni
              </div>
              <div className={'CategoryMenuItem input'}>
                  <input placeholder={"Max"} onChange={handleFilterChange} type={"number"} name={"maxPrice"} />
              </div>
              <div className={'CategoryMenuItem input'}>
                  <input placeholder={"Min"} onChange={handleFilterChange} type={"number"} name={"minPrice"} />
              </div>
              <div className={'CategoryMenuItem categoryButtons ripple'}>
                  <Button onClick={handleFilterSubmit}>
                      Pretraži
                  </Button>
                  <Button onClick={handleClose} className={isDesktop() && 'hide'}>
                      Zatvori
                  </Button>
              </div>
          </div>
      </div>
  )
};

export default CategoryMenu;
