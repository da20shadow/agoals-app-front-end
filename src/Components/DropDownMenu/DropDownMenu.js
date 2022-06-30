function DropDownMenu({showHide,activeMenu, menus}) {

    const dropDownStyle = {
        left: '-37px',
    }

    return (
        <>
            <button className={'text-sm whitespace-nowrap'}>{activeMenu ? activeMenu : 'Loading..'}</button>
            <div className={`absolute bg-light-gray w-32 drop-shadow-lg z-20 ${showHide}`}
                 style={dropDownStyle}>

                {
                    menus.map(menu => {
                        return (
                            <div key={menu.menu}
                                 onClick={menu.onClickFun}
                                 className={`text-sm cursor-pointer flex justify-start items-center py-2 px-3 hover:bg-green-bg 
                                            whitespace-nowrap flex-nowrap ${menu.textColor && `text-${menu.textColor}`}`}
                                 >
                                {menu.icon && menu.icon}
                                <span className={`pl-2`}>{menu.menu}</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DropDownMenu;