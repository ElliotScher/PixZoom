import {useRef} from 'react';

export default function FileExplorer() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    // 👇️ open file input box on click of another element
    if (inputRef.current) {
        inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // reset file input
    event.target.value = null;

    // is now empty
    console.log(event.target.files);

    // can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  return (
    <div>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <button onClick={handleClick}>Open file upload box</button>
    </div>
  );
};