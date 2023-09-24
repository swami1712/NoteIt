import React from 'react'

export default function Navbar(props) {
    return (
        <>
            <div className='navbar'>
                <div className='title'>{props.title}</div>
            </div>
        </>
    )
}
