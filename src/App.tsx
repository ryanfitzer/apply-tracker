import "./App.css";

import { JobType, SortDirection, UiState } from "./lib/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { applicationsActions, selectApplicationEditing, selectApplicationItems, selectApplicationListIsChanged, selectApplicationListViewAs, selectApplicationSort } from "./store/applications-slice";
import {
    fetchApplicationData,
    fetchBootStrapData,
    saveApplicationData
} from "./store/applications-actions";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

import AddJob from "./components/AddJob";
import Charts from "./components/Charts";
import DialogModal from "./components/DialogModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Job from "./components/Job";
import JobsTable from "./components/JobTable";
import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const App = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const applicationListIsChanged = useAppSelector(selectApplicationListIsChanged);
    const applicationListEditing = useAppSelector(selectApplicationEditing);
    const applicationListSort = useAppSelector(selectApplicationSort);
    const applicationListItems = useAppSelector(selectApplicationItems);
    const applicationListViewAs = useAppSelector(selectApplicationListViewAs);
    const uiItem = useSelector((state: UiState) => state.ui);

    useMemo(async () => {
        const query = new URLSearchParams(document.location.search);
        const things = await dispatch(fetchBootStrapData());

        if (things) {
            dispatch(fetchApplicationData(!!query.get("demo")));
        } else {
            alert('GistID and/or Access Token are not set.');
        }
    }, [dispatch]);

    useEffect(() => {
        const query = new URLSearchParams(document.location.search);

        if (applicationListIsChanged) {
            dispatch(saveApplicationData({
                items: applicationListItems,
                sort: applicationListSort,
                viewAs: applicationListViewAs
            }, !!query.get("demo")));
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

    return (
        <div className="flex flex-col h-full">
            <Header />
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

