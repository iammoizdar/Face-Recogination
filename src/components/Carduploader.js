import React from "react"
import ReactDropzoneUploader from "react-dropzone-uploader"
const styles = {
  dropzoneActive: {
    borderColor: 'green',
  },
}

const Caruploader = () => {
  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post'
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`
    return { url, meta: { fileUrl } }
  }

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (

    <div className="uploader">
        <ReactDropzoneUploader
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          styles={styles}
          height={200}
        />

    </div>
  )
}

export default Caruploader
