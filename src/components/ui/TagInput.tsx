import "./TagInput.css";

import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { WithContext as ReactTags } from "react-tag-input";

const keyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [keyCodes.comma, keyCodes.enter];
interface Tag {
    id: string;
    className: string;
    [key: string]: string;
}

/* Need to have a type here so we can use the getTags function. */
export interface TagInputComponent extends React.ForwardRefExoticComponent<{ defaultList: string[] }> {
    getTags: () => string[];
}

const TagInput = forwardRef(({ defaultList }: { defaultList: string[] }, ref) => {
    const [tags, setTags] = useState<Tag[]>([]);
    useImperativeHandle(ref, () => ({
        getTags: () => tags.map((tag) => (tag.id ? tag.id : ""))
    }));
    useMemo(() => {
        if (defaultList && defaultList.length > 0) {
            const blah: Tag[] = [];
            for (const thing of defaultList) {
                blah.push({
                    id: thing,
                    className: ""
                });
            }
            setTags(blah);
        }
    }, [defaultList, setTags]);

    const handleAddition = (tag: Tag) => {
        const newTags: Tag[] = [...tags, tag];
        setTags(newTags);
    };

    const handleDelete = (i: number) => {
        const newTags: Tag[] = tags.filter((_tag, index) => index !== i);
        setTags(newTags);
    };

    return (
        <div id="tags">
            <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="top"
                allowDragDrop={false}
            />
        </div>
    );
});

export default TagInput;
