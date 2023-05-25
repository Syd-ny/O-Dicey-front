import PropTypes from 'prop-types';
import { useState } from "react";
import "./Dropdown.scss";

const Dropdown = (
    {   
        title,
        itemToList,
        valueDropdown,
        defaultValue,
    }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    
    return (
        <div>
            <div className="custom-dropdown">
                <div className={
                    "custom-dropdown-selection " + (isDropdownVisible ? "visible " : "") + (
                        selectedItemIndex != undefined
                            ? itemToList[selectedItemIndex].class 
                            : defaultValue != null 
                                ? itemToList[defaultValue].class 
                                : title.class
                        )
                    } onClick={event => {
                        setIsDropdownVisible(!isDropdownVisible);
                    }
                }>
                    {
                        selectedItemIndex != null
                            ? itemToList[selectedItemIndex].name
                            : defaultValue != null
                                ? itemToList[defaultValue].name 
                                : title.name
                    }
                </div>
                {
                    isDropdownVisible ? (
                        <div className="items-holder">
                            {
                                itemToList.map((item, index) => (
                                    <div key={item.id} className={`dropdown-item ${item.class}`} onClick={event => {
                                        setSelectedItemIndex(index);
                                        valueDropdown(item.id);
                                        setIsDropdownVisible(false);
                                    }}>
                                        {
                                            item.name
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ) : <></>
                }
            </div>
        </div>

    )
}

Dropdown.propTypes = {
    title: PropTypes.object.isRequired,
    itemToList: PropTypes.array.isRequired,
    // valueDropdown: PropTypes.function
}

export default Dropdown;