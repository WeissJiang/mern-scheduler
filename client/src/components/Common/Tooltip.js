import React from 'react';
import { Tooltip } from 'reactstrap';
import './style.scss';

export default function CustomTooltip({tooltipOpen, setTooltipOpen, target, placement, content}) {
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <Tooltip
                isOpen={tooltipOpen}
                target={target}
                toggle={toggle}
                placement={placement}
            >
                <h5>{content.title}</h5>
                <hr/>
                {
                    content.dotPoints.length === 0
                        ? <p>No Details</p>
                        : <ul
                            style={{
                                margin: '0px 0px 0px 20px',
                                padding: '0px',
                                textAlign: 'start'
                            }} >
                            {
                                content.dotPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))  
                            }
                        </ul>
                }
            </Tooltip>
        </>
    )
}