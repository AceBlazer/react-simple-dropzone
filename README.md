React-simple-dropzone
=============


### Description
Simple, easy to use dropzone with preview for react.  With a small, light bundle size of less than 150kb, it contains only the necessary functionnalities written with vanilla javascript.  **It includes also drag and drop images from browser (within the same website or another website).**


### Examples
- Use the dropzone and retrieve uploaded image in blob format:

```javascript
import React, {useState} from 'react';
import Dropzone from 'react-simple-dropzone/dist';

function App() {
  const [image, setImage] = useState(null);
  return (
    <Dropzone onSuccessBlob={ (img) => setImage(img) } />
  );
}
export default App;
```

- Use the dropzone and retrieve uploaded image in base64 format:

```javascript
import React, {useState} from 'react';
import Dropzone from 'react-simple-dropzone/dist';

function App() {
  const [image, setImage] = useState(null);
  return (
    <Dropzone onSuccessB64={ (img) => setImage(img) } />
  );
}
export default App;
```

- Multiple images dropzone with preview with a custom display text and error handler:

```javascript
import React, {useState} from 'react';
import Dropzone from 'react-simple-dropzone/dist';

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  return (
    <Dropzone multiple="true" preview="true" displayText="Choisissez un fichier ou faites glisser un fichier ici" onError={ (err) => setError(err) } />
  );
}
export default App;
```


### Screenshots
![](https://i.imgur.com/J0bJ8Uq.png)

> Drag and drop images from a website.

![](https://i.imgur.com/xtMtmSp.png)

> Image preview.

![](https://i.imgur.com/IIof3bC.png)

> Browse files with click.


### Properties (props)
| Prop  | Description  | Return | Default value |
| :------------ | :------------ | :------------ | :------------ |
| onSuccessB64 | Event called when the image drop is successful | base64 image format | undefined
| onSuccessBlob | Event called when the image drop is successful |  Blob image format | undefined
| onError | Event called when the image drop has failed | error message | undefined
| displayText | The text to display inside the dropzone | readOnly prop | "Drag & Drop images or click to upload" |
| preview | Enable/disable file preview | readOnly prop | true |
| validTypes | Valid file types that dropzone accepts | readOnly prop | ['image/jpeg', 'image/png', 'image/gif'] |
| accept | File types/signatures that dropzone accepts | readOnly prop | "image/*" |
| dragFromWeb | Enable/disable drag and drop from websites | readOnly prop | true |
| multiple | Enable/disable multiple file upload | readOnly prop | false |
| maxSize | Max size of file to drop in bytes | readOnly prop | 10e6 |
| clearOnInput | Enable/disable clear preview when input new files | readOnly prop | true |


### Changelog
- Earlier versions: Not stable.
- Version 1.0.19: First stable basic version with onSuccessB64 and onSuccessBlob props.
- Version 1.0.20: added props: onError, displayText, validTypes, accept, dragFromWeb, clearOnInput, preview, maxSize and multiple.