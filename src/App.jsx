import "./App.css";

import { useEffect, useState } from "react";

import AddJob from "./components/AddJob";
import Job from "./components/job";

const App = () => {
    const [localData, setLocalData] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);

    useEffect(() => {
        console.log("useEffect");
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
    };

    const clearCurrentJob = () => {
        setCurrentJob(null);
    };

    return (
        <div>
            <button onClick={clearAllJobs}>Clear</button>
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
            <div>
                <AddJob
                    addJob={addJob}
                    saveJob={saveJob}
                    currentJob={currentJob}
                    clearCurrentJob={clearCurrentJob}
                />
            </div>
        </div>
    );
};

export default App;
