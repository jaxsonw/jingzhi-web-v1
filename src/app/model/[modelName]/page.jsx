"use server";

import ModelContentServer from "./contentServer";

const ModelDetailLayout = ({params:modelName})=>{
    return <div>
        <ModelContentServer modelName={modelName}></ModelContentServer>
    </div>
}

export default ModelDetailLayout