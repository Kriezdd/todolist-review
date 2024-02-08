import React from 'react';
import {TagProps} from "../../types/TagProps";
import './Tag.scss';

const Tag = ({tag, id, onDelete}: TagProps) => {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(tag);
        }
    }
    return (
        <div key={id} className="Tag">
            <p>
                {tag}
            </p>
            {onDelete ? <p className="Delete" onClick={handleDelete}> х </p> : null}
        </div>
    );
};

export default Tag;