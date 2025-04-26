import * as React from 'react';
import {Link} from "react-router-dom";
import CustomDatePicker from "../../components/DatePicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faFileCsv,
    faChalkboardUser,
    faBook,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UploadFile.module.css";
import CustomTimePicker from "../../components/TimePicker";


function UploadFile(){
    const [mode, setMode] = React.useState('manual');
    const [dueDate, setDueDate] = React.useState(null);
    const [dueTime, setDueTime] = React.useState(() => {
        const d = new Date();
        d.setHours(23, 59, 0, 0);
        return d;
    });
    return(
        <div className={styles.modalContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Upload File</div>
                <div className={styles.closeButtonWrapper}>
                    <Link to="/">
                        <FontAwesomeIcon icon={faXmark}/>
                    </Link>
                </div>
            </div>
            <div className={styles.modeSwitcher}>
                <div
                    className={`${styles.modeButton} ${mode === 'manual' ? styles.active : ''}`}
                    onClick={() => setMode('manual')}
                >
                    Manual Input
                </div>
                <div
                    className={`${styles.modeButton} ${mode === 'file' ? styles.active : ''}`}
                    onClick={() => setMode('file')}
                >
                    File Upload
                </div>
            </div>
            <div className={styles.inputUploadRegion}>
                {mode === "manual" && (<div className={styles.manualInputRegion}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Course Name</label>
                        <div className={styles.inputBar}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faChalkboardUser}/>
                            <input type="text" className={styles.inputText} placeholder="Enter course name..."/>
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Assignment Name</label>
                        <div className={styles.inputBar}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faBook}/>
                            <input type="text" className={styles.inputText} placeholder="Enter assignment name..."/>
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}> Assignment Due Date</label>
                        <div className={styles.dueDateSelector}>
                            <CustomDatePicker
                                label="Due Date"
                                value={dueDate}
                                onChange={(newValue) => setDueDate(newValue)}
                                minDate={new Date('2023-01-01')}
                                maxDate={new Date('2025-12-31')}
                            />
                            <div className={styles.dateSelectorDivider}>
                                at
                            </div>
                            <CustomTimePicker
                                label="Select Time"
                                value={dueTime}
                                onChange={(newValue) => setDueTime(newValue)}
                                width={400}
                            />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Description</label>
                        <div className={styles.inputBar}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faInfoCircle}/>
                            <input type="textarea" className={styles.inputText} placeholder="Enter assignment description..."/>
                        </div>
                    </div>
                </div>)}
                {mode === "file" && (<div className={styles.fileUploadRegion}>
                    <FontAwesomeIcon icon={faFileCsv} className={styles.fileIcon}/>
                    <div className={styles.fileUploadInstruction}>
                        Drag and Drop or <span className={styles.browseText}>Browse</span> to <br/>
                        Upload CSV File
                    </div>
                </div>)}
            </div>
            <hr className={styles.divider}/>
            <div className={styles.submitRegion}>
                <div className={styles.cancelButton}>Cancel</div>
                <div className={styles.submitButton}>Sumbit</div>
            </div>
        </div>
    );
}

export default UploadFile;