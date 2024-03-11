import { useEffect } from 'react';
import './CloudRain.scss'



const rainText = () => {
    const text = "weissjiang";
    return text[Math.floor(Math.random() * text.length)];
}

const rain = () => {
    const cloud = document.querySelector('.cloud');
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('drop');
    cloud.appendChild(rainDrop);

    rainDrop.innerText = rainText();
    rainDrop.style.left = Math.floor(Math.random() * 200) + 'px';
    rainDrop.style.fontSize = 0.5 + Math.random() * 1.5 + 'em';
}

const removeRainDrops = () => {
    const dropNodes = document.querySelectorAll(".drop");
    const dropDivs = [...dropNodes];
    for (let i = 0; i < dropDivs.length; i++) {
        if(i === 100) break
        const endDrop = dropDivs[i];
        const parent = endDrop.parentNode;
        parent.removeChild(endDrop);
    }
}

export default function CloudRain({ forceRefresh }) {
    useEffect(() => {
        console.log(`force to refresh cloud rain component? ${forceRefresh}`)
        removeRainDrops();
        const test = setInterval(() => {
            rain()
        }, 50)
        setTimeout(function(){
            clearInterval( test );
        }, 2000);
    })

    return (
        <div className="cloud-rain-container">
            <div className="cloud">
                <p className='text'>Cloud Rain</p>
            </div>
        </div>
    )
}