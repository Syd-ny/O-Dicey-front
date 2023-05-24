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
                    "custom-dropdown-selection " + (isDropdownVisible ? "visible " : "") + (defaultValue != null ? itemToList[defaultValue].class : selectedItemIndex != undefined ? itemToList[selectedItemIndex].class : title.class)
                    } onClick={event => {
                        setIsDropdownVisible(!isDropdownVisible);
                    }
                }>
                    {defaultValue != null ? itemToList[defaultValue].name : selectedItemIndex != null ? itemToList[selectedItemIndex].name : title.name}
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