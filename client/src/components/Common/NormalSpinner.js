import { Spinner } from 'reactstrap';

export default function NormalSpinner(props) {
    return (
        <>
            <Spinner 
                style={{
                    color:props.color
                }}
            ></Spinner>
        </>
    )
}