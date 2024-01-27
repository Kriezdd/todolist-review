import React from 'react';
import './Tag.scss';

interface TagProps {
    tag: string;
    id: number;
    onDelete?: (value:string) => void;
}

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