import * as React from 'react';
import { uploadFile, uploadManualInput } from "../../services/uploadFileService";
import {Link, useNavigate} from "react-router-dom";
import CustomDatePicker from "../../components/DatePicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faFileCsv,
    faChalkboardUser,
    faBook,
    faInfoCircle,
    faArrowUpFromBracket,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UploadFile.module.css";
import CustomTimePicker from "../../components/TimePicker";


function UploadFile(){
    const navigate = useNavigate();

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
    const [fileError, setFileError] = React.useState(null);
    const [submitError, setSubmitError] = React.useState(null);
    const [dragActive, setDragActive] = React.useState(false);

    const resetInputRegion = ()=>{
        setCourseName('');
        setCourseNameError(false);
        setAssignmentName('');
        setAssignmentNameError(false);
        setDescription('');
        setDueDate(null);
        setDueDateError(false);
        setDueTime(new Date(new Date().setHours(23,59,0,0)));
        setDueTimeError(false);
    }

    const resetFile = () => {
        setFile(null);
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    const handleModeSwitch = (newMode) =>{
        setMode(newMode)
        if(newMode === 'manual'){
            resetFile();
        }else if(newMode === 'file'){
            resetInputRegion();
            setFileError(false);
        }
    }

    const handleFileExchange =(e) => {
        setFile(e.target.files[0]);
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.name.endsWith('.csv')) {
                setFile(droppedFile);
            }else{
                setFileError(true);
                resetFile();
            }
        }
    };

    const formatFileSize = (size) => {
        if (size < 1024) {
            return `${size} B`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} KB`;
        } else {
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        }
    };

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
                handleSubmitError();
                console.error(error);
            }finally {
                resetFile();
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
                "courseName":courseName,
                "assignmentName":assignmentName,
                "dueDate":formattedDueDate,
                "dueTime":formattedDueTime,
                "description":description,
            }
            console.log(assignmentData);
            try{
                const response = await uploadManualInput(assignmentData);
                resetInputRegion();

            }catch (e){

            }

        }
    }

    const handleCancel = () => {
        navigate("/");
    }

    const handleSubmitError = () => {
        setSubmitError(true);
    }


    return(
        <div className={styles.modalContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Add Assignments</div>
                <div className={styles.closeButtonWrapper}>
                    {/*Direct to home page when the close button is clicked*/}
                        <FontAwesomeIcon icon={faXmark} onClick={handleCancel}/>
                </div>
            </div>
            <div className={styles.modeSwitcher}>
                <div
                    className={`${styles.modeButton} ${mode === 'manual' ? styles.active : ''}`}
                    onClick={() => handleModeSwitch('manual')}
                >
                    Manual Input
                </div>
                <div
                    className={`${styles.modeButton} ${mode === 'file' ? styles.active : ''}`}
                    onClick={() => handleModeSwitch('file')}
                >
                    Upload File
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
                        {courseNameError && <div className={styles.inputErrorMessage}>{courseNameError}</div>}
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
                        {assignmentNameError && <div className={styles.inputErrorMessage}>{assignmentNameError}</div>}

                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel}> Assignment Due Date</label>
                        <div className={styles.dueDateSelector}>
                            <CustomDatePicker
                                label="Due Date"
                                value={dueDate}
                                onChange={(newValue) => {setDueDate(newValue); setDueDateError('');}}
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
                                onChange={(newValue) => {setDueTime(newValue); setDueTimeError('');}}
                                width={400}
                            />
                        </div>
                        <div className={styles.dueDateTimeWrapper}>
                            {dueDateError && <div className={styles.inputErrorMessage}>{dueDateError}</div>}
                            {dueTimeError && <div className={styles.inputErrorMessage}>{dueTimeError}</div>}
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
                {mode === "file" &&
                    (<div
                        className={`${styles.fileUploadRegion} ${dragActive ? styles.dragActive : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                    <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles.fileIcon}/>
                    <div className={styles.fileUploadInstruction}>
                        Drag and Drop or {' '}
                        <span className={styles.browseText}   onClick={
                            () => fileInputRef.current.click()}
                        >  Browse</span>  to <br/>
                        Upload CSV File
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileExchange}
                        accept=".csv"
                    />
                </div>
            )}
            {mode === 'file' &&  file &&
                (<div className={styles.filePreviewWrapper}>
                    <div className={styles.fileIconNameWrapper}>

                        <FontAwesomeIcon icon={faFileCsv} className={styles.fileIcon}/>
                       <div className={styles.fileName}>
                        {file.name}
                       </div>
                    </div>

                    <div className={styles.fileSize}>
                        {formatFileSize(file.size)}
                    </div>
                        <FontAwesomeIcon icon={faXmark} className={styles.removeFileIcon} onClick={resetFile}/>
                </div>
                )
            }
            {mode === 'file' && fileError && (
                <div className={styles.errorMsg}>
                    <FontAwesomeIcon className={styles.errorIcon} icon={faTriangleExclamation} />
                    <div>Please upload a .csv file</div>
                    <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={() => setFileError(false)}/>
                </div>
            )
            }
            {submitError && (
                <div className={styles.errorMsg}>
                    <FontAwesomeIcon className={styles.errorIcon} icon={faTriangleExclamation} />
                    <div>Unsuccessful Submission</div>
                    <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={() => setSubmitError(false)}/>
                </div>
            )
            }

            </div>
            <hr className={styles.divider}/>
            <div className={styles.submitRegion}>
                <div className={styles.cancelButton} onClick={handleCancel}>Cancel</div>
                <div className={styles.submitButton} onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default UploadFile;