import "./App.css";

import { useEffect, useState } from "react";

import AddJob from "./components/AddJob";
import DialogModal from "./components/DialogModal";
import Job from "./components/job";

const App = () => {
    const [localData, setLocalData] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const localStorageTracker = localStorage.getItem("applyTracker");

        if (!localStorageTracker) {
            setLocalData([]);
        } else {
            setLocalData(JSON.parse(localStorageTracker));
        }
    }, []);

    useEffect(() => {
        if (localData) {
            localStorage.setItem("applyTracker", JSON.stringify(localData));
        }
    }, [localData]);

    const findJob = (jobId) => {
        return localData.reduce((acc, cur) => {
            if (acc) {
                return acc;
            }

            if (cur.jobId === jobId) {
                return cur;
            }

            return null;
        }, null);
    };

    const addJob = (jobData) => {
        setLocalData((prevLocalData) => {
            return [...prevLocalData, jobData];
        });
        setIsOpened(false);
    };

    const saveJob = (jobData) => {
        if (!findJob(jobData.jobId)) {
            alert("WTF");
            return;
        }

        const newData = [...localData].map((job) => {
            if (job.jobId === jobData.jobId) {
                return jobData;
            }

            return job;
        });

        setLocalData(() => {
            return newData;
        });

        setCurrentJob(null);
        setIsOpened(false);
    };

    const removeJob = (jobId) => {
        console.log("jobid", jobId);
        setLocalData((prevLocalData) => {
            return prevLocalData.filter((job) => {
                return job.jobId !== jobId;
            });
        });
    };

    const clearAllJobs = () => {
        setLocalData([]);
    };

    const editJob = (jobData) => {
        const thing = findJob(jobData);
        setCurrentJob(thing);
        setIsOpened(true);
    };

    const clearCurrentJob = () => {
        setCurrentJob(null);
    };

    const closeModal = () => {
        setCurrentJob(null);
        setIsOpened(false);
    };

    return (
        <div>
            <div className="flex gap-3 px-4 py-2 justify-between">
                <button onClick={() => setIsOpened(true)}>Add Job</button>
                <button onClick={clearAllJobs}>Clear All Jobs</button>
            </div>
            <ul className="flex flex-wrap">
                {localData &&
                    localData.map((job) => (
                        <li className="w-1/3 p-3">
                            <Job
                                job={job}
                                removeJob={removeJob}
                                editJob={editJob}
                            />
                        </li>
                    ))}
            </ul>
            <DialogModal isOpened={isOpened} closeModal={closeModal}>
                <AddJob
                    addJob={addJob}
                    saveJob={saveJob}
                    currentJob={currentJob}
                    clearCurrentJob={clearCurrentJob}
                />
            </DialogModal>
        </div>
    );
};

export default App;
