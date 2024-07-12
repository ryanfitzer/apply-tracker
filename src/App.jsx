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
    const [sortData, setSortData] = useState({
        sortDir: "asc",
        sortType: "jobTitle"
    });
    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {
        const localStorageTracker = localStorage.getItem("applyTracker");

        if (!localStorageTracker) {
            setLocalData({});
        } else {
            setLocalData(JSON.parse(localStorageTracker));
        }
    }, []);

    useEffect(() => {
        if (localData) {
            localStorage.setItem("applyTracker", JSON.stringify(localData));
        }
    }, [localData]);

    useEffect(() => {
        if (localData) {
            const sortedJobs = Object.values(localData).sort((a, b) => {
                if (sortData.sortType !== "jobApplyDate") {
                    if (
                        a[sortData.sortType].toUpperCase() >
                        b[sortData.sortType].toUpperCase()
                    ) {
                        return sortData.sortDir === "asc" ? 1 : -1;
                    }

                    return sortData.sortDir === "asc" ? -1 : 1;
                } else {
                    const date =
                        new Date(b.jobApplyDate) - new Date(a.jobApplyDate);
                    if (sortData.sortDir === "asc") {
                        if (date < 0) {
                            return 1;
                        }

                        return -1;
                    }

                    if (sortData.sortDir === "desc") {
                        if (date < 0) {
                            return -1;
                        }

                        return 1;
                    }
                }

                return 0;
            });

            setJobsData(() => {
                return sortedJobs;
            });
        }
    }, [sortData, localData]);

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
        const confirm = window.confirm("are you sure?");

        if (confirm) {
            setLocalData((prevLocalData) => {
                const { [jobId]: _, ...result } = prevLocalData;

                return result;
            });
        }
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

    const changeSortData = (event) => {
        const {
            target: { id, value }
        } = event;

        setSortData((prevSortData) => {
            return {
                ...prevSortData,
                [id]: value
            };
        });
    };

    return (
        <div>
            <div className="flex gap-3 px-4 py-2 justify-between">
                <div className="flex">
                    <button onClick={() => setIsOpened(true)}>Add Job</button>
                    <div className="ml-2 border-l-2 pl-2">
                        <form>
                            <label>
                                <span>Sort By: </span>
                                <select
                                    name="sortType"
                                    id="sortType"
                                    onChange={changeSortData}
                                >
                                    <option value="jobTitle">
                                        Default (Title)
                                    </option>
                                    <option value="jobApplyDate">Date</option>
                                </select>
                                <select
                                    name="sortDir"
                                    id="sortDir"
                                    onChange={changeSortData}
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </label>
                        </form>
                    </div>
                </div>

                <button onClick={clearAllJobs}>Clear All Jobs</button>
            </div>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 1150: 3, 1640: 4 }}
            >
                <Masonry>
                    {jobsData &&
                        jobsData.map((job) => (
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
