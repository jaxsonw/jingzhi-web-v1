'use server'

import ModelContentServer from './contentServer'

const ModelDetailLayout = ({ params: modelName, searchParams }) => {
  return (
    <div>
      <ModelContentServer modelName={modelName} status={searchParams.status || 1}></ModelContentServer>
    </div>
  )
}

export default ModelDetailLayout
