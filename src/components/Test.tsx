import { useState } from "react";

function Test() {
    const [test, setTest] = useState("test")
    window.ipcRenderer.invoke('test', 'world').then(
        function(value) {setTest(value)},
        function(error) {setTest(error)}
    );

    return <p>
        {test}
    </p>
    
}

export default Test