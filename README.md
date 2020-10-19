React-simple-dropzone
=============


### Description
Simple, easy to use dropzone with preview for react.
With a small, light bundle size of 130kb, it contains only the necessary functionnalities written with vanilla javascript.
**It includes also drag and drop images from browser (within the same website or another website).**
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
### Screenshots
![](https://i.imgur.com/J0bJ8Uq.png)

> Drag and drop images from a website.

![](https://i.imgur.com/xtMtmSp.png)

> Image preview.

![](https://i.imgur.com/IIof3bC.png)

> Browse files with click.

### Properties (props)
| Prop  | Description  | Return |
| :------------ | :------------ | :------------ |
| onSuccessB64      | Event called when the image drop is successful | base64 image format |
| onSuccessBlob      | Event called when the image drop is successful        |  Blob image format |