import './Home.scss';

export default function Home(){
    const url = process.env.REACT_APP_API_URL;
    return (
        <div className="home-page">
            <p>Home Page</p>
            <p>{url}</p>
        </div>
    )
}