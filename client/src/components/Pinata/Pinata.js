import { useState } from 'react';
import { Segmented, Tabs } from 'antd';
import CloudRain from './CloudRain';
import './Pinata.scss';

export default function Pinata(){
    const [mode, setMode] = useState('top');

    const onChange = (key) => {
        console.log(key);
        setForceRefreshCloud(() => key === 'cloud-rain' ? true : false)
    };

    const [forceRefreshCloud, setForceRefreshCloud] = useState(false)

    const pinataTabs = [
        {
            label: 'Cloud Rain',
            key: 'cloud-rain',
            children: (
                <CloudRain forceRefresh={forceRefreshCloud} />
            )
        },
        {
            label: 'Custom Cursor',
            key: 'custom-cursor',
            children: (
                <p>TODO</p>
            )
        }
    ]

    return (
        <div className='pinata-tabs'>
            <Segmented
                defaultValue="top"
                onChange={(value) => setMode(value)}
                options={['top', 'left']}
                block
            />
            <Tabs
                tabPosition={mode}
                items={pinataTabs}
                onChange={onChange}
            />
        </div>
    )
}