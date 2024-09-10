import { applicationsActions, selectApplicationSort } from "../store/applications-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { ChangeEvent } from "react";
import { SortDirection } from "../lib/types";
import { uiActions } from "../store/ui-slice";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useAppDispatch();
    const applicationListSort = useAppSelector(selectApplicationSort);

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

    return (<header className="flex gap-3 px-4 py-2 justify-between h-10">
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
                            className="cursor-pointer"
                            name="sortBy"
                            id="sortBy"
                            onChange={changeSortData}
                            value={applicationListSort.by}
                        >
                            <option value="jobTitle">Title</option>
                            <option value="jobApplyDate">Date</option>
                        </select>
                        <select
                            className="cursor-pointer"
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
            {/* Disabling for now */}
            {/* <div className="ml-2 border-l-2 pl-2">
                View As:
                <select
                    className="cursor-pointer"
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
            </div> */}
            <div className="ml-2 border-l-2 pl-2">
                <span>Language: </span>
                <label htmlFor="langEn" className="cursor-pointer">
                    <input className="cursor-pointer" id="langEn" type="radio" name="lang" value="en" onClick={onChangeLang}
                        defaultChecked={i18n.language === "en"} /><span className="pl-1">EN</span>
                </label>
                <label htmlFor="langEl" className="ml-4 cursor-pointer">
                    {/* Using Greek language code for now till able to
                    make a new code. */}
                    <input className="cursor-pointer" id="langEl" type="radio" name="lang" value="el" onClick={onChangeLang} defaultChecked={i18n.language === "el"} /><span className="pl-1">Satire</span>
                </label>
            </div>
            <div className="ml-2 border-l-2 pl-2">
                <button onClick={
                    () => dispatch(uiActions.toggleChartsModal(true))}>View Stats</button>
            </div>
        </div>

        <button onClick={clearAllJobs}>Clear All Jobs</button>
    </header>);
};

export default Header;