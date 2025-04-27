import * as React from 'react';
import { uploadFile, uploadManualInput } from "../../services/uploadFileService";
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
    const fileInputRef = React.useRef(null);

    //manages current mode: manual input/file upload
    const [mode, setMode] = React.useState('manual');

    const [courseName, setCourseName] = React.useState('');
    const [courseNameError, setCourseNameError] = React.useState('');

    const [assignmentName, setAssignmentName] = React.useState('');
    const [assignmentNameError, setAssignmentNameError] = React.useState('');

    const [description, setDescription] = React.useState('');

    const [dueDate, setDueDate] = React.useState(null);
    const [dueDateError, setDueDateError] = React.useState('');

    const [dueTime, setDueTime] = React.useState(() => {
        const d = new Date();
        d.setHours(23, 59, 0, 0);
        return d;
    });
    const [dueTimeError, setDueTimeError] = React.useState('');

    const [file, setFile] = React.useState(null);


    const resetInputRegion = ()=>{
        setCourseName('');
        setAssignmentName('');
        setDescription('');
        setDueDate(null);
        setDueTime(new Date(new Date().setHours(23,59,0,0)));
    }

    const handleFileExchange =(e) => {
        setFile(e.target.files[0]);
    }

    const validateInputs = () => {
        let isValid = true;

        if (!courseName.trim()) {
            setCourseNameError('Course name is required');
            isValid = false;
        } else {
            setCourseNameError('');
        }

        if (!assignmentName.trim()) {
            setAssignmentNameError('Assignment name is required');
            isValid = false;
        } else {
            setAssignmentNameError('');
        }

        if (!dueDate) {
            setDueDateError('Due date is required');
            isValid = false;
        } else {
            setDueDateError('');
        }

        if (!dueTime) {
            setDueTimeError('Due time is required');
            isValid = false;
        } else {
            setDueTimeError('');
        }

        return isValid;
    };

    const handleInputChange = (setter, errorSetter) => (e) => {
        setter(e.target.value);
        if (errorSetter && e.target.value.trim()) {
            errorSetter('');
        }
    };





    const handleSubmit = async ()=>{
        if(mode === "file"){
            const formData = new FormData();
            formData.append("file", file);
            try{
                const response = await uploadFile(formData);
            }catch (error){
                console.error(error);
            }
        }else if(mode === "manual"){
            if(!validateInputs()){
                return;
            }
            const formattedDueDate = dueDate.toISOString().split('T')[0];
            const formattedDueTime = dueTime.getHours().toString().padStart(2, '0') +
                ':' +
                dueTime.getMinutes().toString().padStart(2, '0');

            const assignmentData = {
                courseName,
                assignmentName,
                description,
                formattedDueDate,
                formattedDueTime,
            }
            console.log(assignmentData);
            try{
                const response = await uploadManualInput(assignmentData);
                resetInputRegion();

            }catch (e){

            }

        }
    }


    return(
        <div className={styles.modalContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Upload File</div>
                <div className={styles.closeButtonWrapper}>
                    {/*Direct to home page when the close button is clicked*/}
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
                        <div className={`${styles.inputBar} ${courseNameError ? styles.errorInput : ''}`}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faChalkboardUser}/>
                            <input
                                type="text"
                                value={courseName}
                                onChange={handleInputChange(setCourseName, setCourseNameError)}
                                className={styles.inputText}
                                placeholder="Enter course name..."
                            />
                        </div>
                        {courseNameError && <div className={styles.errorMessage}>{courseNameError}</div>}
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}>Assignment Name</label>
                        <div className={`${styles.inputBar} ${assignmentNameError ? styles.errorInput: ''}`}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faBook}/>
                            <input type="text"
                                   value={assignmentName}
                                   onChange={handleInputChange(setAssignmentName, setAssignmentNameError)}
                                   className={styles.inputText}
                                   placeholder="Enter assignment name..."
                            />
                        </div>
                        {assignmentNameError && <div className={styles.errorMessage}>{assignmentNameError}</div>}

                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}> Assignment Due Date</label>
                        <div className={styles.dueDateSelector}>
                            <CustomDatePicker
                                label="Due Date"
                                value={dueDate}
                                onChange={(newValue) => setDueDate(newValue)}
                                error={!!dueDateError}
                                minDate={new Date('2023-01-01')}
                                maxDate={new Date('2025-12-31')}
                            />
                            <div className={styles.dateSelectorDivider}>
                                at
                            </div>
                            <CustomTimePicker
                                label="Select Time"
                                value={dueTime}
                                error={!!dueTimeError}
                                onChange={(newValue) => setDueTime(newValue)}
                                width={400}
                            />
                        </div>
                        <div className={styles.dueDateTimeWrapper}>
                            {dueDateError && <div className={styles.errorMessage}>{dueDateError}</div>}
                            {dueTimeError && <div className={styles.errorMessage}>{dueTimeError}</div>}
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Description</label>
                        <div className={styles.inputBar}>
                            <FontAwesomeIcon className={styles.inputIcon} icon={faInfoCircle}/>
                            <input
                                type="textarea"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                className={styles.inputText}
                                placeholder="Enter assignment description..."/>
                        </div>
                    </div>
                </div>)}
                {mode === "file" && (<div className={styles.fileUploadRegion}>
                    <FontAwesomeIcon icon={faFileCsv} className={styles.fileIcon}/>
                    <div className={styles.fileUploadInstruction}>
                        Drag and Drop or
                        <span className={styles.browseText}   onClick={
                            () => fileInputRef.current.click()}
                        > Browse</span> to <br/>
                        Upload CSV File
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileExchange}
                    />
                </div>)}
            </div>
            <hr className={styles.divider}/>
            <div className={styles.submitRegion}>
                <Link to="/">
                    <div className={styles.cancelButton}>Cancel</div>
                </Link>
                <div className={styles.submitButton} onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default UploadFile;