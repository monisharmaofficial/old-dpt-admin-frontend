// App.jsx / App.tsx

import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class App extends Component {
    render() {
        return (
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Here We have Dubai Private Mail</p>"
                />
            </div>
        );
    }
}

export default App;
