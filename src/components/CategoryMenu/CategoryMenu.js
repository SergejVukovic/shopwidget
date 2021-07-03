import React, {useEffect, useState} from 'react';
import { useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

import {desktopStyle, isDesktop} from "../../utils";
import RightArrowIcon from "../../assets/icons/react-icons/RightArrowIcon";

const CategoryMenuNav = styled.nav`
    display: flex;
    flex-direction: column;
    max-height: 200px;
    height: ${props => props.mounted ? '100%' : 0};
    width: calc(100% - 20px); /* Set the width of the sidebar */
    z-index: 998; /* Stay on top */
    overflow-x: hidden; /* Disable horizontal scroll */
    overflow-y: auto;
    background-color: #ffffff;
    position: fixed;
    bottom: 15px;
    transition: all 0.8s ease 0s;
    padding-bottom: 70px;
    border: 0.1rem solid #ebebeb;
    border-radius: 30px;
    left: 0;
    right: 0;
    margin: auto;

    ${desktopStyle(
        `
            height: auto;
            max-height: none;
            position: relative;
            width: auto;
            border-radius: 0;
            padding: 20px 10px 0 10px;
            bottom: 0;
            text-align: left;
            margin-top: 0;
        `
    )}
`;

const NavigationLink = styled(NavLink)`
    padding: 7px 0;
    align-items: center;
    text-decoration: none;
    color: grey;
    border-bottom: 0.1rem solid #ebebeb;
    border-radius: 30px;
    width: 100%;
    svg {
      display: none;
    }
      ${desktopStyle(
    `
          display: flex;
          justify-content: space-between;
          border: none;
          border-radius: 0;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
          transition: all 0.3s ease 0s;
          :hover {
            color: rgb(0, 158, 127);
          }
          svg{
            display: block;
          }
        `
)}
`;

const CategoryMenu = () => {

    // const [localFilters, setLocalFilters] = useState(null);
    // const [currentCategory, setCurrentCategory] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    // const filters = useSelector(state => state.filters);
    const categories = useSelector(state => state.shop.categories);

    // const history = useHistory();
    // const dispatch = useDispatch();
    // const {page} = useParams();

    // useEffect(() => {
    //
    //     if(category === "sale") {
    //         setCurrentCategory({
    //             id:101,
    //             name: 'rasprodaja',
    //             url_name: 'is_sale'
    //         })
    //         return;
    //     }
    //     const nextCurrentCategory = categories?.filter(shopCategory => shopCategory.url_name === category)[0];
    //     setCurrentCategory(nextCurrentCategory || null);
    //
    // }, [category, setCurrentCategory, categories]);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, [])

    // const handleFilterChange = (event) => {
    //     switch (event.target.name) {
    //         case "productName":
    //             setLocalFilters({...localFilters, name : event.target.value});
    //             break;
    //         case "maxPrice":
    //             setLocalFilters({...localFilters, max : event.target.value});
    //             break;
    //         case "minPrice":
    //             setLocalFilters({...localFilters, min : event.target.value});
    //             break;
    //         default:
    //             return null;
    //     }
    // }

    // const handleFilterSubmit = () => {
    //    dispatch(setFilters(localFilters));
    //    toast.success('Filter primjenjen', {
    //        duration: 2000
    //    });
    // }
    //
    // const handleRemoveFilter = (filterValue) => {
    //     const removedFilterKey = Object.keys(filters).filter(existingFilter => filters[existingFilter] === filterValue);
    //     const {[removedFilterKey] : removed, ...nextFilters} = filters;
    //     dispatch(setFilters(nextFilters));
    // }
    //
    // const handleRemoveCategory = () => {
    //     history.push('/products/all/page/1');
    // }
    //
    // const handleClose = () => {
    //     history.push(`/products/${category || 'all' }/page/1`);
    // }

    if(!categories || !categories.length) {
        return null;
    }

  return (
      <CategoryMenuNav mounted={isMounted}>
          {/*<CategoryMenuContainer>*/}
          {/*    {*/}
          {/*        (Object.keys(filters).length > 0 || currentCategory) &&*/}
          {/*            <>*/}
          {/*                <div className={'CategoryMenuSeparator'}>*/}
          {/*                    Aktivni filteri*/}
          {/*                </div>*/}
          {/*                {*/}
          {/*                    currentCategory &&*/}
          {/*                    <div className={'CategoryMenuItem'} key={currentCategory.id}>*/}
          {/*                            <span className={'filterLabel'} onClick={handleRemoveCategory}>*/}
          {/*                                 x {currentCategory.name}*/}
          {/*                            </span>*/}
          {/*                    </div>*/}
          {/*                }*/}
          {/*                {*/}
          {/*                    Object.values(filters).map(filterValue => (*/}
          {/*                        <div className={'CategoryMenuItem'} key={filterValue}>*/}
          {/*                            <span className={'filterLabel'} onClick={ () => handleRemoveFilter(filterValue)}>*/}
          {/*                                 x {filterValue}*/}
          {/*                            </span>*/}
          {/*                        </div>*/}
          {/*                        )*/}
          {/*                    )*/}
          {/*                }*/}
          {/*            </>*/}
          {/*    }*/}
              {/*<div className={'CategoryMenuSeparator'}>*/}
              {/*    Pretrazi po nazivu*/}
              {/*</div>*/}
              {/*<div className={'CategoryMenuItem input'}>*/}
              {/*    <input placeholder={"Tus kabina 90x90"} onChange={handleFilterChange} name={"productName"} />*/}
              {/*</div>*/}
              {/*<div className={'CategoryMenuSeparator'}>*/}
              {/*    Kategorije*/}
              {/*</div>*/}
              <NavigationLink to={`/products/all/page/1`}>
                   <span>
                       Početna
                   </span>
                  <span>
                      <RightArrowIcon />
                  </span>
              </NavigationLink>
              {
                categories.map(category => {
                    const categoryUrl =
                        isDesktop() ?
                            `/products/${category.url_name}/page/1`
                            :
                            `/products/${category.url_name}/page/1/menu`
                    return   (
                        <NavigationLink  key={category.id} to={categoryUrl}>
                            <span>
                                  {category.name}
                            </span>
                            <span>
                                <RightArrowIcon />
                            </span>
                        </NavigationLink>
                        )
                })
              }
              <NavigationLink to={`/products/sale/page/1`}>
                  <span>
                       Rasprodaja
                  </span>
                  <span>
                      <RightArrowIcon />
                  </span>
              </NavigationLink>
              {/*<div className={'CategoryMenuSeparator'}>*/}
              {/*    Pretrazi po cijeni*/}
              {/*</div>*/}
              {/*<div className={'CategoryMenuItem input'}>*/}
              {/*    <input placeholder={"Max"} onChange={handleFilterChange} type={"number"} name={"maxPrice"} />*/}
              {/*</div>*/}
              {/*<div className={'CategoryMenuItem input'}>*/}
              {/*    <input placeholder={"Min"} onChange={handleFilterChange} type={"number"} name={"minPrice"} />*/}
              {/*</div>*/}
              {/*<div className={'CategoryMenuItem categoryButtons ripple'}>*/}
              {/*    <Button onClick={handleFilterSubmit}>*/}
              {/*        Pretraži*/}
              {/*    </Button>*/}
              {/*    <Button onClick={handleClose} className={isDesktop() ? 'hide' : undefined}>*/}
              {/*        Zatvori*/}
              {/*    </Button>*/}
              {/*</div>*/}
              {/*<div className={'mobile-space'} />*/}
          {/*</CategoryMenuContainer>*/}
      </CategoryMenuNav>
  )
};

export default CategoryMenu;
