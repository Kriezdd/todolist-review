import React from 'react';
import './Tag.scss';

interface TagProps {
    tag: string;
    id: number;
}

const Tag = ({tag, id}: TagProps) => {
    return (
        <div className="Tag">
            <p>
                {tag}
            </p>
        </div>
    );
};

export default Tag;