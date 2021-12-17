import React from 'react'

function Loader() {
    return (
        <div className="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
