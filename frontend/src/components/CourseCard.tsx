import React from 'react';
import './CourseCard.css';

interface CourseCardProps {
    courseImage: string;
    courseName: string;
    description?: string;
    instructorAvatar?: string;
    instructorName?: string;
    courseCategory?: string;
    rating?: number;
    ratingCount?: number;
    level?: string;
    duration?: string;
    style?: React.CSSProperties;
}

function truncate(text: string, maxLength: number) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const CourseCard: React.FC<CourseCardProps> = ({
    courseImage,
    courseName,
    description,
    instructorAvatar,
    instructorName,
    courseCategory,
    rating,
    ratingCount,
    level,
    duration,
    style
}) => {
    return (
        <div className="course-card" style={style}>
            <img src={courseImage} alt={courseName} className="course-image" />
            <h2 className="course-name">{courseName}</h2>
            {description && (
                <p className="course-description">
                    {truncate(description, 80)}
                </p>
            )}
            {instructorName && (
            <div className="instructor-info">
                <img src={instructorAvatar} alt={instructorName} className="instructor-avatar" />
                <span className="instructor-name">{instructorName}</span>
            </div>
            )}
            <div className="course-rating">
                <span className="star" style={{ color: '#FFD700', fontWeight: 600 }}>★</span>
                <span className="rating-value">{rating}</span>
                <span className="rating-count">({ratingCount})</span>
            </div>
            <div className="course-meta">
                <span className="course-category">{courseCategory}</span>
                <span className="course-level">{level}</span>
                <span className="course-duration">{duration}</span>
            </div>
        </div>
    );
}

export default CourseCard; 