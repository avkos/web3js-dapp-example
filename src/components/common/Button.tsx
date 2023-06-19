import React from 'react'


export const Button = (props: { label: any; onClick: any }) => {
    const {label, onClick} = props
    return (
        <div className='InputComponent'>
            <button type='button' onClick={onClick}>{label}</button>
        </div>
    )
}