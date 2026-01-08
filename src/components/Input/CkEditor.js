import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class App extends Component {
    render() {
        return (
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>This is Dubai Private</p>"
                    className="h-96"
                    
                />
            </div>
        );
    }
}

export default App;