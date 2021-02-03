import React, {useEffect, useState} from 'react';

import "./CategoryMenu.style.css";
import API from "../../API";

const CategoryMenu = ({setFilters}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        API.shopRequest('category')
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [setCategories]);

    const handleCategoryClick = (categoryId) => {
        switch (categoryId) {
            case "sale":
                setFilters({is_sale: true});
                break;
            case null:
                setFilters(null)
                break;
            default:
                setFilters({category: categoryId});
        }
    };

    if(categories.length <= 0) {
        return null;
    }

  return (
      <div className={'CategoryMenu'}>
          <div className={'CategoryMenuItemContainer'}>
              <div className={'CategoryMenuItem ripple'} onClick={() => handleCategoryClick(null)}>Početna</div>
              {
                categories.map(category => {
                    return   <div key={category.id} className={'CategoryMenuItem ripple'} onClick={() => handleCategoryClick(category.id)}>{category.name}</div>
                })
              }
              <div className={'CategoryMenuItem ripple'} onClick={() => handleCategoryClick("sale")}>Rasprodaja</div>
          </div>
      </div>
  )
};

export default CategoryMenu;
