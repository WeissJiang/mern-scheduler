import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Input,
    Progress
} from 'reactstrap';
import './Ticket.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateTicket, addHours, selectTicketById} from '../../../store/tickets/action';
import { setToast } from '../../../store/toast/action';

export default function TicketDetail({ modal, setModal, ticket }) {
    const [title, setTitle] = useState(ticket.title);
    const [description, setDescription] = useState(ticket.description);
    const [hours, setHours] = useState(ticket.hours);
    const [estimate, setEstimate] = useState(parseFloat(ticket.estimate) || 0);
    const [enableEditLogs, setEnableEditLogs] = useState(false);

    /**
     * ticket estimate is hours, 2 is 2 hours, 0.5 is half an hour
     */
    const updatedTicket = useSelector(state => selectTicketById(state, ticket._id));
    useEffect(() => {
        if (updatedTicket) {
            setHours(updatedTicket.hours);
        }
    }, [updatedTicket]);

    const calcProgress = () => {
        if(hours.length === 0){
            return 0;
        } else {
            const totalHours = hours.reduce((accum, curr) => parseFloat(accum) + (parseFloat(curr.time) || 0), 0);
            const ratio = totalHours / parseFloat(ticket.estimate);
            return ratio * 100;
        }
    }

    const openLogInput = () => {
        setEnableEditLogs((enableEditLogs) => !enableEditLogs);
    }

    const dispatch = useDispatch();
    const toggle = () => setModal((modal) => !modal);
    const save = (field, value) => {
        const data = {};
        switch(field){
            case "title":
                data.title = title;
                setTitle((title) => title = value);
                break;
            case "description":
                data.description = description;
                setDescription((description) => description = value);
                break;
            case "estimate": 
                data.estimate = estimate;
                setEstimate((estimate) => estimate = value);
                break;
            default:
                console.log(`invalid field: ${field}`);
        }

        if(Object.keys(data).length > 0){
            dispatch(updateTicket({id: ticket._id, data}))
            .then(() => {
                dispatch(setToast({ message: "Ticket updated successfully!", type: "success" }));
            })
            .catch((e) => {
                dispatch(setToast({ message: e.toString(), type: "error" }));
            });
        }else{
            dispatch(setToast({ message: "Nothing happened", type: "info" }));
        }
    }

    const logTime = (field, value) => {
        setEnableEditLogs((enableEditLogs) => !enableEditLogs);

        const data = {
            ticket: ticket._id,
            time: parseFloat(value),
            user: '65e8260e88b17273c52a7703'
        }

        if(value == null || value === 0 || value === ""){
            dispatch(setToast({ message: "Log time must be greater than 0.", type: "info" }));
            return;
        }else{
            dispatch(addHours({data}))
            .then(() => {
                dispatch(setToast({ message: "Ticket updated successfully!", type: "success" }));
            })
            .catch((e) => {
                dispatch(setToast({ message: e.toString(), type: "error" }));
            });
        }
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    <input
                        id="title"
                        className='editable-title'
                        name="Title"
                        type="text"
                        style={{
                            fontSize: '32px',
                            fontWeight: '600'
                        }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={e => save(e.target.id, e.target.value)}
                    />
                </ModalHeader>
                <ModalBody>
                    <div className='ticket-input'>
                        <label htmlFor="description">
                            Description
                        </label>
                        <input
                            id="description"
                            className='editable-title'
                            name="Description"
                            placeholder="Add Description"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onBlur={e => save(e.target.id, e.target.value)}
                        />
                    </div>

                    <div className='ticket-input'>
                        <label htmlFor="estimate">
                            Estimate: 
                        </label>
                        <input
                            id="estimate"
                            className='editable-title'
                            name="Estimate"
                            type="number"
                            value={estimate}
                            onChange={e => setEstimate(e.target.value)}
                            onBlur={e => save(e.target.id, e.target.value)}
                        />
                        <Progress
                            animated
                            value={calcProgress(ticket.estimate)}
                            onClick={openLogInput}
                        />
                        {
                            enableEditLogs 
                            ? <div className='logs-section'>
                                <Input
                                    id="hour"
                                    name="hour"
                                    placeholder="Log Hours"
                                    type="number"
                                    className='editable-title'
                                    onKeyDown={
                                        e => {
                                            if (e.key === 'Enter') {
                                                logTime(e.target.id, e.target.value);
                                            }
                                        }
                                    }
                                />
                                {/* {
                                    hours.length === 0
                                    ? null
                                    : hours.map((hour, index) => {
                                        return <div>
                                            <Input
                                            id="hour"
                                            name="hour"
                                            placeholder="Log Hours"
                                            type="number"
                                            className='editable-title'
                                            onKeyDown={
                                                e => {
                                                    if (e.key === 'Enter') {
                                                        logTime(e.target.id, e.target.value);
                                                    }
                                                }
                                            }
                                        />
                                        </div>
                                    })
                                } */}
                            </div>
                            : null
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                {/* <Button color="primary" onClick={save}>
                    Save
                </Button>{' '} */}
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
  }