import PropTypes from 'prop-types';
import { useState } from "react";
import Dropdown from "../../Header/Dropdown/Dropdown";
import "./Dropdown.scss";

const GameCreate = (
    {   
        title,
        itemToList,
    }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const [itemsList, setItemsList] = itemToList;

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    return (
        <div>
            <div className="custom-dropdown">
                <div className={
                    "custom-dropdown-selection " + (isDropdownVisible ? "visible " : "") + (selectedItemIndex != undefined ? itemsList[selectedItemIndex].class : title.class)
                    } onClick={event => {
                        setIsDropdownVisible(!isDropdownVisible);
                    }
                }>
                    {selectedItemIndex != null ? itemsList[selectedItemIndex].name : title.name}
                </div>
                {
                    isDropdownVisible ? (
                        <div className="items-holder">
                            {
                                itemsList.map((item, index) => (
                                    <div key={item.value} className={`dropdown-item ${item.class}`} onClick={event => {
                                        setSelectedItemIndex(index);
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

GameCreate.propTypes = {
    title: PropTypes.object.isRequired,
    itemToList: PropTypes.array.isRequired,
}

export default GameCreate;