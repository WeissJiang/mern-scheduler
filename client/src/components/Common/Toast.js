import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../../store/toast/action';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

export default function NormalToast(props) {
    const toast = useSelector(state => state.toast);
    
    const dispatch = useDispatch();

    useEffect(() => {
        let timer;
        if (toast.message) {
          timer = setTimeout(() => {
            dispatch(clearToast());
          }, 5000); 
        }
        return () => {
          if (timer) {
            clearTimeout(timer);
          }
        };
    }, [toast.message, dispatch]);

    if (!toast || !toast.message) return null;

    const color = {
        info: "p-3 bg-primary my-2 rounded",
        error: "p-3 bg-danger my-2 rounded",
        success: "p-3 bg-success my-2 rounded"
    }

  if (!toast.message) return null;
    return (
        <>
            <div 
                style={{
                    position: 'fixed',
                    zIndex: 101,
                    opacity: 0.8,
                    top: '20px',
                    right: '20px'
                }}
                className={color[toast.type] || 'p-3 bg-primary my-2 rounded'}
            >
                <Toast>
                    <ToastHeader>
                        Message
                    </ToastHeader>
                    <ToastBody>
                        {toast.message}
                    </ToastBody>
                </Toast>
            </div>
        </>
    )
}