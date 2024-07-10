"use server";

import ModelContentServer from "./contentServer";

const ModelDetailPage = ({ params: modelName }) => {
    return (
        <ModelContentServer modelName={modelName}></ModelContentServer>
    )
}

export default ModelDetailPage