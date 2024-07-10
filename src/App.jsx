import "./App.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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

    const addJob = (newJobData) => {
        setLocalData((prevLocalData) => {
            return {
                ...prevLocalData,
                [newJobData.jobId]: newJobData
            };
        });
        setIsOpened(false);
    };

    const saveJob = (jobData) => {
        setLocalData((prevLocalData) => {
            return {
                ...prevLocalData,
                [jobData.jobId]: jobData
            };
        });

        setCurrentJob(null);
        setIsOpened(false);
    };

    const updateJobStatus = (jobId, jobStatus) => {
        setLocalData((prevLocalData) => {
            return {
                ...prevLocalData,
                [jobId]: {
                    ...prevLocalData[jobId],
                    jobStatus
                }
            };
        });
    };

    const removeJob = (jobId) => {
        setLocalData((prevLocalData) => {
            const { [jobId]: _, ...result } = prevLocalData;

            return result;
        });
    };

    const clearAllJobs = () => {
        setLocalData({});
    };

    const editJob = (jobId) => {
        setCurrentJob(localData[jobId]);
        setIsOpened(true);
    };

    const clearCurrentJob = () => {
        setCurrentJob(null);
    };

    const closeModal = () => {
        setCurrentJob(null);
        setIsOpened(false);
    };

    const getJobList = (jobFilter = "") => {
        const jobsSort = (jobsToSort) => {
            return jobsToSort.sort((a, b) => {
                if (a.jobTitle.toUpperCase() > b.jobTitle.toUpperCase()) {
                    return 1;
                }

                return -1;
            });
        };

        return jobsSort(
            Object.values(localData).filter((job) => {
                if (jobFilter) {
                    return job.jobStatus === jobFilter;
                }

                return job.jobStatus !== "denied";
            })
        );
    };

    return (
        <div>
            <div className="flex gap-3 px-4 py-2 justify-between">
                <div>
                    <button onClick={() => setIsOpened(true)}>Add Job</button>
                </div>
                <button onClick={clearAllJobs}>Clear All Jobs</button>
            </div>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 1150: 3, 1640: 4 }}
            >
                <Masonry>
                    {localData &&
                        getJobList().map((job) => (
                            <div className="p-3" key={job.jobId}>
                                <Job
                                    job={job}
                                    removeJob={removeJob}
                                    editJob={editJob}
                                    updateJobStatus={updateJobStatus}
                                />
                            </div>
                        ))}
                </Masonry>
            </ResponsiveMasonry>
            <p className="px-4">Denied</p>
            <ul className="flex flex-wrap">
                {localData &&
                    getJobList("denied").map((job) => (
                        <li className="w-1/3 p-3" key={job.jobId}>
                            <Job
                                job={job}
                                removeJob={removeJob}
                                editJob={editJob}
                                updateJobStatus={updateJobStatus}
                            />
                        </li>
                    ))}
            </ul>
            <DialogModal
                isOpened={isOpened}
                closeModal={closeModal}
                title={currentJob ? "Edit Job" : "Add Job"}
            >
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
