import React from "react";

/**
 * VideoPlayer
 * Props:
 *  - src: video URL
 */
export default function VideoPlayer({ src }) {
    if (!src) {
        return (
            <div className="bg-black text-white h-64 flex items-center justify-center rounded">
                No video available
            </div>
        );
    }

    return (
        <video
            src={src}
            controls
            className="w-full h-64 md:h-96 bg-black rounded"
        />
    );
}
