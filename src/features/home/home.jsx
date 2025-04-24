import { Link } from 'react-router-dom';


function HomePage(){
    return(
        <div>
            <h1>Home Page</h1>
            <div style={{display: "flex", gap: "50px"}}>
                <Link to="/login">Login Page</Link>
                <Link to="/register">Register Page</Link>
                <Link to="/course/0">Course Template Page</Link>
                <Link to="/upload-file">Upload File Page</Link>
            </div>
        </div>
    );

}

export default HomePage