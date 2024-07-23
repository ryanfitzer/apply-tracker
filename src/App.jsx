import "./App.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
    fetchApplicationData,
    saveApplicationdata
} from "./store/applications-actions";
import { useDispatch, useSelector } from "react-redux";

import AddJob from "./components/AddJob";
import DialogModal from "./components/DialogModal";
import Job from "./components/job";
import JobsTable from "./components/JobTable";
import Version from "./version.json";
import { applicationsActions } from "./store/applications-slice";
import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";

const App = () => {
    const dispatch = useDispatch();
    const applicationItems = useSelector((state) => state.appList);
    const uiItem = useSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchApplicationData());
    }, [dispatch]);

    useEffect(() => {
        if (applicationItems.isChanged) {
            dispatch(uiActions.toggleModal(false));
            dispatch(saveApplicationdata(applicationItems));
        }
    }, [applicationItems, dispatch]);

    const sortItems = (items) => {
        if (!items) {
            return [];
        }
        return Object.values(items).sort((a, b) => {
            const sortBy = applicationItems.sort.by;
            const sortDir = applicationItems.sort.dir;
            if (sortBy !== "jobApplyDate") {
                if (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) {
                    return sortDir === "asc" ? 1 : -1;
                }

                return sortDir === "asc" ? -1 : 1;
            }

            const date = new Date(b.jobApplyDate) - new Date(a.jobApplyDate);

            if (date < 0) {
                return sortDir === "asc" ? 1 : -1;
            }

            return sortDir === "asc" ? -1 : 1;
        });
    };

    const removeJob = (jobId) => {
        const confirm = window.confirm("are you sure?");

        if (confirm) {
            dispatch(applicationsActions.removeItem(jobId));
        }
    };

    const clearAllJobs = () => {
        const confirm = window.confirm("are you sure?");

        if (confirm) {
            dispatch(applicationsActions.removeAllItems());
        }
    };

    const editJob = (jobId) => {
        dispatch(applicationsActions.setItemToEdit(jobId));
        dispatch(uiActions.toggleModal(true));
    };

    const changeSortData = (event) => {
        const {
            target: { id, value }
        } = event;

        dispatch(
            applicationsActions.sortItemList({
                by: id === "sortBy" ? value : applicationItems.sort.by,
                dir: id === "sortDir" ? value : applicationItems.sort.dir
            })
        );
    };

    return (
        <>
            <header className="flex gap-3 px-4 py-2 justify-between">
                <div className="flex">
                    <button
                        onClick={() => dispatch(uiActions.toggleModal(true))}
                    >
                        Add Job
                    </button>
                    <div className="ml-2 border-l-2 pl-2">
                        <form>
                            <label>
                                <span>Sort By: </span>
                                <select
                                    name="sortBy"
                                    id="sortBy"
                                    onChange={changeSortData}
                                    value={applicationItems.sort.by}
                                >
                                    <option value="jobTitle">Title</option>
                                    <option value="jobApplyDate">Date</option>
                                </select>
                                <select
                                    name="sortDir"
                                    id="sortDir"
                                    onChange={changeSortData}
                                    value={applicationItems.sort.dir}
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </label>
                        </form>
                    </div>
                    <div className="ml-2 border-l-2 pl-2">
                        View As:
                        <select
                            value={applicationItems.viewAs}
                            onChange={(event) =>
                                dispatch(
                                    applicationsActions.setViewAs(
                                        event.target.value
                                    )
                                )
                            }
                        >
                            <option value="tiles">Tiles</option>
                            <option value="table">Table</option>
                        </select>
                    </div>
                </div>

                <button onClick={clearAllJobs}>Clear All Jobs</button>
            </header>
            <main>
                {Object.values(applicationItems.items).length && (
                    <>
                        {applicationItems.viewAs === "table" ? (
                            <div>
                                <JobsTable
                                    jobs={sortItems(applicationItems.items)}
                                    removeJob={removeJob}
                                    editJob={editJob}
                                />
                            </div>
                        ) : (
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{
                                    350: 1,
                                    750: 2,
                                    1150: 3,
                                    1640: 4
                                }}
                            >
                                <Masonry>
                                    {sortItems(applicationItems.items).map(
                                        (job) => (
                                            <div
                                                className="p-3"
                                                key={job.jobId}
                                            >
                                                <Job
                                                    job={job}
                                                    removeJob={removeJob}
                                                    editJob={editJob}
                                                />
                                            </div>
                                        )
                                    )}
                                </Masonry>
                            </ResponsiveMasonry>
                        )}
                    </>
                )}
            </main>
            <footer className="h-6 px-4">
                <p className="text-xs">Version: {Version.version}</p>
            </footer>
            <DialogModal
                isOpened={uiItem.modalIsVisible}
                closeModal={() => {
                    dispatch(uiActions.toggleModal(false));
                    dispatch(applicationsActions.clearEditingJob());
                }}
                title={applicationItems.editingJob ? "Edit Job" : "Add Job"}
            >
                <AddJob />
            </DialogModal>
        </>
    );
};

export default App;
