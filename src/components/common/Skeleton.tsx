import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    variant?: 'rect' | 'circle';
    className?: string;
    style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    variant = 'rect',
    className = '',
    style,
}) => {
    const baseStyle: React.CSSProperties = {
        width: width || '100%',
        height: height || '20px',
        ...style,
    };

    return (
        <span
            className={`skeleton ${variant} ${className}`}
            style={baseStyle}
            aria-hidden="true"
        />
    );
};

export default Skeleton;
