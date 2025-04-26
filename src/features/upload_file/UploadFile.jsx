import {Link} from "react-router-dom";
import styles from "./UploadFile.module.css";
function UploadFile(){
    return(
        <div className={styles.modalContainer}>
            <h1>Upload File</h1>
            <div className={styles.modeSwitcher}>
                <div></div>
                <div></div>
            </div>
            <Link to="/">Back</Link>

        </div>
     )
}

export default UploadFile;