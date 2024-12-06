import React, { useState } from 'react';

function Dropdown({setViewInit, viewInit, initiatives}) {
     const[district, setDistrict] = useState('');

     function changeCurrentDistrictHandler(newDistrict) {
        setDistrict(newDistrict)
        setViewInit(initiatives)
        if (newDistrict !== '') {
            const newViewInit = initiatives.filter((el) => el.level === newDistrict) 
            setViewInit(newViewInit)
        }
     }

    return (
        <div>
            <div className="input-group mb-3" style={{display: 'flex', padding: '34px', justifyContent : 'space-between' }}>
            <a className="dropdown-item" onClick={() => changeCurrentDistrictHandler("")}>Все</a>
            <a className="dropdown-item" onClick={() => changeCurrentDistrictHandler('Федеральный')}>Федеральные</a>
            <a className="dropdown-item" onClick={() => changeCurrentDistrictHandler('Региональный')}>Региональные</a>
            <a className="dropdown-item" onClick={() => changeCurrentDistrictHandler("Муниципальный")}>Муниципальные</a>
                </div>

                {/* <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" onClick={() => changeCurrentDistrictHandler("")}>Все</a></li>
                        <li><a className="dropdown-item" onClick={() => changeCurrentDistrictHandler('Федеральный')}>Федеральные</a></li>
                        <li><a className="dropdown-item" onClick={() => changeCurrentDistrictHandler('Региональный')}>РегиОнальные</a></li>
                        <li><a className="dropdown-item" onClick={() => changeCurrentDistrictHandler("Муниципальный")}>Муниципальные</a></li>
                    </ul> */}
        </div>
    );
}

export default Dropdown;