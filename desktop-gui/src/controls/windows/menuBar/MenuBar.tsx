import React from "react";

export default React.forwardRef((props, ref) => {
    return (
        <div>
            <div>
                <button>File</button>
                <button>Edit</button>,
                <button>Help</button>
            </div>
        </div>
    );
});