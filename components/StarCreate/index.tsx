import React from 'react';

type StarRatingProps = {
    data: number;
    svg: React.ReactElement;
    svgOutlined: React.ReactElement;
}
interface RenderStarProps {
    rating: number;
    svg: React.ReactElement;
    svgOutlined: React.ReactElement;
}
const StarCreate = (props: StarRatingProps) => {
    const { data, svg, svgOutlined } = props


    const renderStars = ({ rating, svg, svgOutlined }: RenderStarProps): React.ReactNode[] => {
        const stars: React.ReactNode[] = [];
        for (let i = 0; i < 5; i++) {
          stars.push(React.cloneElement(i < rating ? svg : svgOutlined, { key: i })); // Add key prop with index
        }
        return stars;
      };

    return (
        <>
            {renderStars({ rating: data, svg, svgOutlined })}
        </>
    )
}

export default StarCreate;