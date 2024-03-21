import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './style.scss';

export default function RadioButtons({ items, rSelected, setRSelected}) {
    // console.log(`selected: ${rSelected}`);
    return (
        <>
            <ButtonGroup>
                {
                    items.length === 0 
                    ? <div></div>
                    : items.map((item, index) => {
                        return <Button
                            key={index}
                            outline
                            onClick={() => setRSelected(item.id)}
                            active={rSelected === item.id}
                        >
                            { item.name }
                        </Button>
                    })
                }
            </ButtonGroup>
        </>
    )
}