import "./App.css";

import { ChangeEvent, useMemo } from "react";
import { JobType, SortDirection, UiState } from "./lib/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { applicationsActions, selectApplicationEditing, selectApplicationItems, selectApplicationListIsChanged, selectApplicationListViewAs, selectApplicationSort } from "./store/applications-slice";
import {
    fetchApplicationData,
    saveApplicationdata
} from "./store/applications-actions";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

import AddJob from "./components/AddJob";
import Charts from "./components/Charts";
import DialogModal from "./components/DialogModal";
import Footer from "./components/Footer";
import Job from "./components/Job";
import JobsTable from "./components/JobTable";
import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const App = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useAppDispatch();
    const applicationListIsChanged = useAppSelector(selectApplicationListIsChanged);
    const applicationListSort = useAppSelector(selectApplicationSort);
    const applicationListEditing = useAppSelector(selectApplicationEditing);
    const applicationListItems = useAppSelector(selectApplicationItems);
    const applicationListViewAs = useAppSelector(selectApplicationListViewAs);
    const uiItem = useSelector((state: UiState) => state.ui);
    useMemo(() => {
        const query = new URLSearchParams(document.location.search);
        dispatch(fetchApplicationData(!!query.get("demo")));
    }, [dispatch]);

    useEffect(() => {
        if (applicationListIsChanged) {
            dispatch(saveApplicationdata({
                items: applicationListItems,
                sort: applicationListSort,
                viewAs: applicationListViewAs
            }));
        }
    }, [applicationListIsChanged, dispatch, applicationListItems, applicationListSort, applicationListViewAs]);

    const sortItems = (items: JobType[]) => {
        if (!items) {
            return [];
        }
        return Object.values(items).sort((a, b) => {
            const sortBy: string = applicationListSort.by;
            const sortDir: string = applicationListSort.dir;
            if (sortBy !== "jobApplyDate") {
                if (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) {
                    return sortDir === SortDirection.ASCENDING ? 1 : -1;
                }

                return sortDir === SortDirection.ASCENDING ? -1 : 1;
            }

            const date = Number(new Date(b.jobApplyDate)) - Number(new Date(a.jobApplyDate));

            if (date < 0) {
                return sortDir === SortDirection.ASCENDING ? 1 : -1;
            }

            return sortDir === SortDirection.ASCENDING ? -1 : 1;
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
                by: id === "sortBy" ? value : applicationListSort.by,
                dir: id === "sortDir" ? value : applicationListSort.dir
            })
        );
    };

    const onChangeLang = (event) => {
        const lang_code = event.target.value;
        i18n.changeLanguage(lang_code);
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex gap-3 px-4 py-2 justify-between h-10">
                <div className="flex">
                    <button
                        onClick={() => dispatch(uiActions.toggleModal(true))}
                    >
                        {t("addJob")}
                    </button>
                    <div className="ml-2 border-l-2 pl-2">
                        <form>
                            <label>
                                <span>Sort By: </span>
                                <select
                                    name="sortBy"
                                    id="sortBy"
                                    onChange={changeSortData}
                                    value={applicationListSort.by}
                                >
                                    <option value="jobTitle">Title</option>
                                    <option value="jobApplyDate">Date</option>
                                </select>
                                <select
                                    name="sortDir"
                                    id="sortDir"
                                    onChange={changeSortData}
                                    value={applicationListSort.dir}
                                >
                                    <option value={SortDirection.ASCENDING}>Ascending</option>
                                    <option value={SortDirection.DESCENDING}>Descending</option>
                                </select>
                            </label>
                        </form>
                    </div>
                    <div className="ml-2 border-l-2 pl-2">
                        View As:
                        <select
                            value={applicationListViewAs}
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
                    <div className="ml-2 border-l-2 pl-2">
                        Language
                        <input type="radio" name="lang" value="en" onClick={onChangeLang}
                            defaultChecked={i18n.language === "en"} />EN
                        {/* Using Greek language code for now till able to
                        make a new code. */}
                        <input type="radio" name="lang" value="el" onClick={onChangeLang} defaultChecked={i18n.language === "el"} />Satire
                    </div>
                    <div className="ml-2 border-l-2 pl-2">
                        <button onClick={
                            () => dispatch(uiActions.toggleChartsModal(true))}>View Stats</button>
                    </div>
                </div>

                <button onClick={clearAllJobs}>Clear All Jobs</button>
            </header>
            <main className="h-full overflow-y-auto">
                {/* Need to compare against 0 to make sure 0 does now show up
                  * on the UI.
                */}
                {Object.values(applicationListItems).length > 0 && (
                    <>
                        {applicationListViewAs === "table" ? (
                            <div>
                                <JobsTable
                                    jobs={sortItems(applicationListItems)}
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
                                    {sortItems(applicationListItems).map(
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
            <Footer />
            <DialogModal
                isOpened={uiItem.modalIsVisible}
                closeModal={() => {
                    dispatch(uiActions.toggleModal(false));
                    dispatch(applicationsActions.clearEditingJob());
                }}
                title={applicationListEditing ? "Edit Job" : t("addJob")}
                width="600"
            >
                <AddJob />
            </DialogModal>
            <DialogModal
                isOpened={uiItem.chartsModalIsVisible}
                closeModal={() => {
                    dispatch(uiActions.toggleChartsModal(false));
                }}
                title="Stats"
                width="1000"
            >
                <Charts />
            </DialogModal>
        </div>
    );
};

export default App;

