import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const WebPotals = (props) => {
    return (
        <div className="portal-card">
            <Link to={props.link} target="_blank" >
                <img src={props.url} alt="cong dich vu" className="portal-image" />
            </Link>
        </div>
    )
}

export default WebPotals
