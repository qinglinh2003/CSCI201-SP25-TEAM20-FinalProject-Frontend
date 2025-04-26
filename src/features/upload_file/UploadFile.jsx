import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import styles from "./UploadFile.module.css";


function UploadFile(){
    return(
        <div className={styles.modalContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Upload File</div>
                <div className={styles.closeButtonWrapper}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
            <div className={styles.modeSwitcher}>
                <div className={styles.modeButton}>Manual Input</div>
                <div className={styles.modeButton}>File Upload</div>
            </div>

            <div className={styles.fileUploadRegion}>
                <FontAwesomeIcon icon={faFileCsv} className={styles.fileIcon}/>
                <div className={styles.fileUploadInstruction}>
                    Drag and Drop or <span className={styles.browseText}>Browse</span> to <br/>
                    Upload CSV File
                </div>
            </div>
            <hr className={styles.divider}/>

            <Link to="/">Back</Link>
        </div>
    );
}

export default UploadFile;