import "./App.css";

import { AppListState, JobType, UiState } from "./lib/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
    fetchApplicationData,
    saveApplicationdata
} from "./store/applications-actions";
import { useDispatch, useSelector } from "react-redux";

import AddJob from "./components/AddJob";
import { AppDispatch } from "./store";
import { ChangeEvent } from "react";
import DialogModal from "./components/DialogModal";
import Job from "./components/job";
import JobsTable from "./components/JobTable";
import Version from "./version.json";
import { applicationsActions } from "./store/applications-slice";
import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const applicationItems = useSelector((state: AppListState) => state.appList);
    const uiItem = useSelector((state: UiState) => state.ui);

    useEffect(() => {
        dispatch(fetchApplicationData());
    }, [dispatch]);

    useEffect(() => {
        if (applicationItems.isChanged) {
            dispatch(saveApplicationdata(applicationItems));
        }
    }, [applicationItems, dispatch]);

    const sortItems = (items: JobType[]) => {
        if (!items) {
            return [];
        }
        return Object.values(items).sort((a, b) => {
            const sortBy: string = applicationItems.sort.by;
            const sortDir: string = applicationItems.sort.dir;
            if (sortBy !== "jobApplyDate") {
                if (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) {
                    return sortDir === "asc" ? 1 : -1;
                }

                return sortDir === "asc" ? -1 : 1;
            }

            const date = Number(new Date(b.jobApplyDate)) - Number(new Date(a.jobApplyDate));

            if (date < 0) {
                return sortDir === "asc" ? 1 : -1;
            }

            return sortDir === "asc" ? -1 : 1;
        });
    };

    const removeJob = (jobId: string) => {
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

    const changeSortData = (event: ChangeEvent<HTMLSelectElement>) => {
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
                {/* Need to compare against 0 to make sure 0 does now show up
                  * on the UI.
                */}
                {Object.values(applicationItems.items).length > 0 && (
                    <>
                        {applicationItems.viewAs === "table" ? (
                            <div>
                                <JobsTable
                                    jobs={sortItems(applicationItems.items)}
                                    removeJob={removeJob}
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

